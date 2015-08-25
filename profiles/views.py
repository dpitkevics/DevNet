from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.http.response import HttpResponseRedirect

from .forms import ProfileForm


def update(request):
    try:
        profile = request.user.profile
    except ObjectDoesNotExist:
        profile = None

    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=profile)

        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()

            form.save_m2m()

            return HttpResponseRedirect(request.path_info)
    else:
        form = ProfileForm(instance=profile)

    context = {
        'form': form,
    }

    return render(request, 'profiles/update.html', context)
