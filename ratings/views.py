from django.http.response import HttpResponse
from django.contrib.contenttypes.models import ContentType

from notifications.signals import notify
from ipware.ip import get_ip

from .models import Rating


def add_rating(request):
    if request.method == 'POST':
        rate = float(request.POST.get('rate'))
        app_label = request.POST.get('app_label')
        model = request.POST.get('model')
        slug = request.POST.get('slug')

        if rate and app_label and model and slug:
            content_type = ContentType.objects.get(app_label=app_label, model=model)

            instance = content_type.get_object_for_this_type(slug=slug)

            if instance:
                rating = Rating.get_or_create(instance)
                rating.add_vote(rate, get_ip(request), request.user)

                notify.send(
                    request.user,
                    recipient=instance.author,
                    verb='Rating added',
                    description='A new rating has been added for %s with value: %s' % (str(instance), rate)
                )

    return HttpResponse()
