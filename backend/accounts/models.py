# coding: utf-8
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)
# Create your models here.

class MyUserManager(BaseUserManager):
    def create_user(self, email, nickname, password=None):
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            email=MyUserManager.normalize_email(email),
            nickname=nickname,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nickname, password):
        u = self.create_user(email=email, nickname=nickname, password=password)
        u.is_admin = True
        u.save(using=self._db)
        return u


class MyUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True
    )
    nickname = models.CharField(
        u'NickName',
        max_length=16,
        blank=False,
        unique=True,
        default=''
    )
    avatar = models.ImageField(
        null=True,
        blank=True,
        upload_to='image/avatar',
    )

    is_active = models.BooleanField(default=True)
    is_admin  = models.BooleanField(default=True)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    def get_full_name(self):
        return self.email
    
    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True
    
    @property
    def is_staff(self):
        return self.is_admin

