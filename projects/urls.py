from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^all/$', views.list_all, name='projects_list_all'),
    url(r'^category/(?P<category>.+)/$', views.list_category, name='projects_list_category'),
    url(r'^get_all/$', views.get_all, name='projects_get_all'),
    url(r'^get_category/(?P<category>.+)/$', views.get_by_category, name='projects_get_by_category'),
    url(r'^create/$', views.create, name='projects_create'),
]
