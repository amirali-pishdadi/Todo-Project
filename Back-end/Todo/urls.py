from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('', views.TodosViewSetApiView)

urlpatterns = [
    path("", views.GetAllTodo.as_view()),
    path("<int:todo_id>", views.DetailTodo.as_view()),
    path("mixins/", views.TodosMixinsApiView.as_view()),
    path("mixins/<int:pk>", views.TodoDetailMixinsApiView.as_view()),
    path("generics/", views.TodosGenericApiView.as_view()),
    path("generics/<int:pk>", views.TodoGenericDetailApiView.as_view()),
    path("viewsets/", include(router.urls)),
    path("users/", views.UserGenericApiView.as_view()),
]
