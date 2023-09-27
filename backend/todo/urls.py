from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.apiOverview, name="api-overview"),
    path('', views.taskList, name="task-list"),
    path('create/', views.taskCreate, name="task-create"),
    path('<str:pk>/', views.taskDetail, name="task-detail"),
    path('<str:pk>/update/', views.taskUpdate, name="task-update"),
    path('<str:pk>/delete/', views.taskDelete, name="task-delete"),
]


