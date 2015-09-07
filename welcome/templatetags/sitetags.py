from django import template
from django.core.urlresolvers import resolve

from DevNet import local_settings


register = template.Library()


@register.simple_tag
def get_socket_url():
    return local_settings.SOCKET_URL
 
 
@register.simple_tag
def current(request, urls):
    current_url = resolve(request.path_info).url_name

    if current_url in urls:
        return "active-menu-item"
    return ""
