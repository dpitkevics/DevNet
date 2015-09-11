from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.CategoryList.as_view(), name='api_categories_list'),
    url(r'^(?P<pk>[0-9]+)/$', views.CategoryDetail.as_view(), name='api_categories_detail'),
    url(r'^slug/(?P<slug>.+)/$', views.CategoryDetailBySlug.as_view(), name='api_categories_detail_by_slug'),
]
