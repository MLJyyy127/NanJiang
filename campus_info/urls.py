from django.urls import path
from . import views

app_name = 'campus_info' # 设置命名空间

urlpatterns = [
    path('about/', views.about_view, name='about'),
]