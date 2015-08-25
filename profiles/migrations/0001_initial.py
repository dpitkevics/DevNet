# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('username', models.CharField(max_length=64)),
                ('avatar', models.URLField()),
                ('user', models.OneToOneField(related_name='profile', to=settings.AUTH_USER_MODEL, verbose_name='user')),
            ],
        ),
        migrations.CreateModel(
            name='ProfileSkill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('title', models.CharField(max_length=64)),
                ('profile', models.ForeignKey(to='profiles.Profile')),
            ],
        ),
    ]
