# campus/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.campus_index, name='campus_index'), # 官网首页
]