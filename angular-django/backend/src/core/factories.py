import factory
from faker import Faker
from faker.providers import internet, misc
from django.utils import timezone
from .models import User, RefreshToken

fake = Faker()
fake.add_provider(internet)
fake.add_provider(misc)


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
    email = factory.LazyFunction(fake.email)
    password = "12345678"

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        """Override the default ``_create`` with our custom call."""
        manager = cls._get_manager(model_class)
        # The default would use ``manager.create(*args, **kwargs)``
        return manager.create_user(*args, **kwargs)


class RefreshTokenFactory(factory.DjangoModelFactory):
    class Meta:
        model = RefreshToken
    token = factory.LazyFunction(fake.sha256)
    expiry_date = factory.LazyFunction(timezone.now)
    user = factory.SubFactory(UserFactory)
