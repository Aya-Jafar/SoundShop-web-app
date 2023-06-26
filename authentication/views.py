from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model

from authentication.authorization import create_token_for_user
from authentication.serializer import AccountInSerializer , SigninInSerializer
import json


User = get_user_model()


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AccountInSerializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['password1'] != serializer.validated_data['password2']:
                return Response({'detail': 'Passwords should match'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                User.objects.get(email=serializer.validated_data['email'])
                return Response({'message': 'Email is already taken'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                new_user = User.objects.create_user(
                    user_name=serializer.validated_data['user_name'],  # Pass the username argument
                    email=serializer.validated_data['email'],
                    password=serializer.validated_data['password1'],
                    phone_number=serializer.validated_data['phone_number']
                )

                token = create_token_for_user(new_user)

                return Response({'token': token, 'account': new_user}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# {
#   "user_name": "john_doe",
#   "email": "john.doe@example.com",
#   "phone_number": "1234567890",
#   "password1": "password123",
#   "password2": "password123"
# }

# {
#        "email": "john.doe@example.com",
#        "password": "password123"
# }


class SigninView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SigninInSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.validated_data['email'])
                if user.check_password(serializer.validated_data['password']):
                    token = create_token_for_user(user)
                    # Convert the User object to a JSON serializable format
                    account_data = {
                        'id': user.id,
                        'email': user.email,
                        'user_name': user.user_name,
                        'phone_number': user.phone_number
                    }
                    return Response({'token': token, 'account': account_data}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
                
            except User.DoesNotExist:
                return Response({'message': 'User is not registered'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

