from django.contrib import admin
from django.forms import ModelForm, ValidationError
from django.core.files.images import get_image_dimensions
from .models import Category, Series, Author, Language, Review, Book


class BookForm(ModelForm):
    class Meta:
        model = Book
        fields = '__all__'

    def clean_cover(self):
        cover = self.cleaned_data["cover"]
        width, height = get_image_dimensions(cover.file)
        if width < 900 or height < 900:
            raise ValidationError("Improper size.")
        return cover


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'biographic_note')


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('id', 'language', 'language_code')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'grade', 'book')


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    form = BookForm
    list_display = ('id', 'name', 'description', 'publishing_house', 'isbn_13', 'isbn_10',
                    'pages', 'cover', 'book_type', 'language', 'series', 'author', 'category')
