from django import template

from DevNet.api_utils import get


register = template.Library()


@register.assignment_tag()
def get_categories(request):
    categories = get('api_categories_list')

    return categories
