from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^all/$', views.list_all, name='projects_list_all'),
    url(r'^get_all/$', views.get_all, name='projects_get_all'),
    url(r'^create/$', views.create, name='projects_create'),
]
