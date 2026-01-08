from django.shortcuts import get_object_or_404, render
from .models import Archive, TimelineEvent

def archive_index(request):
    # 获取搜索关键词
    query = request.GET.get('q')
    if query:
        archives = Archive.objects.filter(title__icontains=query).order_constraint('-date')
    else:
        archives = Archive.objects.all().order_by('-date')
        
    timeline = TimelineEvent.objects.all()
    
    context = {
        'archives': archives,
        'timeline': timeline,
    }
    return render(request, 'campus_archive/archive.html', context)

# --- 添加下面这个函数 ---
def archive_detail(request, pk):
    """档案详情页视图"""
    archive = get_object_or_404(Archive, pk=pk)
    return render(request, 'campus_archives/detail.html', {'archive': archive})