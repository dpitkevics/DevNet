# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('taggit', '0002_auto_20150616_2121'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('title', models.CharField(max_length=128)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='media/projects/')),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('required_skill_set', taggit.managers.TaggableManager(through='taggit.TaggedItem', verbose_name='Required skills', to='taggit.Tag', help_text=None)),
            ],
        ),
        migrations.CreateModel(
            name='ProjectParticipants',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('project', models.ForeignKey(to='projects.Project')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
