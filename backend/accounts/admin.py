from django.contrib import admin
from .models import MyUser

# Register your models here.

class MyUserAdmin(admin.ModelAdmin):
    list_display = ('id','email','nickname','is_admin')

admin.site.register(MyUser, MyUserAdmin)