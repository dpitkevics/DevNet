from django.conf import settings


SOCKET_URL = getattr(settings, 'SITE_URL', 'http://jooglin.com:8002')
