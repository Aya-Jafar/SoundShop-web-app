
import datetime
from jwt import decode
from .models import *

def check_expire_date(token_expire_date):
    '''
    Check if the user is authorized based on his login date
    '''
    # Get the date of the last time the user logged in 
    created = datetime.strptime(token_expire_date ,'%Y-%m-%d %H:%M:%S.%f')
    # if the current date - the date of the last login exceed 7 days -> the user is not authorized and user should login again
    if int(datetime.now().day - created.day) < 3:
        return True
    return False


def get_current_user(request):
    # Get the token from the request headers
    token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]

    decoded_token = decode(token, verify=False)
    # print('Decoded Token:', decoded_token)

    # Extract the relevant information from the decoded token
    user_id = decoded_token.get('pk')

    current_customer = User.objects.get(id=user_id)

    return current_customer
