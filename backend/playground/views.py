from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from django.contrib import messages

# Create your views here.
def index(request):
   return render(request, 'index.html', {'title': 'Home'})

def about(request):
   return render(request, 'about.html', {'title': 'About'})

def register(request):
   if request.method == 'POST':
      username = request.POST.get('name')
      password = request.POST.get('password')
      password2 = request.POST.get('confirm_password')
      email = request.POST.get('email')
      if password == password2:
         if User.objects.filter(email=email).exists():
            messages.info(request, 'Email already exists')
            return redirect('register')
         elif User.objects.filter(username=username).exists():
            messages.info(request, 'Username already exists')
            return redirect('register')
         else:
            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()
            print('User created')
            return redirect('login')
      else:
         messages.info(request, 'Passwords do not match')
         return redirect('register')
   else: return render(request, 'register.html', {'title': 'Register'})

def login(request):
   if request.method == 'POST':
      username = request.POST.get('username')
      password = request.POST.get('password')
      user = auth.authenticate(username=username, password=password)
      if user is not None:
         auth.login(request, user)
         return redirect('/')
      else:
         messages.info(request, 'Invalid credentials')
         return redirect('login')
   else: return render(request, 'login.html', {'title': 'Login'})