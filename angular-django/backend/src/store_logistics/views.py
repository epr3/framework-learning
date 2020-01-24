from rest_framework import generics, mixins
from core.permissions import IsUser
from .models import Address, Order
from .serializers import AddressSerializer, OrderSerializer


class AddressListView(generics.ListCreateAPIView):
    permission_classes = [IsUser]
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)


class AddressDetailView(mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    permission_classes = [IsUser]
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class OrderListView(generics.ListCreateAPIView):
    permission_classes = [IsUser]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = [IsUser]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
