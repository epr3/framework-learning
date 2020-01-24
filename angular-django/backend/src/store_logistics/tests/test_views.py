from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from core.factories import UserFactory
from books.factories import BookFactory
from ..factories import AddressFactory, OrderWithBookFactory


class AddressListViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.address = AddressFactory(user=self.user)

    def test_get(self):
        other_address = AddressFactory()
        url = reverse('address-list')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_post(self):
        url = reverse('address-list')
        self.client.force_authenticate(user=self.user)
        body = {
            'address': 'test',
            'city': 'test',
            'county': 'test',
            'postal_code': '111111',
            'user': self.user.id
        }
        response = self.client.post(url, data=body, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class AddressDetailViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.address = AddressFactory(user=self.user)

    def test_delete(self):
        url = reverse('address-detail', args=[str(self.address.id)])
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_put(self):
        url = reverse('address-detail', args=[str(self.address.id)])
        self.client.force_authenticate(user=self.user)
        body = {
            'address': 'test',
            'city': 'test',
            'county': 'test',
            'postal_code': '111111',
            'user': self.user.id
        }
        response = self.client.put(url, data=body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class OrderListViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.book = BookFactory()
        self.order = OrderWithBookFactory(user=self.user)
        self.address = AddressFactory(user=self.user)

    def test_get(self):
        url = reverse('order-list')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_post(self):
        url = reverse('order-list')
        self.client.force_authenticate(user=self.user)
        body = {
            'delivery_address_id': self.address.id,
            'billing_address_id': self.address.id,
            'user': self.user.id,
            'books': [
                {
                    'book_id': self.book.id,
                    'quantity': 1
                }
            ]
        }
        response = self.client.post(url, data=body, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class OrderDetailViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.order = OrderWithBookFactory(user=self.user)

    def test_get(self):
        url = reverse('order-detail', args=[str(self.order.id)])
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
