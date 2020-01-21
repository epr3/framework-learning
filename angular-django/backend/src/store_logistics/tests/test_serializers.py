from django.test import TestCase

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
        self.serializer = OrderSerializer(instance=self.order)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(
            data.keys(), ['id', 'status', 'delivery_address', 'billing_address', 'order_value', 'books'])
