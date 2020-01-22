from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from core.factories import UserFactory
from ..models import Address
from ..factories import AddressFactory


class AddressListViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.address = AddressFactory(user=self.user)

    def test_get(self):
        url = reverse('address-list')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
