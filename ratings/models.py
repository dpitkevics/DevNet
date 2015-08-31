from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from model_utils.models import TimeStampedModel

from . import settings


class Rating(models.Model):
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    total_score = models.FloatField(default=0)
    total_votes = models.PositiveIntegerField(default=0)

    @staticmethod
    def get_or_create(content_object):
        try:
            rating = Rating.objects.get(content_type=ContentType.objects.get_for_model(content_object),
                                        object_id=content_object.pk)
        except ObjectDoesNotExist:
            rating = Rating()
            rating.create(content_object)

        return rating

    def __str__(self):
        return "%s / %s" % (self.total_score, float(settings.RATINGS_MAX))

    def create(self, content_object):
        self.content_type = ContentType.objects.get_for_model(content_object)
        self.object_id = content_object.pk
        self.content_object = content_object

        self.save()

    def add_vote(self, score, ip_address, user=None):
        if score > settings.RATINGS_MAX or score < settings.RATINGS_MIN:
            raise AttributeError("Score should be between defined rating min and max.")

        self.total_score = ((self.total_score * self.total_votes) + score) / (self.total_votes + 1)
        self.total_votes += 1
        self.save()

        rating_score = RatingScore()
        rating_score.rating = self
        rating_score.user = user
        rating_score.score = score
        rating_score.ip_address = ip_address
        rating_score.save()


class RatingScore(TimeStampedModel):
    rating = models.ForeignKey(Rating)
    user = models.ForeignKey(User)

    score = models.FloatField()
    ip_address = models.GenericIPAddressField()
