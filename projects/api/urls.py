from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/$', views.ProjectDetail.as_view(), name='api_projects_detail'),
    url(r'^slug/(?P<slug>.+)/$', views.ProjectDetailBySlug.as_view(), name='api_projects_detail_by_slug'),
    url(r'^$', views.ProjectList.as_view(), name='api_projects_list'),
    url(r'^(?P<category>.+)/$', views.ProjectList.as_view(), name='api_projects_list'),
]
