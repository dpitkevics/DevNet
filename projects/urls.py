from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^all/$', views.list_all, name='projects_list_all'),
    url(r'^category/(?P<category>.+)/$', views.list_category, name='projects_list_category'),
    url(r'^view/(?P<slug>.+)/$', views.view_project, name='projects_view_project'),
    url(r'^create/$', views.create, name='projects_create'),
]
