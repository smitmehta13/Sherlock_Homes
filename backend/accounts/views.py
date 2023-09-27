# creating apis for user

from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User

# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    return render(request, 'links.html')

@api_view(['GET'])
def userList(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def userCreate(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User created successfully', 'user_id': user.id})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def userDetail(request, pk):
    users = User.objects.get(id=pk)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def userUpdate(request, pk):
    users = User.objects.get(id=pk)
    serializer = UserSerializer(instance=users, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def userDelete(request, pk):
    users = User.objects.get(id=pk)
    users.delete()
    return Response("Item successfully deleted!")


