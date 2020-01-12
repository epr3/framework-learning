# Generated by Django 3.0.2 on 2020-01-12 17:27

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0005_auto_20200112_0900'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='publishing_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='review',
            name='grade',
            field=models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)]),
        ),
    ]