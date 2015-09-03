bind = '127.0.0.1:8000'
backlog = 2048
workers = 1
timeout = 30
daemon = True
pidfile = '../gunicorn_pid'
user = 'www-data'
group = 'www-data'
