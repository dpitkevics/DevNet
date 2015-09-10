from django.core.urlresolvers import reverse

from rest_framework import serializers

from ..models import Category


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = Category

    def get_url(self, obj):
        return reverse('projects_list_category', kwargs={'category': obj.slug})
