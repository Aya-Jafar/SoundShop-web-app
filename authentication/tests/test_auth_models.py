

# class TestAuthModels():
#     def test_auth_models(self , email_account_factory):
#         '''
#             - Arrage (mocking)
#             - Act (action)
#             - Assert (compare or test)
#         '''
#         # user_factory = email_account_factory()
#         # assert user_factory.



from django.test import TestCase
from authentication.models import EmailAccount
from django.contrib.auth import get_user_model


User = get_user_model()


class EmailAccountModelTest(TestCase):
    def test_create_user(self):
        user = EmailAccount.objects.create_user(
            user_name="testuser",
            email="test@example.com",
            phone_number="123456789",
            password="password123",
        )
        self.assertEqual(user.user_name, "testuser")
        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.phone_number, "123456789")
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_active)

        
        
    def test_invalid_user(self):
        user_name = 'testuser'
        phone_number = '1234567890'
        password = 'testpassword'


        with self.assertRaisesMessage(ValueError, 'user must have an email to register'):
            User.objects.create_user(
                user_name= user_name,
                email='',
                password=password,
                phone_number= phone_number
            )



    def test_create_superuser(self):
        superuser = EmailAccount.objects.create_superuser(
            user_name="admin",
            email="admin@example.com",
            password="adminpassword"
        )
        self.assertEqual(superuser.user_name, "admin")
        self.assertEqual(superuser.email, "admin@example.com")
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_active)




    def test_invalid_superuser(self):
        user_name = 'testuser3'
        password = 'testpassword'

        with self.assertRaisesMessage(ValueError, 'superuser must have an email to register'):
            User.objects.create_superuser(
                user_name=user_name,
                email='',
                password=password
            )




