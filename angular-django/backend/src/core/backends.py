from django.contrib.auth.backends import ModelBackend
from .models import User
from django.db.models import ObjectDoesNotExist


class APIBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except ObjectDoesNotExist:
            return None
