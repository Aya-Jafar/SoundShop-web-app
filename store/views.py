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

from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from jwt import InvalidSignatureError
from store.services import get_current_user , check_expire_date
import jwt
import requests
from django.shortcuts import redirect
from datetime import datetime , timedelta



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

    # get current  customer
    # customer = get_current_user(request) # TODO 

    customer = User.objects.get(user_name='john_doe')


    order = Order.objects.get(customer=customer)
    order.completed = True
    order.save()
    total_amount = order.total_price # TODO: this should be converted to IQD

    '''TODO: Add Zaincash implementation'''

    # Generate the Zaincash token
    payload = {
        'amount': total_amount,
        'serviceType': 'Buy an instrument',
        'msisdn': 9647835077893,  # Replace with the customer's phone number
        'orderId': str(order.id),  # Use the order ID as an identifier for the transaction
        'redirectUrl': "http://127.0.0.1:20000/zaincash-finish/",
        # 'iat':datetime.now(),
        # 'exp': datetime.now() + timedelta(hours=4)
    }

    zaincash_secret = '$2y$10$hBbAZo2GfSSvyqAyV2SaqOfYewgYpfR1O19gIh4SqyGWdmySZYPuS'
    token = jwt.encode(payload, zaincash_secret, algorithm='HS256')
    # print(jwt.decode(token))


    # Make a request to the Zaincash API to initiate the payment transaction
    data = {
        'token': token,
        'merchantId': "5ffacf6612b5777c6d44266f",
        'lang': "en",
    }
    response = requests.post('https://test.zaincash.iq/transaction/init', data=data)
    body = response.json()  # Response body as JSON { 'id': 'asdae123asd123asd' }

    print(body)

    return Response({'message': 'test'})

    # if 'id' in body:
    #     # Redirect the customer to the Zaincash payment page
    #     return redirect('https://test.zaincash.iq/transaction/pay?id=' + body['id'])
    # else:
    #     # Handle the case where the Zaincash token couldn't be generated
    #     return Response({'message': 'Cannot generate Zaincash token'}, status=400)


    





@api_view(['POST'])
def decrease_item_qnt(request):
    # TODO: Add this to urls.py 

    '''Pass product id '''

    customer = get_current_user(request)

    order = Order.objects.get(customer=customer)
    item = OrderItem.objects.get(order=order, 
                                product=Product.objects.get(id=request.data.get('id')))
    if item.qnt == 1:
        item.delete()
        return Response({'detail': 'Item was deleted Successfully!'} , status=status.HTTP_200_OK)
    else:
        item.qnt -= 1
        item.total -= item.product.price
        item.save()
        return Response({'detail': 'Item quantity was decreased Successfully!'} , status=status.HTTP_200_OK)
