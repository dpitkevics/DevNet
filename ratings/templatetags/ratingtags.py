from django import template

from ..models import Rating


register = template.Library()


@register.assignment_tag
def get_rating(content_object):
    return Rating.get_or_create(content_object)
