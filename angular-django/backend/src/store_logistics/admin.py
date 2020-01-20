from django.contrib import admin
from .models import Address, Order, OrderBooks


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'address', 'city', 'county', 'postal_code', 'user')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'status', 'user', 'delivery_address',
                    'billing_address', 'order_value')


@admin.register(OrderBooks)
class OrderBooksAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'book', 'quantity')
