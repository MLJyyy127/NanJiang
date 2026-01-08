# campus/urls.py
from django.urls import path
from . import views

app_name = 'campus'  # 添加命名空间

urlpatterns = [
    # 官网首页
    path('', views.campus_index, name='campus_index'),
    
]