from django.test import TestCase
from django.contrib.auth import get_user_model
from store.models import Product, Order, OrderItem, ShippingAddress

User = get_user_model()


class ModelTestCase(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            user_name='testuser', email='test@example.com', password='password',
            phone_number='07190389136'
        )

        # Create a test product
        self.product = Product.objects.create(
            name='Test Product', price=9.99, image=None
        )

        # Create a test order
        self.order = Order.objects.create(customer=self.user)

        # Create a test order item
        self.order_item = OrderItem.objects.create(
            product=self.product, order=self.order, qnt=2
        )

        # Create a test shipping address
        self.shipping_address = ShippingAddress.objects.create(
            customer=self.user, order=self.order,
            address='Test Address', city='Test City',
            state='Test State', zipcode='12345'
        )


    def test_product_model(self):
        self.assertEqual(self.product.name, 'Test Product')
        self.assertEqual(self.product.price, 9.99)
        self.assertTrue(self.product.image == None)


    def test_order_model(self):
        self.assertEqual(self.order.customer, self.user)
        self.assertFalse(self.order.completed)
        self.assertIsNone(self.order.translation_id)


    def test_order_item_model(self):
        self.assertEqual(self.order_item.product, self.product)
        self.assertEqual(self.order_item.order, self.order)
        self.assertTrue(self.order_item.qnt == 2)



