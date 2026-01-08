from django.contrib import admin
from .models import Archive, TimelineEvent

@admin.register(Archive)
class ArchiveAdmin(admin.ModelAdmin):
    # 后台列表页显示的列
    list_display = ('date', 'title', 'category', 'serial_number', 'access_level')
    # 右侧筛选栏
    list_filter = ('category', 'access_level', 'date')
    # 搜索框匹配字段
    search_fields = ('title', 'serial_number')
    # 默认排序方式（按日期降序）
    ordering = ('-date',)

@admin.register(TimelineEvent)
class TimelineEventAdmin(admin.ModelAdmin):
    # 列表页显示年份和描述
    list_display = ('year', 'description')
    # 按年份排序
    ordering = ('year',)