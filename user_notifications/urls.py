from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^send/$', views.send_notification, name='user_notifications_send_notification'),
    url(r'^mark_as_read/$', views.mark_as_read, name='user_notifications_mark_as_read'),
    url(r'^get_notifications/$', views.get_notifications, name='user_notifications_get_notifications'),
]
