from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Book
from .serializers import BookSerializer


class BookListView(generics.ListAPIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetailView(generics.RetrieveAPIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
