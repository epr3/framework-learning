import factory
from faker import Faker
from faker.providers import internet, misc, person, phone_number
from django.utils import timezone
from .models import User, RefreshToken, Profile

fake = Faker()
fake.add_provider(internet)
fake.add_provider(misc)
fake.add_provider(person)
fake.add_provider(phone_number)


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
    id = factory.LazyFunction(fake.uuid4)
    email = factory.LazyFunction(fake.email)
    password = "12345678"

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        """Override the default ``_create`` with our custom call."""
        manager = cls._get_manager(model_class)
        # The default would use ``manager.create(*args, **kwargs)``
        return manager.create_user(*args, **kwargs)

class ProfileFactory(factory.DjangoModelFactory):
    class Meta:
        model = Profile
    name = factory.LazyFunction(fake.first_name)
    surname = factory.LazyFunction(fake.last_name)
    telephone = factory.LazyFunction(fake.phone_number)
    user = factory.SubFactory(UserFactory)


class RefreshTokenFactory(factory.DjangoModelFactory):
    class Meta:
        model = RefreshToken
    token = factory.LazyFunction(fake.sha256)
    expiry_date = factory.LazyFunction(timezone.now)
    user = factory.SubFactory(UserFactory)
