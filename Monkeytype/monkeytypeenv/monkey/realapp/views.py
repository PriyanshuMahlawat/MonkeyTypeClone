from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout
from .forms import UserForm,UserInfoForm
from django.shortcuts import redirect 
from rest_framework import generics
from .models import pastRecords,UserInfo
from .serializers import pastRecordsSerializer,pastRecordsAliasSerializer
from django.views.decorators.csrf import csrf_protect,ensure_csrf_cookie
from django.contrib import messages

# Create your views here.


class pastRecordAPIView(generics.ListCreateAPIView):
    queryset = pastRecords.objects.all()
    serializer_class = pastRecordsSerializer

class pastRecordAliasAPIView(generics.ListCreateAPIView):
    queryset = pastRecords.objects.all()
    serializer_class = pastRecordsAliasSerializer

    
def register(request):
    registered = False
    if request.method == "POST":
        user_form = UserForm(request.POST)
        userinfo_form = UserInfoForm(request.POST,request.FILES)
        if user_form.is_valid() and userinfo_form.is_valid():
            user = user_form.save(commit=False)
            user.set_password(user.password)
            user.save()

            userinfo = userinfo_form.save(commit=False)
            userinfo.user = user
            if 'profile_pic' in request.FILES:
                userinfo.profile_pic = request.FILES['profile_pic']
                userinfo.save()
                registered = True
                return redirect('realapp/type.html')
               
                
        else:
            print(user_form.errors,userinfo_form.errors)

    else:
        user_form = UserForm()
        userinfo_form = UserInfoForm()
    return {"user_form":user_form,"userinfo_form":userinfo_form,"registered":registered}


def user_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        positive = authenticate(username=username, password=password)
        if positive:
            login(request, positive)
            userinfo = positive.userinfo
            
            
            request.session['logged_in'] = True
            request.session['alias'] = userinfo.alias
            request.session['user_id'] = positive.id
            request.session['inputerr']  =False
            
            
            return redirect('test')  
        else:
            request.session['logged_in'] = False
            request.session['alias'] = ''
            request.session['user_id'] = ''
            request.session['inputerr'] = True
            return redirect('test')  
    
    return redirect('test')  

@csrf_protect

def auth_view(request):
    context = {}
    context['logged_in'] = request.session.get('logged_in', False)
    context['alias'] = request.session.get('alias', '')
    context['user_id'] = request.session.get('user_id', '')
    context['inputerr'] = request.session.get('inputerr', False)
    if request.method=="POST":

        if 'login' in request.POST:
            context.update(user_login(request))
        if 'register' in request.POST or request.FILES:
            context.update(register(request))

    if 'user_form' not in context or 'userinfo_form' not in context:
        user_form = UserForm()
        userinfo_form = UserInfoForm()
        context.update({
            "user_form": user_form,
            "userinfo_form": userinfo_form,
            "registered": False
        })   
    
        
    return render(request,"realapp/index.html",context)

@csrf_protect
def typeView(request):
    context = {}

    
    context['logged_in'] = request.session.get('logged_in', False)
    context['alias'] = request.session.get('alias', '')
    context['user_id'] = request.session.get('user_id', '')
    context['inputerr'] = request.session.get('inputerr', False)
    if request.method == "POST":
        if 'login' in request.POST:
            return user_login(request)
        if 'register' in request.POST or request.FILES:
            context.update(register(request))
        
    if 'user_form' not in context or 'userinfo_form' not in context:
        user_form = UserForm()
        userinfo_form = UserInfoForm()
        context.update({
            "user_form": user_form,
            "userinfo_form": userinfo_form,
            "registered": False
        })
    
    return render(request, "realapp/type.html", context)

@csrf_protect
def leaderboardView(request):
    context = {}
    context['logged_in'] = request.session.get('logged_in', False)
    context['alias'] = request.session.get('alias', '')
    context['user_id'] = request.session.get('user_id', '') 
    context['inputerr'] = request.session.get('inputerr', False)
    if request.method=="POST":

        if 'login' in request.POST:
            context.update(user_login(request))
        if 'register' in request.POST or request.FILES:
            context.update(register(request))

    if 'user_form' not in context or 'userinfo_form' not in context:
        user_form = UserForm()
        userinfo_form = UserInfoForm()
        context.update({
            "user_form": user_form,
            "userinfo_form": userinfo_form,
            "registered": False
        })   
    
        
    return render(request,"realapp/leaderboard.html",context)

@csrf_protect
def aboutView(request):
    context = {}
    context['logged_in'] = request.session.get('logged_in', False)
    context['alias'] = request.session.get('alias', '')
    context['user_id'] = request.session.get('user_id', '')
    context['inputerr'] = request.session.get('inputerr', False)
    if request.method=="POST":

        if 'login' in request.POST:
            context.update(user_login(request))
        if 'register' in request.POST or request.FILES:
            context.update(register(request))
        
    if 'user_form' not in context or 'userinfo_form' not in context:
        user_form = UserForm()
        userinfo_form = UserInfoForm()
        context.update({
            "user_form": user_form,
            "userinfo_form": userinfo_form,
            "registered": False
        })
        
    return render(request,"realapp/about.html",context)






@login_required
def user_logout(request):
    logout(request)
    request.session.pop('logged_in', None)
    request.session.pop('alias', None)
    request.session.pop('user_id', None)
    request.session.pop('inputerr',None)
    return redirect("test")
