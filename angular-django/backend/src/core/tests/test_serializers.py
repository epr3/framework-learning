from django.test import TestCase

from ..factories import UserFactory, ProfileFactory
from ..serializers import UserSerializer, ProfileSerializer, UserSerializer, LoginSerializer, RegisterSerializer


class LoginSerializerTestCase(TestCase):
    def setUp(self):
        self.serializer_data = {
            'email': 'test@test.com',
            'password': '12345678'
        }
        self.serializer = LoginSerializer(data=self.serializer_data)

    def test_contains_expected_fields(self):
        self.serializer.is_valid()
        data = self.serializer.data

        self.assertCountEqual(
            data.keys(),
            [
                'email',
                'password'
            ]
        )


class RegisterSerializerTestCase(TestCase):
    def setUp(self):
        self.serializer_data = {
            'email': 'test@test.com',
            'password': '12345678',
            'password_confirmation': '12345678'
        }
        self.serializer = RegisterSerializer(data=self.serializer_data)

    def test_contains_expected_fields(self):
        self.serializer.is_valid()
        data = self.serializer.data

        self.assertCountEqual(
            data.keys(),
            [
                'email',
                'password',
                'password_confirmation'
            ]
        )

    def test_password_match_fail(self):
        self.serializer_data['password'] = '1234567'

        serializer = RegisterSerializer(data=self.serializer_data)

        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors), set(['non_field_errors']))

    def test_email_unique_fail(self):
        self.serializer.is_valid()
        self.serializer.save()

        serializer = RegisterSerializer(data=self.serializer_data)

        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors), set(['email']))


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
