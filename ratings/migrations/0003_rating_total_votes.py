# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ratings', '0002_auto_20150831_1804'),
    ]

    operations = [
        migrations.AddField(
            model_name='rating',
            name='total_votes',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
