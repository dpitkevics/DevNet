from django import template

from ..models import Category


register = template.Library()


@register.assignment_tag()
def get_categories():
    categories = Category.objects.all()

    return categories
