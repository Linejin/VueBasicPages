# Generated by Django 5.1 on 2024-08-28 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project1', '0007_comment_alter_uploadedprofileimage_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='MapMarkerLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
