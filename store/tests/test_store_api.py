from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
from store.models import Product
from store.selializers import ProdSerializers

from django.contrib.auth import get_user_model


User = get_user_model()


class AllProdsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('all-prods') # to retrieve url from it's associated name


    def test_all_prods_success(self):
        # Create some products
        product1 = Product.objects.create(name='Product 1', price=10.99)
        product2 = Product.objects.create(name='Product 2', price=19.99)

        # Make a GET request to the endpoint
        response = self.client.get(self.url)

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Retrieve the serialized data
        serializer = ProdSerializers([product1, product2], many=True)
        expected_data = serializer.data

        # Check if the response data matches the expected data
        self.assertEqual(response.data, expected_data)


    def test_all_prods_failure(self):
        # Make a GET request to the endpoint
        response = self.client.get(self.url)

        # Check the response status code
        if not response:
            self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
