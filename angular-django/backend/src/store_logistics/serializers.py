from rest_framework import serializers
from books.serializers import BookSerializer, LanguageSerializer, AuthorSerializer
from .models import Order, Address, OrderBooks


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'address', 'city', 'county', 'postal_code']
        read_only_fields = ['id']


class OrderBooksSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='book.name')
    book_id = serializers.UUIDField(source='book.id')
    publishing_house = serializers.CharField(
        source='book.publishing_house')
    publishing_date = serializers.CharField(source='book.publishing_date')
    cover = serializers.ImageField(source='book.cover', use_url=True)
    language = LanguageSerializer(source='book.language')
    author = AuthorSerializer(source='book.author')

    class Meta:
        model = OrderBooks
        fields = ['id', 'name', 'quantity', 'book_id', 'cover', 'publishing_house',
                  'language', 'author', 'publishing_date']
        read_only_fields = ['id', 'cover', 'publishing_house',
                            'publishing_date', 'language', 'author']


class OrderSerializer(serializers.ModelSerializer):
    delivery_address = AddressSerializer()
    billing_address = AddressSerializer()
    books = OrderBooksSerializer(many=True, source='orderbooks_set')

    class Meta:
        model = Order
        fields = ['id', 'status', 'delivery_address',
                  'billing_address', 'order_value', 'books']
        read_only_fields = ['id', 'status', 'order_value']

    def create(self, validated_data):
        books_data = validated_data.pop('books')
        order = Order.objects.create(**validated_data)
        for item in books_data:
            OrderBooks.objects.create(
                order=order, book=item.book, quantity=item.quantity)
        return order
