from django.shortcuts import render
from .models import *
from .models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .selializers import *
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .selializers import SocialAccountSerializer
from rest_framework import status
from django.contrib.auth import login


from rest_framework import generics, permissions
from rest_framework.response import Response




@api_view(['GET'])
def all_prods(request):
    products = Product.objects.all()
    serializer = ProdSerializers(products, many=True)
    return Response(serializer.data)







