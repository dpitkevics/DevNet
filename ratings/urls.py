from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^add/$', views.add_rating, name='ratings_add_rating'),
]
