from rest_framework import serializers

from ratings.templatetags import ratingtags

from ..models import Project


class ProjectSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    author_avatar = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()
    required_skill_set = serializers.StringRelatedField(many=True)
    preview_image = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    contributor_count = serializers.SerializerMethodField()

    class Meta:
        model = Project

    def get_preview_image(self, obj):
        if obj.image:
            return obj.image

        return obj.default_image

    def get_author_avatar(self, obj):
        return obj.author.get_avatar()

    def get_rating(self, obj):
        return ratingtags.get_rating(obj).total_score

    def get_contributor_count(self, obj):
        return obj.projectparticipant_set.count()
