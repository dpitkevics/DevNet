from django.conf.urls import include, url

urlpatterns = [
    url(r'^api/v1/categories', include('categories.api.urls')),
    url(r'^api/v1/projects', include('projects.api.urls')),
]
