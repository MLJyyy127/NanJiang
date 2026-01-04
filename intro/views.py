from django.shortcuts import render

def index(request):
    # 确保 templates/intro/index.html 已经存在
    return render(request, 'intro/index.html')
