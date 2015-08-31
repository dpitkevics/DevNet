from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

from taggit.managers import TaggableManager
from model_utils.models import TimeStampedModel

from ratings.models import Rating


class Project(TimeStampedModel):
    author = models.ForeignKey(User)

    title = models.CharField(max_length=128)
    description = models.TextField()
    image = models.ImageField(upload_to='media/projects/', blank=True)

    required_skill_set = TaggableManager(verbose_name=_('Required skills'), help_text=None)

    def __str__(self):
        return self.title

    @property
    def default_image(self):
        return "http://image-link-archive.meteor.com/images/placeholder-640x480.png"


class ProjectParticipants(TimeStampedModel):
    project = models.ForeignKey(Project)
    user = models.ForeignKey(User)
