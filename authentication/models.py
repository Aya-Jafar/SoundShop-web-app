from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.contrib.auth.models import AbstractUser


class EmailAccountManager(BaseUserManager):
    def create_user(self, user_name, email, phone_number, password, **other_fields):
        if not email:
            raise ValueError('user must have an email to register')

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, password=password,
                          phone_number=phone_number, **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user



    def create_superuser(self, user_name, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if not email:
            raise ValueError('superuser must have an email to register')

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, password=password,
                          **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

# {
# "user_name":"Aya",
# "email":"aya.kk@gmail.com",
# "password1":"12345",
# "password2":"12345",
# "phone_number":"050302904321"
# }

class EmailAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email address', unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    objects = EmailAccountManager()


    groups = models.ManyToManyField(
        'auth.Group',
        related_name='email_accounts',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='email_accounts',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )
    
    objects = EmailAccountManager()


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name']
    

