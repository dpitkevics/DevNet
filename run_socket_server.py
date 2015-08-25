#!/usr/bin/env python

from gevent import monkey
monkey.patch_all()

import os
from psycogreen.gevent import patch_psycopg

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "socketioapp.settings")
patch_psycopg()

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

if __name__ == '__main__':
    from gevent.wsgi import WSGIServer
    server = WSGIServer(('', 8000), application, resource="socket.io")
    server.serve_forever()
