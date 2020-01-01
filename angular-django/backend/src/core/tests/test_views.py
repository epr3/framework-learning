from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import User, RefreshToken, Profile
from ..factories import UserFactory, RefreshTokenFactory, ProfileFactory


class LoginTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()

    def test_post(self):
        url = reverse('login')
        data = {'email': self.user.email, 'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(RefreshToken.objects.count(), 1)


class LogoutTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.refresh_token = RefreshTokenFactory(user=self.user)

    def test_delete(self):
        url = reverse('logout')
        self.client.force_authenticate(user=self.user)
        self.client.cookies['refresh_token'] = self.refresh_token.token
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(RefreshToken.objects.count(), 0)


class RegisterTestCase(APITestCase):
    def test_post(self):
        url = reverse('register')
        data = {'email': 'test@test.com', 'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(RefreshToken.objects.count(), 1)


class RefreshTokenTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.refresh_token = RefreshTokenFactory(user=self.user)

    def test_get(self):
        url = reverse('refresh-token')
        self.client.cookies['refresh_token'] = self.refresh_token.token
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProfileTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.profile = ProfileFactory(user=self.user)

    def test_get(self):
        url = reverse('profile')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put(self):
        url = reverse('profile')
        self.client.force_authenticate(user=self.user)
        response = self.client.put(
            url,
            {
                'name': 'test2',
                'surname': 'test2',
                'telephone': 'test2'
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'test2')
