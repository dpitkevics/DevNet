from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.ProjectList.as_view(), name='api_projects_list'),
    url(r'^(?P<category>.+)/$', views.ProjectList.as_view(), name='api_projects_list'),
    url(r'^(?P<pk>[0-9]+)/$', views.ProjectDetail.as_view(), name='api_projects_detail'),
]
