# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import model_utils.fields
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_auto_20150831_1644'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='created',
            field=model_utils.fields.AutoCreatedField(verbose_name='created', default=django.utils.timezone.now, editable=False),
        ),
        migrations.AddField(
            model_name='project',
            name='modified',
            field=model_utils.fields.AutoLastModifiedField(verbose_name='modified', default=django.utils.timezone.now, editable=False),
        ),
        migrations.AddField(
            model_name='projectparticipants',
            name='created',
            field=model_utils.fields.AutoCreatedField(verbose_name='created', default=django.utils.timezone.now, editable=False),
        ),
        migrations.AddField(
            model_name='projectparticipants',
            name='modified',
            field=model_utils.fields.AutoLastModifiedField(verbose_name='modified', default=django.utils.timezone.now, editable=False),
        ),
    ]
