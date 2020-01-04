from rest_framework import permissions


class IsUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_superadmin or request.user.is_staff