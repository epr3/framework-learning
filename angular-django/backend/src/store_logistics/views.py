from rest_framework import generics
from core.permissions import IsUser
from .models import Address
from .serializers import AddressSerializer


class AddressListView(generics.ListCreateAPIView):
    permission_classes = [IsUser]
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)
