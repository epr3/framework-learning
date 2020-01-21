from rest_framework import serializers
from books.serializers import BookSerializer, LanguageSerializer, AuthorSerializer
from .models import Order, Address, OrderBooks


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'address', 'city', 'county', 'postal_code']
        read_only_fields = ['id']


class BookWithQuantitySerializer(serializers.ModelSerializer):
    name = serializers.CharField(book.name)
    book_id = serializers.UUIDField(book.id)
    publishing_house = serializers.CharField(book.publishing_house)
    publishing_date = serializers.CharField(book.publishing_date)
    cover = serializers.ImageField(book.cover)
    language = LanguageSerializer(book.language)
    author = AuthorSerializer(book.author)

    class Meta:
        model = OrderBooks
        fields = ['id', 'quantity', 'price',
                  'book_id', 'cover', 'language', 'author']
        read_only_fields = ['id', 'price', 'cover',
                            'book_id', 'language', 'author']


class OrderSerializer(serializers.ModelSerializer):
    delivery_address = AddressSerializer()
    billing_address = AddressSerializer()
    books = BookWithQuantitySerializer(many=True, source='orderbooks_set')

    class Meta:
        model = Order
        fields = ['id', 'status', 'delivery_address',
                  'billing_address', 'order_value', 'books']
        read_only_fields = ['id', 'status', 'order_value']
