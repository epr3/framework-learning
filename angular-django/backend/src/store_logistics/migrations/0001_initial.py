# Generated by Django 3.0.2 on 2020-01-19 17:05

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('books', '0006_auto_20200112_1727'),
        ('core', '0005_passwordreset'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('county', models.CharField(max_length=255)),
                ('postal_code', models.CharField(max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('status', models.IntegerField(choices=[('placed', 0), ('in processing', 1), ('prepared for delivery', 2), ('in delivery', 3), ('delivered', 4)])),
                ('billing_address', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='order_billing_address', to='store_logistics.Address')),
            ],
        ),
        migrations.CreateModel(
            name='OrderBooks',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('quantity', models.IntegerField()),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.Book')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store_logistics.Order')),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='books',
            field=models.ManyToManyField(through='store_logistics.OrderBooks', to='books.Book'),
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_address',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='order_delivery_address', to='store_logistics.Address'),
        ),
        migrations.AddField(
            model_name='order',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Profile'),
        ),
    ]
