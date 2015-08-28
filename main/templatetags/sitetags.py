from django import template

from DevNet import local_settings


register = template.Library()


@register.simple_tag
def get_site_url():
    return local_settings.SITE_URL