from django.shortcuts import render
from django.http.response import JsonResponse

from .models import Project
from .forms import ProjectForm
from .serializers import ProjectSerializer


def get_all(request):
    project_set = []

    for project in Project.objects.order_by('-created').all()[:12]:
        project_serializer = ProjectSerializer(project)

        project_set.append(project_serializer.data)

    return JsonResponse(project_set, safe=False)


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

    context = {
        'form': form,
    }

    return render(request, 'projects/create.html', context)
