# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_auto_20150831_1650'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='required_skill_set',
        ),
    ]
