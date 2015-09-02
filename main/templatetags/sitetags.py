from django import template
from django.core.urlresolvers import reverse

from DevNet import local_settings


register = template.Library()


@register.simple_tag
def get_socket_url():
    return local_settings.SOCKET_URL
 
 
@register.simple_tag
def current(request, urls):
    if request.path in ( reverse(url) for url in urls.split() ):
        return "active-menu-item"
    return ""
