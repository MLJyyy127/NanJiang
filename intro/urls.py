from django.urls import path
from . import views

urlpatterns = [
    # 这里的 name="index" 要和你的跳转逻辑对应
    path('', views.index, name='index'),
    
]