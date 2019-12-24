from django.test import TestCase

from ..factories import UserFactory, RefreshTokenFactory
from ..serializers import UserSerializer, RefreshTokenSerializer


class UserSerializerTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.serializer = UserSerializer(instance=self.user)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(), ['email'])


class RefreshTokenSerializerTestCase(TestCase):
    def setUp(self):
        self.refresh_token = RefreshTokenFactory()
        self.serializer = RefreshTokenSerializer(instance=self.refresh_token)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(),
                              ['token', 'expiry_date', 'user'])
