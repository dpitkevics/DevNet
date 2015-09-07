# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('projects', '0007_projectcategory'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projectcategory',
            name='project',
        ),
        migrations.AddField(
            model_name='project',
            name='category',
            field=models.ForeignKey(default=1, to='categories.Category'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='ProjectCategory',
        ),
    ]
