from rest_framework import serializers
from books.models import Book
from books.serializers import BookSerializer, LanguageSerializer, AuthorSerializer
from .models import Order, Address, OrderBooks


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'address', 'city', 'county', 'postal_code', 'user']
        read_only_fields = ['id']
        extra_kwargs = {'user': {'write_only': True}}


class OrderBooksSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='book.name', read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        source='book', queryset=Book.objects.all(), write_only=True)
    publishing_house = serializers.CharField(
        source='book.publishing_house', read_only=True)
    publishing_date = serializers.CharField(
        source='book.publishing_date', read_only=True)
    cover = serializers.ImageField(
        source='book.cover', use_url=True, read_only=True)
    language = LanguageSerializer(source='book.language', read_only=True)
    author = AuthorSerializer(source='book.author', read_only=True)

    class Meta:
        model = OrderBooks
        fields = [
            'id',
            'cover',
            'name',
            'publishing_house',
            'publishing_date',
            'language',
            'author',
            'quantity',
            'book_id'
        ]
        read_only_fields = ['id']


class OrderSerializer(serializers.ModelSerializer):
    delivery_address = AddressSerializer(read_only=True)
    billing_address = AddressSerializer(read_only=True)
    books = OrderBooksSerializer(many=True, source='orderbooks_set')
    delivery_address_id = serializers.PrimaryKeyRelatedField(
        queryset=Address.objects.all(), write_only=True)
    billing_address_id = serializers.PrimaryKeyRelatedField(
        queryset=Address.objects.all(), write_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'status',
            'order_value',
            'delivery_address',
            'billing_address',
            'books',
            'delivery_address_id',
            'billing_address_id',
            'user'
        ]
        read_only_fields = ['id', 'status', 'order_value', 'books']
        extra_kwargs = {
            'user': {'write_only': True}
        }

    def create(self, validated_data):
        orderbooks_data = validated_data.pop('orderbooks_set')
        order = Order.objects.create(
            delivery_address=validated_data['delivery_address_id'],
            billing_address=validated_data['billing_address_id'],
            user=validated_data['user']
        )
        for item in orderbooks_data:
            OrderBooks.objects.create(
                order=order,
                book=item['book'],
                quantity=item['quantity']
            )
        return order
