from django.db import models

# 注意：类名必须是 Archive，首字母大写
class Archive(models.Model):
    date = models.DateField()
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50)
    serial_number = models.CharField(max_length=100)
    access_level = models.CharField(max_length=20)

    class Meta:
        verbose_name = "数字档案"
        verbose_name_plural = "数字档案列表"

    def __str__(self):
        return self.title

class TimelineEvent(models.Model):
    year = models.IntegerField()
    description = models.TextField()

    class Meta:
        verbose_name = "校史事件"
        verbose_name_plural = "校史轴列表"