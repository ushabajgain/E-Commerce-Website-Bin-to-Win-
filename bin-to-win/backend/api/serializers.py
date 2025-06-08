from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Category, 
    Retailer, 
    Product, 
    CartItem, 
    Wishlist, 
    Order, 
    OrderItem, 
    PromoCode, 
    Review,
    BinaryFile
)

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'user_type', 'phone', 'address', 'profile_image']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon']

class RetailerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Retailer
        fields = ['id', 'user', 'company_name', 'company_address', 'business_license', 'approved']

class ProductSerializer(serializers.ModelSerializer):
    discount_percentage = serializers.IntegerField(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    retailer_name = serializers.CharField(source='retailer.company_name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'original_price', 
            'expiry_date', 'category', 'category_name', 'retailer', 'retailer_name',
            'stock', 'image', 'discount_percentage', 'is_featured', 'is_active',
            'created_at', 'updated_at'
        ]

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_detail = serializers.SerializerMethodField()
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'product_detail', 'quantity', 'user', 'added_at', 'total_price']
    
    def get_product_detail(self, obj):
        return {
            'id': obj.product.id,
            'name': obj.product.name,
            'description': obj.product.description,
            'price': float(obj.product.price),
            'original_price': float(obj.product.original_price),
            'expiry_date': obj.product.expiry_date,
            'image': obj.product.image.url if obj.product.image else None,
            'stock': obj.product.stock,
            'discount_percentage': int(((obj.product.original_price - obj.product.price) / obj.product.original_price) * 100)
        }

class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )
    
    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'product_id', 'added_at']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'price', 'quantity', 'total_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'shipping_address', 
            'shipping_cost', 'subtotal', 'total', 'items',
            'created_at', 'updated_at', 'promo_code', 'promo_discount'
        ]
        read_only_fields = ['order_number', 'created_at', 'updated_at']

class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = [
            'id', 'code', 'discount_amount', 'discount_percentage',
            'valid_from', 'valid_to', 'is_active', 'minimum_order_value'
        ]

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class BinaryFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BinaryFile
        fields = ['id', 'name', 'content', 'file_type', 'size', 'uploaded_at', 'description']
        read_only_fields = ['uploaded_at'] 