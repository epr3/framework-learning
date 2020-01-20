import factory
from faker import Faker
from faker.providers import isbn, misc, person, lorem, address, date_time, file
from django.utils import timezone
from .models import Category, Series, Book, Review, Language, Author
from core.factories import ProfileFactory

fake = Faker()
fake.add_provider(isbn)
fake.add_provider(misc)
fake.add_provider(person)
fake.add_provider(lorem)
fake.add_provider(address)
fake.add_provider(date_time)
fake.add_provider(file)


class CategoryFactory(factory.DjangoModelFactory):
    class Meta:
        model = Category
    name = factory.LazyFunction(fake.word)


class AuthorFactory(factory.DjangoModelFactory):
    class Meta:
        model = Author
    name = factory.LazyFunction(fake.name)
    biographic_note = factory.LazyFunction(fake.text)


class LanguageFactory(factory.DjangoModelFactory):
    class Meta:
        model = Language
    language = factory.LazyFunction(fake.country)
    language_code = factory.LazyFunction(fake.language_code)


class SeriesFactory(factory.DjangoModelFactory):
    class Meta:
        model = Series
    name = factory.LazyFunction(fake.name)


class BookFactory(factory.DjangoModelFactory):
    class Meta:
        model = Book
    name = factory.LazyFunction(fake.name)
    description = factory.LazyFunction(fake.text)
    publishing_house = factory.LazyFunction(fake.name)
    publishing_date = factory.LazyFunction(fake.date_object)
    isbn_13 = factory.LazyFunction(fake.isbn13)
    isbn_10 = factory.LazyFunction(fake.isbn10)
    pages = factory.LazyFunction(fake.random_number)
    price = factory.LazyFunction(fake.random_number)
    cover = factory.LazyFunction(fake.file_path)
    book_type = factory.LazyFunction(fake.name)
    language = factory.SubFactory(LanguageFactory)
    series = factory.SubFactory(SeriesFactory)
    author = factory.SubFactory(AuthorFactory)
    category = factory.SubFactory(CategoryFactory)


class ReviewFactory(factory.DjangoModelFactory):
    class Meta:
        model = Review
    user = factory.SubFactory(ProfileFactory)
    grade = fake.random_int(min=1, max=5)
    book = factory.SubFactory(BookFactory)
