from django.urls import path
from . import views

app_name = 'archive'

urlpatterns = [
    path('', views.archive_index, name='archive_index'),
    path('<int:pk>/', views.archive_detail, name='archive_detail'),
]