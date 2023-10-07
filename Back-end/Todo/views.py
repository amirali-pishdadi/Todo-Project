from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.views import APIView
from .serializers import *
from .models import Todo
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiParameter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework import mixins, generics
from django.contrib.auth import get_user_model
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

User = get_user_model()


#
# def GetAllTodo(request: Request):
#     todos = Todo.objects.order_by("priority").all()
#     todos_serializer = TodoModelSerializers(todos, many=True)
#     return Response(todos_serializer.data, status=status.HTTP_200_OK)

# CRUD : Create (POST) , Read (GET) , Update (PUT) , Delete (DELETE)
class GetAllTodo(APIView):

    @extend_schema(
        request=TodoModelSerializers,
        responses={201: TodoModelSerializers},
        methods=["POST", "GET"],
    )
    def get(self, request: Request):
        todos = Todo.objects.filter(is_done=False).order_by("priority").all()
        # todos = Todo.objects.order_by("priority").all() / For Done and Not Done
        todos_serializer = TodoModelSerializers(todos, many=True)
        return Response(todos_serializer.data, status.HTTP_200_OK)

    def post(self, request: Request):
        todos_diserialize = TodoModelSerializers(data=request.data)
        if todos_diserialize.is_valid():
            todos_diserialize.save()
            return Response(todos_diserialize.data, status=status.HTTP_201_CREATED)


class DetailTodo(APIView):

    def get_object(self, todo_id: int):
        try:
            todo = Todo.objects.get(pk=todo_id)
            return todo
        except Todo.DoesNotExist:
            return Response("", status.HTTP_404_NOT_FOUND)

    def get(self, request: Request, todo_id: int):
        todo = self.get_object(todo_id)
        serializer = TodoModelSerializers(todo)
        return Response(serializer.data, status.HTTP_200_OK)

    def put(self, request: Request, todo_id: int):
        todo = self.get_object(todo_id)
        serializer = TodoModelSerializers(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_202_ACCEPTED)
        return Response(None, status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, todo_id: int):
        todo = self.get_object(todo_id)
        todo.delete()
        return Response(None, status.HTTP_204_NO_CONTENT)


# Mixins

class TodosMixinsApiView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Todo.objects.order_by("priority").all()
    serializer_class = TodoModelSerializers
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)


class TodoDetailMixinsApiView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                              generics.GenericAPIView):
    queryset = Todo.objects.order_by("priority").all()
    serializer_class = TodoModelSerializers

    def get(self, request, pk: int):
        return self.retrieve(request, pk)

    def put(self, request, pk: int):
        return self.update(request, pk)

    def delete(self, request, pk: int):
        return self.delete(request, pk)


# Generic

class TodoPaginationApiView(PageNumberPagination):
    page_size = 3


class TodosGenericApiView(generics.ListCreateAPIView):
    queryset = Todo.objects.order_by("priority").all()
    serializer_class = TodoModelSerializers
    pagination_class = TodoPaginationApiView
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class TodoGenericDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.order_by("priority").all()
    serializer_class = TodoModelSerializers


# View Sets

class TodosViewSetApiView(viewsets.ModelViewSet):
    queryset = Todo.objects.order_by("priority").all()
    authentication_classes = [BasicAuthentication]
    serializer_class = TodoModelSerializers
    permission_classes = [IsAuthenticated]


# User

class UserGenericApiView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializers
