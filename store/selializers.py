from rest_framework.serializers import ModelSerializer
from .models import *
from rest_framework import serializers



class ProdSerializers(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CardSerializers(ModelSerializer):
    class Meta:
        model = Order
        fields=['total_qnt' , 'total_price','count_order_items','completed']




class ItemSerializers(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['qnt','date_added','product','total']
        



class SocialAccountSerializer(serializers.Serializer):
    uid = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    
