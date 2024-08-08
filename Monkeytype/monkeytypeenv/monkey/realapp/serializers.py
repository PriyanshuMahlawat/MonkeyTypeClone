from rest_framework import serializers
from .models import pastRecords,UserInfo
from django.contrib.auth.models import User

class pastRecordsSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = pastRecords
            fields = ('wpm','accuracy','user',)


class pastRecordsAliasSerializer(serializers.ModelSerializer):
    alias = serializers.CharField(source='user.userinfo.alias',read_only=True)

    class Meta:
        model = pastRecords
        fields = ('wpm', 'accuracy', 'alias','user','time_typing')

    



                

  

        