from django.db import models
import PIL
from django.contrib.auth import get_user_model


User = get_user_model()



class Product(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    price = models.FloatField()
    image = models.ImageField(null=True, blank=True,upload_to="images/")

    def __str__(self):
        return self.name



class Order(models.Model):
    customer = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='orders')
    
    date_ordered = models.DateTimeField(auto_now_add=True)
    # if false,order is an open card and we can add more to it
    completed = models.BooleanField(default=False)
    translation_id = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.id} - {self.customer}'


    @property
    def total_price(self):
        return sum([item.total for item in self.items.all()])

    @property
    def total_qnt(self):
        return sum([item.qnt for item in self.items.all()])

    @property
    def count_order_items(self) -> int:
        return len(self.items.all())




class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=True, blank=True)
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, null=True, blank=True, related_name='items')
    qnt = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.id} - {self.product}'


    @property
    def total(self) -> int:
        return self.product.price * self.qnt





class ShippingAddress(models.Model):
    customer = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=False)
    city = models.CharField(max_length=200, null=False)
    state = models.CharField(max_length=200, null=False)
    zipcode = models.CharField(max_length=200, null=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.address


