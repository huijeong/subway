#accounts/api/serializers.py
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import models
from rest_framework import serializers
import sys
sys.path.append("..")
from ..models import MyUser

MyUser._meta.get_field('email')._unique = True

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        print(model)
        fields = ('id','nickname','is_admin')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'email', 'nickname', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_date):
        user = MyUser.objects.create_user(
            validated_date['email'],
            validated_date['nickname'],
            validated_date['password']
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')

#https://medium.com/@hckcksrl/django-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%9C%A0%EC%A0%80-%EB%AA%A8%EB%8D%B8-custom-user-model-b8487c0d150