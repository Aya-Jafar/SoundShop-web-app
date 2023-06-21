from django.shortcuts import render
from .models import *
from .models import Product
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .selializers import *
from rest_framework import status
from rest_framework.permissions import AllowAny

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

from authentication.authorization import JWTAuthentication


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
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_order(request):
    # TODO: check if user is authenticated

    print(request.user)

    # get current  customer
    customer = User.objects.get(id=request.user.id)

    # get current customer order
    order, created = Order.objects.get_or_create(
        customer=customer, completed=False)

    serializer = CardSerializers(order)
    return Response(serializer.data)


@api_view(['GET'])
def get_items(request):
    # TODO: check if user is authenticated

    # get current  customer
    customer = User.objects.get(id=1)
    # get current customer order
    order, created = Order.objects.get_or_create(
        customer=customer, completed=False)

    items = order.items.all()

    serializer = ItemSerializers(items, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def add_to_card(request):
    # TODO: check if user is authenticated

    # get current  customer
    customer = User.objects.get(id=1)
    try:
        order = Order.objects.get(customer=customer)
        if not order.completed:
            item = OrderItem.objects.create(
                order=order, product=request.POST.get('product'), qnt=1)
            order.items.add(item)
        else:
            pass

    except Order.DoesNotExist:
        order = Order.objects.create(customer=customer)
        item = OrderItem.objects.create(
            order=order, product=request.POST.get('product'), qnt=1)
        order.items.add(item)


@api_view(['POST'])
def checkout(request):
    # TODO: check if user is authenticated

    # get current  customer
    customer = User.objects.get(id=1)

    order, created = Order.objects.get_or_create(customer=customer)
    order.completed = True

    # TODO: Add Zaincash implementation


# @api_view(['POST'])
# def increase_item_qnt(request):
#     # TODO: check if user is authenticated

#     # get current  customer
#     customer = Customer.objects.get(name="Aya Jafar")
#     order = Order.objects.get(customer=customer)
#     item = OrderItem.objects.get(order=order, id=request.POST.get('id'), qnt=1)
#     item.total *= item.product.price * item.qnt
