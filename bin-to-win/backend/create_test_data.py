import os
import django
import sys

# Set up Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Category, Product, User, Retailer
from django.utils import timezone
from django.utils.text import slugify
import datetime

def create_test_data():
    # Create retailer user
    try:
        retailer_user, created = User.objects.get_or_create(
            username='retaileruser',
            defaults={
                'email': 'retailer@example.com',
                'is_staff': False,
                'is_superuser': False
            }
        )
        if created:
            retailer_user.set_password('password123')
            retailer_user.save()
            print(f"Created retailer user: username=retaileruser, id={retailer_user.id}")
        else:
            print(f"Retailer user already exists: username=retaileruser, id={retailer_user.id}")
    except Exception as e:
        print(f"Error creating retailer user: {e}")
        return

    # Create retailer
    try:
        retailer, created = Retailer.objects.get_or_create(
            user=retailer_user,
            defaults={
                'company_name': 'Test Retailer',
                'company_address': '123 Test St',
                'business_license': '12345',
                'approved': True
            }
        )
        print(f"Retailer {'created' if created else 'already exists'}: id={retailer.id}, name={retailer.company_name}")
    except Exception as e:
        print(f"Error creating retailer: {e}")
        return
    
    # Create test user
    try:
        user, created = User.objects.get_or_create(
            username='testuser',
            defaults={
                'email': 'test@example.com',
                'is_staff': False,
                'is_superuser': False
            }
        )
        if created:
            user.set_password('password123')
            user.save()
            print(f"Created user: username=testuser, id={user.id}")
        else:
            print(f"User already exists: username=testuser, id={user.id}")
    except Exception as e:
        print(f"Error creating user: {e}")
    
    # Create test category
    try:
        category, created = Category.objects.get_or_create(
            name='Test Category',
            defaults={
                'slug': 'test-category',
                'description': 'Test category for testing'
            }
        )
        print(f"Category {'created' if created else 'already exists'}: id={category.id}, name={category.name}")
    except Exception as e:
        print(f"Error creating category: {e}")
        return
    
    # Create test products
    try:
        for i in range(1, 10):
            product_name = f'Test Product {i}'
            product_slug = f'test-product-{i}-{int(timezone.now().timestamp())}'  # Add timestamp to ensure uniqueness
            
            product, created = Product.objects.get_or_create(
                name=product_name,
                defaults={
                    'slug': product_slug,
                    'description': f'Test product {i} for testing',
                    'price': 9.99 * i,
                    'original_price': 19.99 * i,
                    'expiry_date': (timezone.now() + datetime.timedelta(days=30)).date(),
                    'category': category,
                    'retailer': retailer,
                    'stock': 10 * i,
                    'is_active': True
                }
            )
            print(f"Product {'created' if created else 'already exists'}: id={product.id}, name={product.name}, slug={product.slug}")
    except Exception as e:
        print(f"Error creating products: {e}")

if __name__ == '__main__':
    create_test_data() 