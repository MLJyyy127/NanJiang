from django.shortcuts import render

def campus_index(request):
    """官网首页视图"""
    return render(request, 'campus/index.html')