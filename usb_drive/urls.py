from django.urls import path
from . import views

urlpatterns = [
    # 对应 U盘 根目录: /usb-drive/
    path('', views.usb_home, name='usb_home'),
    
    # 对应 草稿文档: /usb-drive/draft/
    # 注意：name='usb_draft' 必须与你 HTML 里的 {% url 'usb_draft' %} 一致
    path('draft/', views.usb_draft, name='usb_draft'),
]