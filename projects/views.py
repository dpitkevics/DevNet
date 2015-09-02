from django.shortcuts import render

from ipware.ip import get_ip

from ratings.models import Rating

from .models import Project
from .forms import ProjectForm


def list_all(request):
    projects = Project.objects.all().order_by('-created')[:10]

    context = {
        'projects': projects,
    }

    return render(request, 'projects/list_all.html', context)


def create(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST)

        if form.is_valid():
            project = form.save(commit=False)
            project.author = request.user
            project.save()

            form.save_m2m()
    else:
        form = ProjectForm()
        print('form incorrect')

    context = {
        'form': form,
    }

    return render(request, 'projects/create.html', context)
