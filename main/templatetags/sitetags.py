from django import template

from DevNet import local_settings


register = template.Library()


@register.simple_tag
def get_socket_url():
    return local_settings.SOCKET_URL
