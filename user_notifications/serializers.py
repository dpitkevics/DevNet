from rest_framework import serializers

from notifications.models import Notification, NotificationQuerySet


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
