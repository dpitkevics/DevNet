import json
import redis

from notifications import notify
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q

from django.db.models.signals import post_save
from django.dispatch import receiver
from notifications.models import Notification

from .serializers import NotificationSerializer


@login_required
def get_notifications(request):
    query = request.POST.get('query', None)

    notification_serializer_set = []

    if query is not None:
        notifications = request.user.notifications.order_by('-timestamp').filter(Q(verb__contains=query) | Q(description__contains=query)).exclude(verb="")[:5]
    else:
        notifications = request.user.notifications.order_by('-timestamp').all().exclude(verb="")[:5]

    for notification in notifications:
        notification_serializer = NotificationSerializer(notification)

        notification_serializer_set.append(notification_serializer.data)

    return JsonResponse(notification_serializer_set, safe=False)


@login_required
def send_notification(request):
    recipient_username = request.POST.get('recipient_username', None)

    if recipient_username:
        recipients = User.objects.filter(username=recipient_username)
    else:
        recipients = User.objects.all()

    for recipient in recipients:
        notify.send(
            request.user,
            recipient=recipient,
            verb=request.POST.get('verb', ''),
            description=request.POST.get('description', '')
        )

    return HttpResponse(json.dumps({"success": True}), content_type="application/json")


@login_required
def mark_as_read(request):
    request.user.notifications.unread().mark_all_as_read()

    redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

    for session in request.user.session_set.all():
        redis_client.publish(
            'notifications.%s' % session.session_key,
            json.dumps({"mark_as_read": True, "unread_count": 0})
        )

    return HttpResponse(json.dumps({"success": True}), content_type="application/json")


@receiver(post_save, sender=Notification)
def on_notification_post_save(sender, **kwargs):
    redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

    notification = kwargs['instance']
    recipient = notification.recipient

    for session in recipient.session_set.all():
        redis_client.publish(
            'notifications.%s' % session.session_key,
            json.dumps(dict(
                count=recipient.notifications.unread().count()
            ))
        )
