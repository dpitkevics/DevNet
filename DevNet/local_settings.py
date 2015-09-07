from django.conf import settings


SOCKET_URL = getattr(settings, 'SITE_URL', 'http://localhost:8002')
