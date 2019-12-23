import factory
from .models import User, RefreshToken


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User


class RefreshTokenFactory(factory.DjangoModelFactory):
    class Meta:
        model = RefreshToken

    user = factory.SubFactory(UserFactory)
