from django.test import TestCase
from ..factories import CategoryFactory, SeriesFactory, AuthorFactory, BookFactory, ReviewFactory, LanguageFactory


class CategoryModelTestCase(TestCase):
    def setUp(self):
        self.category = CategoryFactory()

    def test_name_field_label(self):
        field_label = self.category._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_name_length(self):
        max_length = self.category._meta.get_field('name').max_length
        self.assertEqual(max_length, 255)


class SeriesModelTestCase(TestCase):
    def setUp(self):
        self.series = SeriesFactory()

    def test_name_field_label(self):
        field_label = self.series._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_name_length(self):
        max_length = self.series._meta.get_field('name').max_length
        self.assertEqual(max_length, 255)


class AuthorModelTestCase(TestCase):
    def setUp(self):
        self.author = AuthorFactory()

    def test_name_field_label(self):
        field_label = self.author._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_name_length(self):
        max_length = self.author._meta.get_field('name').max_length
        self.assertEqual(max_length, 255)

    def test_biographic_note_field_label(self):
        field_label = self.author._meta.get_field(
            'biographic_note').verbose_name
        self.assertEqual(field_label, 'biographic note')

    def test_biographic_note_length(self):
        max_length = self.author._meta.get_field('biographic_note').max_length
        self.assertEqual(max_length, 255)


class LanguageModelTestCase(TestCase):

    def setUp(self):
        self.language = LanguageFactory()

    def test_language_field_label(self):
        field_label = self.language._meta.get_field('language').verbose_name
        self.assertEqual(field_label, 'language')

    def test_language_length(self):
        max_length = self.language._meta.get_field('language').max_length
        self.assertEqual(max_length, 50)

    def test_language_code_field_label(self):
        field_label = self.language._meta.get_field(
            'language_code').verbose_name
        self.assertEqual(field_label, 'language code')

    def test_language_code_length(self):
        max_length = self.language._meta.get_field('language_code').max_length
        self.assertEqual(max_length, 2)


class BookModelTestCase(TestCase):
    def setUp(self):
        self.book = BookFactory()

    def test_name_field_label(self):
        field_label = self.book._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_name_length(self):
        max_length = self.book._meta.get_field('name').max_length
        self.assertEqual(max_length, 255)

    def test_description_field_label(self):
        field_label = self.book._meta.get_field('description').verbose_name
        self.assertEqual(field_label, 'description')

    def test_description_length(self):
        max_length = self.book._meta.get_field('description').max_length
        self.assertEqual(max_length, 255)

    def test_publishing_house_field_label(self):
        field_label = self.book._meta.get_field(
            'publishing_house').verbose_name
        self.assertEqual(field_label, 'publishing house')

    def test_publishing_house_length(self):
        max_length = self.book._meta.get_field('publishing_house').max_length
        self.assertEqual(max_length, 255)

    def test_publishing_date_field_label(self):
        field_label = self.book._meta.get_field(
            'publishing_date').verbose_name
        self.assertEqual(field_label, 'publishing date')

    def test_isbn_13_field_label(self):
        field_label = self.book._meta.get_field(
            'isbn_13').verbose_name
        self.assertEqual(field_label, 'isbn 13')

    def test_isbn_13_length(self):
        max_length = self.book._meta.get_field('isbn_13').max_length
        self.assertEqual(max_length, 13)

    def test_isbn_10_field_label(self):
        field_label = self.book._meta.get_field(
            'isbn_10').verbose_name
        self.assertEqual(field_label, 'isbn 10')

    def test_isbn_10_length(self):
        max_length = self.book._meta.get_field('isbn_10').max_length
        self.assertEqual(max_length, 10)

    def test_pages_field_label(self):
        field_label = self.book._meta.get_field(
            'pages').verbose_name
        self.assertEqual(field_label, 'pages')

    def test_price_field_label(self):
        field_label = self.book._meta.get_field(
            'price').verbose_name
        self.assertEqual(field_label, 'price')

    def test_cover_field_label(self):
        field_label = self.book._meta.get_field(
            'cover').verbose_name
        self.assertEqual(field_label, 'cover')

    def test_book_type_field_label(self):
        field_label = self.book._meta.get_field(
            'book_type').verbose_name
        self.assertEqual(field_label, 'book type')

    def test_book_type_field_length(self):
        max_length = self.book._meta.get_field(
            'book_type').max_length
        self.assertEqual(max_length, 100)

    def test_language_field_label(self):
        field_label = self.book._meta.get_field(
            'language').verbose_name
        self.assertEqual(field_label, 'language')

    def test_series_field_label(self):
        field_label = self.book._meta.get_field(
            'series').verbose_name
        self.assertEqual(field_label, 'series')

    def test_author_field_label(self):
        field_label = self.book._meta.get_field(
            'author').verbose_name
        self.assertEqual(field_label, 'author')

    def test_category_field_label(self):
        field_label = self.book._meta.get_field(
            'category').verbose_name
        self.assertEqual(field_label, 'category')
