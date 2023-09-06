from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.apiOverview, name="api-overview"),
    path('', views.userList, name="user-list"),
    path('create/', views.userCreate, name="user-create"),
    path('<str:pk>/', views.userDetail, name="user-detail"),
    path('<str:pk>/update/', views.userUpdate, name="user-update"),
    path('<str:pk>/delete/', views.userDelete, name="user-delete"),
]