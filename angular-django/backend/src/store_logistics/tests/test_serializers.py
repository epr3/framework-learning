from django.test import TestCase

from core.factories import UserFactory
from books.factories import BookFactory
from ..models import Order, OrderBooks
from ..factories import OrderWithBookFactory, OrderFactory, AddressFactory
from ..serializers import AddressSerializer, OrderSerializer, OrderBooksSerializer


class AddressSerializerTest(TestCase):
    def setUp(self):
        self.address = AddressFactory()
        self.serializer = AddressSerializer(instance=self.address)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(
            data.keys(), ['id', 'address', 'city', 'county', 'postal_code'])


class OrderSerializerTest(TestCase):
    def setUp(self):
        self.order = OrderWithBookFactory()
        self.address = AddressFactory()
        self.book = BookFactory()
        self.user = UserFactory()
        self.serializer = OrderSerializer(instance=self.order)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(
            data.keys(), ['id', 'status', 'delivery_address', 'billing_address', 'order_value', 'books'])

    def test_serializer_valid_data(self):
        serializer_data = {
            'delivery_address_id': self.address.id,
            'billing_address_id': self.address.id,
            'user': self.user.id,
            'books': [
                {
                    'book_id': self.book.id,
                    'quantity': 1
                }
            ]
        }

        serializer = OrderSerializer(data=serializer_data)
        self.assertTrue(serializer.is_valid())

    def test_serializer_save(self):
        other_book = BookFactory()
        serializer_data = {
            'delivery_address_id': self.address.id,
            'billing_address_id': self.address.id,
            'user': self.user.id,
            'books': [
                {
                    'book_id': self.book.id,
                    'quantity': 1
                },
                {
                    'book_id': other_book.id,
                    'quantity': 1
                }
            ]
        }

        serializer = OrderSerializer(data=serializer_data)
        serializer.is_valid()
        serializer.save()
        self.assertEqual(Order.objects.count(), 2)
        self.assertEqual(OrderBooks.objects.count(), 3)
