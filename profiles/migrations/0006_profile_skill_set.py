# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('skills', '0001_initial'),
        ('profiles', '0005_remove_profile_skill_set'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='skill_set',
            field=models.ManyToManyField(to='skills.Skill'),
        ),
    ]
