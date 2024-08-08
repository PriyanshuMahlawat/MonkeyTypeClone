# Generated by Django 4.2 on 2024-08-03 00:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("realapp", "0003_alter_pastrecords_user"),
    ]

    operations = [
        migrations.CreateModel(
            name="bestRecord15",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="bestRecord60",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="pastrecords",
            name="time",
            field=models.IntegerField(default=15),
            preserve_default=False,
        ),
    ]
