from django.shortcuts import render

def usb_home(request):
    # 指向 usb_drive/templates/usb_drive/usb_home.html
    return render(request, 'usb_drive/usb_home.html')

def usb_draft(request):
    # 指向 usb_drive/templates/usb_drive/draft.html
    return render(request, 'usb_drive/draft.html')