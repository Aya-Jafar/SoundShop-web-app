
from django.urls import path 
from . import views
from django.urls import include, path
from django.urls import re_path

urlpatterns = [
    path('', views.all_prods ),
    # path('add-to-card/',views.add_to_cart),
    # path('google-login/', views.GoogleConnect.as_view())
]    




