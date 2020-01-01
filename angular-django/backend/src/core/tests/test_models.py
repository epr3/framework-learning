from django.test import TestCase

from ..factories import UserFactory, RefreshTokenFactory, ProfileFactory


class UserModelTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory()

    def test_email_field_label(self):
        field_label = self.user._meta.get_field('email').verbose_name
        self.assertEqual(field_label, 'email')

    def test_email_unique(self):
        is_unique = self.user._meta.get_field('email').unique
        self.assertEqual(is_unique, True)

class ProfileModelTestCase(TestCase):
    def setUp(self):
        self.profile = ProfileFactory()

    def test_name_field_label(self):
        field_label = self.profile._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_surname_field_label(self):
        field_label = self.profile._meta.get_field('surname').verbose_name
        self.assertEqual(field_label, 'surname')

    def test_telephone_field_label(self):
        field_label = self.profile._meta.get_field('telephone').verbose_name
        self.assertEqual(field_label, 'telephone')

    def test_telephone_length(self):
        max_length = self.profile._meta.get_field('telephone').max_length
        self.assertEqual(max_length, 30)

    def test_name_length(self):
        max_length = self.profile._meta.get_field('name').max_length
        self.assertEqual(max_length, 50)

    def test_surname_length(self):
        max_length = self.profile._meta.get_field('surname').max_length
        self.assertEqual(max_length, 50)



class RefreshTokenModelTestCase(TestCase):
    def setUp(self):
        self.refresh_token = RefreshTokenFactory()

    def test_token_field_label(self):
        field_label = self.refresh_token._meta.get_field('token').verbose_name
        self.assertEqual(field_label, 'token')

    def test_expiry_date_field_label(self):
        field_label = self.refresh_token._meta.get_field(
            'expiry_date').verbose_name
        self.assertEqual(field_label, 'expiry date')

    def test_user_field_label(self):
        field_label = self.refresh_token._meta.get_field('user').verbose_name
        self.assertEqual(field_label, 'user')

    def test_token_max_length(self):
        max_length = self.refresh_token._meta.get_field('token').max_length
        self.assertEqual(max_length, 255)
