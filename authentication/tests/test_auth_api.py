from django.test import TestCase
from authentication.serializer import AccountInSerializer
from rest_framework import status
from rest_framework.test import APIRequestFactory
from authentication.views import SigninView, SignupView
from authentication.models import *
from django.contrib.auth import get_user_model


User = get_user_model()


class SigninViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = SigninView.as_view()
        self.url = '/signin/'

    def test_valid_credentials(self):
        # Create a user with valid credentials
        user = User.objects.create_user(
            email='test@example.com',
            password='password',
            user_name='test_user',
            phone_number='1234567890'
        )
        # Prepare the request data with valid credentials
        data = {
            'email': 'test@example.com',
            'password': 'password'
        }
        request = self.factory.post(self.url, data)

        # Make the request to the view
        response = self.view(request)

        # Perform assertions
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('account', response.data)

        # Additional assertions for the account data
        account_data = response.data['account']
        self.assertEqual(account_data['id'], user.id)
        self.assertEqual(account_data['email'], user.email)
        self.assertEqual(account_data['user_name'], user.user_name)
        self.assertEqual(account_data['phone_number'], user.phone_number)



    def test_invalid_credentials(self):
        # Create a user with valid credentials
        User.objects.create_user(
            email='test@example.com',
            password='password',
            user_name='test_user',
            phone_number='1234567890'
        )

        # Prepare the request data with invalid credentials
        data = {
            'email': 'test@example.com',
            'password': 'incorrect_password'
        }
        request = self.factory.post(self.url, data)

        # Make the request to the view
        response = self.view(request)

        # Perform assertions
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'Invalid credentials')



    def test_unregistered_user(self):
        # Prepare the request data with unregistered user credentials
        data = {
            'email': 'test@example.com',
            'password': 'incorrect_password'
        }
        request = self.factory.post(self.url, data)

        # Make the request to the view
        response = self.view(request)

        # Perform assertions
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'User is not registered')


    def test_invalid_signin_incorrect_password(self):
        # Create a user with valid credentials
        User.objects.create_user(
            email='test@example.com',
            password='password',
            user_name='test_user',
            phone_number='1234567890'
        )

        # Prepare the request data with incorrect password
        data = {
            'email': 'test@example.com',
            'password': 'incorrect_password'  # Incorrect password
        }
        request = self.factory.post(self.url, data)
        response = self.view(request)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)



class SignupViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = SignupView.as_view()
        self.url = '/signup/'  # Replace with your actual URL

    def test_valid_signup(self):
        # Prepare the request data with valid signup details
        data = {
            'user_name': 'test_user',
            'email': 'test@example.com',
            'password1': 'password123',
            'password2': 'password123',
            'phone_number': '1234567890'
        }
        request = self.factory.post(self.url, data)

        # Make the request to the view
        response = self.view(request)

        # Perform assertions
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertIn('account', response.data)


    def test_invalid_signup_passwords_not_matching(self):
        # Prepare the request data with passwords that do not match
        data = {
            'user_name': 'test_user',
            'email': 'test@example.com',
            'password1': 'password123',
            'password2': 'different_password',
            'phone_number': '1234567890'
        }
        request = self.factory.post(self.url, data)

        # Make the request to the view
        response = self.view(request)

        # Perform assertions
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Passwords should match')

    



    def test_invalid_signup_email_taken(self):
        # Create a user with the email already taken
        User.objects.create_user(
            email='existing_email@example.com',
            password='password',
            user_name='existing_user',
            phone_number='1234567890'
        )

        # Prepare the request data with the email already taken
        data = {
            'user_name': 'test_user',
            'email': 'existing_email@example.com',
            'password1': 'password123',
            'password2': 'password123',
            'phone_number': '1234567890'
        }
        request = self.factory.post(self.url, data)

        # Make the request to the view
        response = self.view(request)

        # Perform assertions
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'Email is already taken')


    def test_invalid_data(self):
        # Test case for invalid data, such as missing required fields
        data = {
            'user_name': 'testuser',
            'password1': 'password1',
            'phone_number': '1234567890'
        }
        request = self.factory.post('/signup/', data)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('email', data)
        self.assertNotIn('token', response.data)



    def test_invalid_signup_weak_password(self):
        # Prepare the request data with a weak password
        data = {
            'user_name': 'test_user',
            'email': 'test@example.com',
            'password1': '',  # Weak password
            'password2': '',  # Weak password
            'phone_number': '1234567890'
        }
        request = self.factory.post(self.url, data)
        response = self.view(request)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(not data['password1'])


    def test_invalid_signup_empty_password(self):
        # Prepare the request data with a weak password
        data = {
            'user_name': 'test_user',
            'email': 'test@example.com',
            'password1': '',  # Weak password
            'password2': '',  # Weak password
            'phone_number': '1234567890'
        }
        request = self.factory.post(self.url, data)
        response = self.view(request)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(not data['password1'] or not data['password2'])



    def test_invalid_signup_username_does_not_exist(self):
        # Prepare the request data with a weak password
        data = {
            'email': 'test@example.com',
            'password1': 'password',  # Weak password
            'password2': 'password',  # Weak password
            'phone_number': '1234567890'
        }
        request = self.factory.post(self.url, data)
        response = self.view(request)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('user_name',data)


    def test_invalid_signup_invalid_email(self):
        # Prepare the request data with an invalid email format
        data = {
            'user_name': 'test_user',
            'email': 'invalid_email',  # Invalid email format
            'password1': 'password123',
            'password2': 'password123',
            'phone_number': '1234567890'
        }
        request = self.factory.post(self.url, data)
        response = self.view(request)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)