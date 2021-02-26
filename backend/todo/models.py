from django.db import models
import sys
sys.path.append("..")
from accounts.models import MyUser

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey(
        MyUser, related_name="todos", on_delete=models.CASCADE, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.title