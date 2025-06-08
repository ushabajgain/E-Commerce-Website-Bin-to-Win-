from django.shortcuts import render
from rest_framework import viewsets, status, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth import get_user_model, authenticate
from django.db.models import Q
from django.utils import timezone
from django.utils.crypto import get_random_string
import uuid
import datetime

from .models import (
    Category, Retailer, Product, CartItem, Wishlist, 
    Order, OrderItem, PromoCode, Review, BinaryFile
)
from .serializers import (
    UserSerializer, CategorySerializer, RetailerSerializer, 
    ProductSerializer, CartItemSerializer, WishlistSerializer, 
    OrderSerializer, OrderItemSerializer, PromoCodeSerializer, 
    ReviewSerializer, BinaryFileSerializer
)

User = get_user_model()

class IsRetailerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            hasattr(request.user, 'retailer') or 
            request.user.is_staff
        )

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if user is owner or admin
        return (obj.user == request.user) or request.user.is_staff

class CustomAuthToken(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Please provide both username and password'}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        
        if not user:
            return Response({'error': 'Invalid credentials'}, 
                           status=status.HTTP_401_UNAUTHORIZED)
            
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_retailer': hasattr(user, 'retailer'),
            'first_name': user.first_name,
            'last_name': user.last_name,
        })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    def get_permissions(self):
        if self.action == 'create':
            # Allow anyone to register
            return [AllowAny()]
        elif self.action == 'me':
            # Allow authenticated users to view themselves
            return [IsAuthenticated()]
        # Default to admin-only for all other actions
        return [IsAdminUser()]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(pk=self.request.user.pk)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsRetailerOrAdmin]
        return [permission() for permission in permission_classes]

class RetailerViewSet(viewsets.ModelViewSet):
    queryset = Retailer.objects.all()
    serializer_class = RetailerSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsOwnerOrAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def my_profile(self, request):
        try:
            retailer = Retailer.objects.get(user=request.user)
            serializer = RetailerSerializer(retailer)
            return Response(serializer.data)
        except Retailer.DoesNotExist:
            return Response(
                {"detail": "Retailer profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsRetailerOrAdmin]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        
        # Filtering by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Filtering by retailer
        retailer = self.request.query_params.get('retailer', None)
        if retailer:
            queryset = queryset.filter(retailer__id=retailer)
        
        # Search by name or description
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )
        
        # Filter by featured products
        featured = self.request.query_params.get('featured', None)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Filter by expiry date (products expiring soon)
        expiring_soon = self.request.query_params.get('expiring_soon', None)
        if expiring_soon and expiring_soon.lower() == 'true':
            today = timezone.now().date()
            one_week_later = today + datetime.timedelta(days=7)
            queryset = queryset.filter(expiry_date__range=[today, one_week_later])
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        # Sort by price
        sort_by = self.request.query_params.get('sort_by', None)
        if sort_by:
            if sort_by == 'price_asc':
                queryset = queryset.order_by('price')
            elif sort_by == 'price_desc':
                queryset = queryset.order_by('-price')
            elif sort_by == 'newest':
                queryset = queryset.order_by('-created_at')
            elif sort_by == 'discount':
                # Sort by the calculated discount percentage
                queryset = sorted(
                    queryset, 
                    key=lambda x: ((x.original_price - x.price) / x.original_price) if x.original_price > 0 else 0, 
                    reverse=True
                )
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def retailer_products(self, request):
        """Get all products for the logged in retailer"""
        if request.user.user_type != 'retailer':
            return Response(
                {"detail": "Only retailers can access this endpoint."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            retailer = Retailer.objects.get(user=request.user)
            products = Product.objects.filter(retailer=retailer)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        except Retailer.DoesNotExist:
            return Response(
                {"detail": "Retailer profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        # Explicitly add the user to the request data
        data = request.data.copy()
        
        # Validate that product exists
        product_id = data.get('product_id')
        if product_id:
            try:
                Product.objects.get(pk=product_id)
            except Product.DoesNotExist:
                return Response(
                    {"product_id": [f"Invalid pk \"{product_id}\" - object does not exist."]}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Create serializer with modified data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        # Save with user
        serializer.save(user=request.user)
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
    
    @action(detail=False, methods=['get'])
    def cart_total(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        total = sum(item.total_price for item in cart_items)
        return Response({"total": total})

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        elif hasattr(self.request.user, 'retailer'):
            # Retailers can see orders containing their products
            try:
                retailer = Retailer.objects.get(user=self.request.user)
                retailer_product_ids = Product.objects.filter(retailer=retailer).values_list('id', flat=True)
                return Order.objects.filter(items__product__id__in=retailer_product_ids).distinct()
            except Retailer.DoesNotExist:
                return Order.objects.none()
        else:
            return Order.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        # Get cart items
        cart_items = CartItem.objects.filter(user=request.user)
        
        if not cart_items:
            return Response({"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create order
        data = request.data.copy()
        
        # Calculate order totals
        subtotal = sum(item.product.price * item.quantity for item in cart_items)
        shipping_cost = data.get('shipping_cost', 0)
        
        # Apply promo code if provided
        promo_discount = 0
        promo_code = data.get('promo_code')
        if promo_code:
            try:
                promo = PromoCode.objects.get(
                    code=promo_code,
                    is_active=True,
                    valid_from__lte=timezone.now(),
                    valid_to__gte=timezone.now()
                )
                
                if subtotal >= promo.minimum_order_value:
                    if promo.discount_percentage:
                        promo_discount = (subtotal * promo.discount_percentage) / 100
                    else:
                        promo_discount = promo.discount_amount
            except PromoCode.DoesNotExist:
                return Response({"detail": "Invalid promo code"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Calculate total
        total = subtotal + shipping_cost - promo_discount
        
        # Generate unique order number
        order_number = f"ORD-{get_random_string(8).upper()}"
        
        # Create order
        order = Order.objects.create(
            user=request.user,
            order_number=order_number,
            shipping_address=data.get('shipping_address'),
            shipping_cost=shipping_cost,
            subtotal=subtotal,
            total=total,
            promo_code=promo_code,
            promo_discount=promo_discount
        )
        
        # Create order items
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                price=cart_item.product.price,
                quantity=cart_item.quantity
            )
        
        # Clear the cart
        cart_items.delete()
        
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class PromoCodeViewSet(viewsets.ModelViewSet):
    queryset = PromoCode.objects.all()
    serializer_class = PromoCodeSerializer
    
    def get_permissions(self):
        if self.action == 'validate':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsRetailerOrAdmin]
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['post'])
    def validate(self, request):
        code = request.data.get('code')
        cart_total = request.data.get('cart_total', 0)
        
        if not code:
            return Response({"detail": "Promo code is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            promo = PromoCode.objects.get(
                code=code,
                is_active=True,
                valid_from__lte=timezone.now(),
                valid_to__gte=timezone.now()
            )
            
            if cart_total < promo.minimum_order_value:
                return Response({
                    "valid": False,
                    "detail": f"Minimum order value of ${promo.minimum_order_value} required"
                })
            
            # Calculate discount
            if promo.discount_percentage:
                discount = (float(cart_total) * promo.discount_percentage) / 100
            else:
                discount = float(promo.discount_amount)
            
            return Response({
                "valid": True,
                "discount": discount,
                "discount_type": "percentage" if promo.discount_percentage else "amount",
                "discount_value": promo.discount_percentage or promo.discount_amount
            })
            
        except PromoCode.DoesNotExist:
            return Response({"valid": False, "detail": "Invalid or expired promo code"})

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.query_params.get('product'):
            return Review.objects.filter(product_id=self.request.query_params.get('product'))
        return Review.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BinaryFileViewSet(viewsets.ModelViewSet):
    queryset = BinaryFile.objects.all()
    serializer_class = BinaryFileSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        binary_file = self.get_object()
        return Response({
            'name': binary_file.name,
            'content': binary_file.content,
            'file_type': binary_file.file_type
        })
