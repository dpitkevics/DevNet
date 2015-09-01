from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist

from django.contrib.auth.models import User

from skills.models import Skill


def get_avatar(self):
    try:
        profile = self.profile

        if profile.avatar is None or profile.avatar == '':
            raise ObjectDoesNotExist()

        return profile.avatar
    except ObjectDoesNotExist:
        return "http://www.sourcecoi.com/sites/default/files/team/defaultpic_0.png"


User.add_to_class('get_avatar', get_avatar)


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name="profile", verbose_name=_("user"))

    avatar = models.URLField(blank=True)
    skill_set = models.ManyToManyField(Skill)
