from rest_framework import serializers

from ratings.templatetags import ratingtags

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    preview_image = serializers.SerializerMethodField()
    author_avatar = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    contributor_count = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Project

    def get_preview_image(self, obj):
        if obj.image:
            return obj.image

        return obj.default_image

    def get_author_avatar(self, obj):
        return obj.author.get_avatar()

    def get_author_name(self, obj):
        if obj.author.get_full_name():
            return obj.author.get_full_name()

        return obj.author.username

    def get_contributor_count(self, obj):
        return len(obj.projectparticipant_set.all())

    def get_rating(self, obj):
        return ratingtags.get_rating(obj).total_score
