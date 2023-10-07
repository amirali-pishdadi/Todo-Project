from rest_framework.serializers import *
from .models import Todo
from django.contrib.auth import get_user_model

User = get_user_model()


class TodoModelSerializers(ModelSerializer):
    def validate_priority(self, priority):
        if priority > 10:
            raise ValidationError("Mio ")
        return priority

    class Meta:
        model = Todo
        fields = "__all__"                        #  ["title", "content", "priority", "is_done", "user"]


class UserModelSerializers(ModelSerializer):
    Todos_List = TodoModelSerializers(read_only=True, many=True)

    class Meta:
        model = User
        fields = ["id", "Todos_List", "is_superuser", "username", "first_name", "last_name", "email", "is_active"]
