from django import forms
from .models import UserInfo
from django.contrib.auth.models import User

class UserInfoForm(forms.ModelForm):
    class Meta():
        model = UserInfo
        fields = ('alias','profile_pic')


class UserForm(forms.ModelForm):
    class Meta():
        model = User
        fields = ('username','password')
        widgets = {
            "password": forms.PasswordInput(),
        }