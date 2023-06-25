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



class ItemSerializers(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    product_image = serializers.ImageField(source='product.image')

    class Meta:
        model = OrderItem
        fields = ['id', 'qnt', 'date_added', 'total', 'product_name', 'product_image']

        



class SocialAccountSerializer(serializers.Serializer):
    uid = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    
