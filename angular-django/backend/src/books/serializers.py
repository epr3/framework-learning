from rest_framework import serializers
from .models import Book, Language, Author, Series, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Category


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Language


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Author


class SeriesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Series


class BookSerializer(serializers.ModelSerializer):
    series = SeriesSerializer()
    language = LanguageSerializer()
    author = AuthorSerializer()
    category = CategorySerializer()

    class Meta:
        fields = '__all__'
        model = Book
