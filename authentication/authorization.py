from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from jose import jwt, JWTError
from django.conf import settings
from django.contrib.auth import get_user_model
import datetime

User = get_user_model()

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = self.get_token_from_request(request)
        if not token:
            return None

        user = self.authenticate_credentials(token)
        return (user, token)

    def get_token_from_request(self, request):
        # Extract the token from the request headers, query parameters, or cookies
        # Adjust this logic based on how you expect to receive the JWT token
        # For example, you can retrieve it from the Authorization header like:
        # token = request.headers.get('Authorization', '').split(' ')[1]
        token = request.GET.get('token')
        return token

    def authenticate_credentials(self, token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
        except JWTError:
            raise AuthenticationFailed('Invalid token')

        user_id = payload.get('pk')
        if user_id:
            try:
                user = User.objects.get(pk=user_id)
            except User.DoesNotExist:
                raise AuthenticationFailed('User not found')

            return user

        raise AuthenticationFailed('Invalid token payload')


def create_token_for_user(user):
    token = jwt.encode(
        {'pk': str(user.pk), 'created': datetime.datetime.now().isoformat()},
        settings.SECRET_KEY, algorithm='HS256'
    )
    return {'access': str(token)}
