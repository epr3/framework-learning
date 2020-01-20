import factory
from faker import Faker
from faker.providers import address
from core.factories import ProfileFactory
from books.factories import BookFactory
from .models import Order, OrderBooks, Address

fake = Faker()
fake.add_provider(address)


class AddressFactory(factory.DjangoModelFactory):
    class Meta:
        model = Address
    address = factory.LazyFunction(fake.address)
    city = factory.LazyFunction(fake.city)
    county = factory.LazyFunction(fake.state)
    postal_code = factory.LazyFunction(fake.postalcode)
    user = factory.SubFactory(ProfileFactory)


class OrderFactory(factory.DjangoModelFactory):
    class Meta:
        model = Order
    status = fake.random_int(min=0, max=5)
    user = factory.SubFactory(ProfileFactory)
    delivery_address = factory.SubFactory(AddressFactory)
    billing_address = factory.SubFactory(AddressFactory)


class OrderBooksFactory(factory.DjangoModelFactory):
    class Meta:
        model = OrderBooks
    book = factory.SubFactory(BookFactory)
    order = factory.SubFactory(OrderFactory)
    quantity = fake.random_int(min=0, max=100)


class OrderWithBookFactory(OrderFactory):
    union = factory.RelatedFactory(OrderBooksFactory, 'order')
