# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0002_auto_20150616_2121'),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profileskill',
            name='profile',
        ),
        migrations.AddField(
            model_name='profile',
            name='skill_set',
            field=taggit.managers.TaggableManager(verbose_name='Tags', to='taggit.Tag', help_text='A comma-separated list of tags.', through='taggit.TaggedItem'),
        ),
        migrations.DeleteModel(
            name='ProfileSkill',
        ),
    ]
