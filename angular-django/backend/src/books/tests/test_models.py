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
        self.assertEqual(field_label, 'publishing_house')

    def test_publishing_house_length(self):
        max_length = self.book._meta.get_field('publishing_house').max_length
        self.assertEqual(max_length, 255)
