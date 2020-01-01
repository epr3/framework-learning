from django.test import TestCase

from ..factories import UserFactory, RefreshTokenFactory, ProfileFactory
from ..serializers import UserSerializer, RefreshTokenSerializer, ProfileSerializer


class UserSerializerTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.serializer = UserSerializer(instance=self.user)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(), ['email'])


class ProfileSerializerTestCase(TestCase):
    def setUp(self):
        self.profile = ProfileFactory()
        self.serializer = ProfileSerializer(instance=self.profile)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(),
                            ['name', 'surname', 'telephone', 'user'])


class RefreshTokenSerializerTestCase(TestCase):
    def setUp(self):
        self.refresh_token = RefreshTokenFactory()
        self.serializer = RefreshTokenSerializer(instance=self.refresh_token)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertCountEqual(data.keys(),
                              ['token', 'expiry_date', 'user'])
