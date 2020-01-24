from rest_framework import permissions
from core.models import User


class IsUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = User.objects.get(pk=request.user.id)
        return obj.user == user or user.is_superuser or user.is_staff
