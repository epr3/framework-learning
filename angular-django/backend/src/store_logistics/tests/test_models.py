from django.test import TestCase

from ..factories import AddressFactory, OrderFactory, OrderWithBookFactory


class AddressModelTestCase(TestCase):
    def setUp(self):
        self.address = AddressFactory()

    def test_address_max_length(self):
        max_length = self.address._meta.get_field('address').max_length
        self.assertEqual(max_length, 255)

    def test_city_max_length(self):
        max_length = self.address._meta.get_field('city').max_length
        self.assertEqual(max_length, 255)

    def test_county_max_length(self):
        max_length = self.address._meta.get_field('county').max_length
        self.assertEqual(max_length, 255)

    def test_postal_code_max_length(self):
        max_length = self.address._meta.get_field('postal_code').max_length
        self.assertEqual(max_length, 10)


class OrderModelTestCase(TestCase):
    def setUp(self):
        self.order_with_book = OrderWithBookFactory()

    def test_books_length(self):
        books_length = self.order_with_book.books.count()
        self.assertEqual(books_length, 1)

    def test_order_value(self):
        order_value = self.order_with_book.order_value
        self.assertGreater(order_value, 0)
