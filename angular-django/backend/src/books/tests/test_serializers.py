from django.test import TestCase

from ..factories import BookFactory, LanguageFactory, SeriesFactory, CategoryFactory, AuthorFactory
from ..serializers import BookSerializer, SeriesSerializer, CategorySerializer, AuthorSerializer, LanguageSerializer


class BookSerializerTestCase(TestCase):
    def setUp(self):
        self.book = BookFactory()
        self.serializer = BookSerializer(instance=self.book)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(), ['id', 'name', 'description', 'publishing_house', 'publishing_date',
                                            'isbn_13', 'isbn_10', 'pages', 'price', 'cover', 'book_type', 'language', 'series', 'author', 'category'])


class SeriesSerializerTestCase(TestCase):
    def setUp(self):
        self.series = SeriesFactory()
        self.serializer = SeriesSerializer(instance=self.series)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(), ['id', 'name'])


class CategorySerializerTestCase(TestCase):
    def setUp(self):
        self.category = CategoryFactory()
        self.serializer = CategorySerializer(instance=self.category)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(), ['id', 'name'])


class LanguageSerializerTestCase(TestCase):
    def setUp(self):
        self.language = LanguageFactory()
        self.serializer = LanguageSerializer(instance=self.language)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(), ['id', 'language', 'language_code'])


class AuthorSerializerTestCase(TestCase):
    def setUp(self):
        self.author = AuthorFactory()
        self.serializer = AuthorSerializer(instance=self.author)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(), ['id', 'name', 'biographic_note'])
