# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_remove_profile_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='skill_set',
            field=taggit.managers.TaggableManager(through='taggit.TaggedItem', verbose_name='Skill set', blank=True, to='taggit.Tag', help_text=None),
        ),
    ]
