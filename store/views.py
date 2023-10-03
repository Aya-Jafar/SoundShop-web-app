from store.models import *

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from store.selializers import *
from rest_framework import status
from rest_framework.permissions import AllowAny

from rest_framework.authentication import TokenAuthentication

from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

# from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import HttpRequest

from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.views.decorators.csrf import csrf_exempt
import os
from jwt import InvalidSignatureError
from store.services import get_current_user , check_expire_date
import jwt
import requests
from django.shortcuts import redirect
from datetime import datetime , timedelta
from dotenv import load_dotenv


load_dotenv()


User = get_user_model()


@api_view(['GET'])
@permission_classes([AllowAny])
def all_prods(request):
    try:
        products = Product.objects.all()
        serializer = ProdSerializers(products, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    except:
        return status.HTTP_404_NOT_FOUND


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
def get_order(request):

    try:
        try:
            current_customer = get_current_user(request)

            # print(current_customer)
            # Get the current customer's order
            try:
                order = Order.objects.get(customer=current_customer, completed=False)
            except Order.DoesNotExist:
                order = Order.objects.create(customer=current_customer, completed=False)
            
            serializer = CardSerializers(order)

            return Response(serializer.data)
        
        except InvalidSignatureError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    
    except:
        return Response({'error': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
def get_items(request):
    try:

        current_customer = get_current_user(request)
        # get current customer order
        try:
            order = Order.objects.get(
                customer=current_customer, completed=False)
            # if not created:
            items = order.items.all()
            # for i in items:
            #     print(i.id)
            serializer = ItemSerializers(items, many=True)
            return Response(serializer.data)
        
        except Order.DoesNotExist:
            order = Order.objects.create(customer=current_customer, completed=False)
            items = order.items.all()
            serializer = ItemSerializers(items, many=True)
            return Response(serializer.data)
    
    except:
        return Response({'error': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)




@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
def add_to_card(request):
    print("Request", request.query_params)

    customer = get_current_user(request)
    if customer:
        try:
            order = Order.objects.get(customer=customer, completed=False)
            try:
                item = OrderItem.objects.get(
                    order=order,
                    product=Product.objects.get(
                        id=request.data['id']
                    ),
                )
                item.qnt += 1
                item.save()
                return Response({
                    'message':'Item quantity updated successfully'
                } , status=status.HTTP_200_OK)
            except OrderItem.DoesNotExist:
                item = OrderItem.objects.create(order=order, 
                                                product=Product.objects.get(id=request.data.get('id')), 
                                                qnt=1)
            order.save()
            return Response({
                    'message':'Item created successfully'
                } , status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            res = create_update_order(request , customer)
            return res



def create_update_order(request , user):
    user_items = user.items.filter()

    try:
        # Getting the order that is not ordered yet and getting the product id of
        # the items in the order
        order = user.orders.prefetch_related('items').get()
        list_of_productID_in_order = [
            item['product_id'] for item in order.items.values('product_id')
        ]

        # Checking if the item is in the order and if it is, it will add the item to the order.
        # If it is not in the order it will create new item and add it to the order.
        
        list_of_difference_items = []
        list_of_intersection_items = [
            (item, item.quantity) if item.product_id in list_of_productID_in_order
            else list_of_difference_items.append(item.id) for item in user_items
        ]

        OrderItem.objects.filter(
            id__in=list_of_difference_items).update()

        for item, qty in list(filter(None, list_of_intersection_items)):
            item_duplicated = order.items.get(product_id=item.product_id)
            item_duplicated.quantity = item_duplicated.quantity + qty
            item_duplicated.save()

        order.items.add(*list_of_difference_items)
        order.save()
        return Response({'detail': 'Card updated successfully!'} , status=status.HTTP_200_OK)

    except Order.DoesNotExist:
        order = Order.objects.create(
            customer=user , completed=False)

        order.items.set(user_items)

        order.save()
        return Response({'detail': 'Card Created and item added Successfully!'} , status=status.HTTP_200_OK)




@api_view(['POST'])
# @authentication_classes([JSONWebTokenAuthentication])
def checkout(request):
    customer = User.objects.get(user_name='john_doe')

    order = Order.objects.get(customer=customer, completed=False)
    order.completed = True

    total_amount = order.total_price

    # Add Zaincash implementation
    payload = {
        'amount': total_amount,
        'serviceType': 'Buy an instrument',
        'msisdn': customer.phone_number,
        'orderId': str(order.id),
        'redirectUrl': "http://127.0.0.1:20000/store/zaincash-finish/",
        'iat': datetime.now(),
        'exp': datetime.now() + timedelta(hours=24)
    }
    expiration_time = payload['exp']

    zaincash_secret = '$2y$10$hBbAZo2GfSSvyqAyV2SaqOfYewgYpfR1O19gIh4SqyGWdmySZYPuS'

    # print(datetime.now() > expiration_time)
    # print((datetime.now() - payload['iat']) )

    # if the current date exceeds the expiration time
    # if datetime.now() > expiration_time:
    #     # Token has expired, generate a new token
    #     payload['exp'] = expiration_time
    #     new_token = jwt.encode(payload, key=zaincash_secret, algorithm='HS256')
    #     token = new_token
    # else:
    token = jwt.encode(payload, key=zaincash_secret, algorithm='HS256')

    print(token.decode())
    # Make a request to the Zaincash API to initiate the payment transaction
    data = {
        "token": token,  
        "merchantId": "5ffacf6612b5777c6d44266f",
        "lang": "en",
    }

    response = requests.post('https://test.zaincash.iq/transaction/init', data=data )
    
    body = response.json()
    print(body)

    if 'id' in body:
        # Redirect the customer to the Zaincash payment page
        return Response({
            'ZC_url': f"https://test.zaincash.iq/transaction/pay?id={body['id']}",

        }, status=status.HTTP_200_OK)
    else:
        # Handle the case where the Zaincash token couldn't be generated
        return Response({'message': 'Cannot generate Zaincash token'}, status=status.HTTP_400_BAD_REQUEST)






@api_view(['GET'])
def zaincash_finish(request):

    zaincash_secret = '$2y$10$hBbAZo2GfSSvyqAyV2SaqOfYewgYpfR1O19gIh4SqyGWdmySZYPuS'
    token = request.GET.get('token')


    try:
        result = jwt.decode(token, key=zaincash_secret, algorithms=['HS256'])
        transaction_status = result.get('status')

        if transaction_status == 'success':
            return Response({'message': 'Transaction completed successfully'}, status=status.HTTP_200_OK)
        
        elif transaction_status == 'failed':
            return Response({'message': 'Failed to complete transaction'}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({'message': 'Invalid token'}, status=status.HTTP_404_NOT_FOUND)
        
    except jwt.exceptions.DecodeError as e:
        return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)




'''
    {'source': 'web', 
    'type': 'MERCHANT_PAYMENT', 
    'amount': '3700', 
    'to': '5ffacf6612b5777c6d44266f', 
    'serviceType': 'Buy an instrument', 
    'lang': 'en', 
    'orderId': '2', 
    'currencyConversion': {}, 
    'referenceNumber': '3KUTQO', 
    'redirectUrl': 'http://127.0.0.1:20000/store/zaincash-finish/', 
    'credit': False, 
    'status': 'pending', 
    'reversed': False, 
    'createdAt': '2023-07-05T00:53:27.635Z', 
    'updatedAt': '2023-07-05T00:53:27.635Z', 
    'id': '64a4bf071de52b1a65c349bb'}
'''



# @api_view(['POST' , 'GET'])
# @csrf_exempt
# def zaincash_get(request):
#     # Retrieve the required data from the request
#     id = request.POST.get('id')
#     msisdn = request.POST.get('msisdn')
#     merchant_id = request.POST.get('merchantId')

#     # Set the API endpoint URL based on the environment
#     r_url = 'https://api.zaincash.iq/transaction/get'
#     secret = '$2y$10$hBbAZo2GfSSvyqAyV2SaqOfYewgYpfR1O19gIh4SqyGWdmySZYPuS'

#     # Build the data payload for JWT encoding
#     data = {
#         'id': id,
#         'msisdn': msisdn,
#         'iat': datetime.now(),
#         'exp': datetime.now() + timedelta(hours=24)
#     }

#     # Encode the JWT token
#     new_token = jwt.encode(data, key=secret, algorithm='HS256')

#     # Prepare the data to be sent as POST request to ZainCash API
#     data_to_post = {
#         'token': new_token,
#         'merchantId': merchant_id,
#         'lang':'en'
#     }


#     # Send the POST request to ZainCash API
#     response = requests.post(r_url, data=data_to_post)

#     print(response.json())

#     return Response({'message': response.text})





# @api_view(['POST'])
# def decrease_item_qnt(request):
#     # TODO: Add this to urls.py 

#     '''Pass product id '''

#     customer = get_current_user(request)

#     order = Order.objects.get(customer=customer)
#     item = OrderItem.objects.get(order=order, 
#                                 product=Product.objects.get(id=request.data.get('id')))
#     if item.qnt == 1:
#         item.delete()
#         return Response({'detail': 'Item was deleted Successfully!'} , status=status.HTTP_200_OK)
#     else:
#         item.qnt -= 1
#         item.total -= item.product.price
#         item.save()
#         return Response({'detail': 'Item quantity was decreased Successfully!'} , status=status.HTTP_200_OK)
