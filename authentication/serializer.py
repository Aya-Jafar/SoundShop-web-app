from rest_framework import serializers


class AccountInSerializer(serializers.Serializer):
    user_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=15)
    password1 = serializers.CharField(max_length=128)
    password2 = serializers.CharField(max_length=128)


class SigninInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)
