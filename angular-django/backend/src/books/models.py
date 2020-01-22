from uuid import uuid4
from django.db import models
from core.models import Profile


class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=255)


class Series(models.Model):
    class Meta:
        verbose_name_plural = "Series"
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=255)


class Author(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=255)
    biographic_note = models.CharField(max_length=255)


class Language(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    language = models.CharField(max_length=50)
    language_code = models.CharField(max_length=2)


class Book(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    publishing_house = models.CharField(max_length=255)
    publishing_date = models.DateField()
    isbn_13 = models.CharField(max_length=13)
    isbn_10 = models.CharField(max_length=10)
    pages = models.IntegerField()
    price = models.FloatField()
    cover = models.ImageField(default=None)
    book_type = models.CharField(max_length=100)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    series = models.ForeignKey(Series, on_delete=models.DO_NOTHING, null=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class Review(models.Model):
    class Meta:
        unique_together = ['user', 'book']
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    grade = models.IntegerField(choices=list(zip(range(1, 6), range(1, 6))))
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
