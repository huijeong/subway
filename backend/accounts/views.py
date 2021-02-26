from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MyUserSerializer
from .models import MyUser

# Create your views here.
class MyUserView(viewsets.ModelViewSet):
    serializer_class = MyUserSerializer
    queryset = MyUser.objects.all()
