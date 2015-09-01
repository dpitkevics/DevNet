# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('skills', '0001_initial'),
        ('projects', '0004_remove_project_required_skill_set'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='required_skill_set',
            field=models.ManyToManyField(to='skills.Skill'),
        ),
    ]
