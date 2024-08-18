
from rest_framework import permissions

class adminOrReadonlyPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return obj.username == str(request.user)
class propertyOwnerOrReadonlyPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            if request.user:
                return str(request.user) in [str(userobj) for userobj in obj.fkuser.all()]
            else:
                return False
        