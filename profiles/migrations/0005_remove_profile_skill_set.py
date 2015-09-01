# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_auto_20150831_1623'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='skill_set',
        ),
    ]
