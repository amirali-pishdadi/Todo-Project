from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
user = get_user_model()


class Todo(models.Model):
    title = models.CharField(max_length=300, verbose_name="عنوان")
    content = models.TextField(verbose_name="توضیحات")
    priority = models.IntegerField(default=1, verbose_name="اولویت")
    is_done = models.BooleanField(verbose_name="تمام شده / نشده")
    user = models.ForeignKey(user, on_delete=models.CASCADE, related_name="Todos_List", verbose_name="کاربر")

    def __str__(self):
        return f"Title : {self.title} / Is Done : {self.is_done}"

    class Meta:
        db_table = "Todos_List"
