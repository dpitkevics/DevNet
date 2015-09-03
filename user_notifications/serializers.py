from rest_framework import serializers

from notifications.models import Notification, NotificationQuerySet


class NotificationSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Notification

    def get_username(self, obj):
        return obj.actor.username

    def get_avatar(self, obj):
        return obj.actor.get_avatar()
