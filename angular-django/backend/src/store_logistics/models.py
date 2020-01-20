from uuid import uuid4
from functools import reduce
from django.db import models
from core.models import Profile
from books.models import Book


class Address(models.Model):
    class Meta:
        verbose_name_plural = "Addresses"
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    county = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=10)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    status = models.IntegerField(choices=list(
        zip(
            range(0, 6),
            ['placed', 'in processing', 'prepared for delivery',
                'in delivery', 'delivered']
        ))
    )
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    delivery_address = models.ForeignKey(
        Address, on_delete=models.DO_NOTHING, related_name='order_delivery_address')
    billing_address = models.ForeignKey(
        Address, on_delete=models.DO_NOTHING, related_name='order_billing_address')
    books = models.ManyToManyField(Book, through='OrderBooks')

    @property
    def order_value(self):
        return reduce(lambda x, y: x.book.price * x.quantity + y.book.price * y.quantity, self.books)


class OrderBooks(models.Model):
    class Meta:
        verbose_name_plural = "Order books"
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField()
