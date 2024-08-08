from django.db import models
from django.contrib.auth.models import User
from django.templatetags.static import static

# Create your models here.
class UserInfo(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to='images/',blank=False)
    alias = models.CharField(max_length=25)
    
    def __str__(self):
        return self.alias
    

class pastRecords(models.Model):
    user  = models.ForeignKey(User,on_delete=models.CASCADE)
    wpm = models.IntegerField()
    accuracy = models.FloatField()
    time_typing = models.IntegerField(default=15)

    def __str__(self):
        return self.user.username



        
    

    



    
