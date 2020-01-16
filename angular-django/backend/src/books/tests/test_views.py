from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Book
from ..factories import BookFactory


class BookListViewTestCase(APITestCase):
    def setUp(self):
        self.book = BookFactory()

    def test_get(self):
        url = reverse('book-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class BookDetailViewTestCase(APITestCase):

    def setUp(self):
        self.book = BookFactory()

    def test_get(self):
        url = reverse('book-detail', args=[str(self.book.id)])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
