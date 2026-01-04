# campus/urls.py
from django.urls import path
from . import views

app_name = 'campus'  # 添加命名空间

urlpatterns = [
    # 官网首页
    path('', views.campus_index, name='campus_index'),
    
    # 校史档案相关路由
    path('archive/', views.archive_index, name='archive_index'),
    path('archive/category/<str:category>/', views.archive_category, name='archive_category'),
    path('archive/<int:case_id>/', views.archive_detail, name='archive_detail'),
]