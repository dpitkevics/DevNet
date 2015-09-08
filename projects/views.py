from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.core.urlresolvers import reverse

from categories.models import Category

from .models import Project
from .forms import ProjectForm
from .serializers import ProjectSerializer


def get_all(request):
    project_set = []

    for project in Project.objects.order_by('-created').all()[:12]:
        project_serializer = ProjectSerializer(project)

        project_set.append(project_serializer.data)

    return JsonResponse(project_set, safe=False)


def get_by_category(request, category):
    project_set = []

    for project in Project.objects.order_by('-created').filter(category__slug=category)[:12]:
        project_serializer = ProjectSerializer(project)

        project_set.append(project_serializer.data)

    return JsonResponse(project_set, safe=False)


def list_all(request):
    projects = Project.objects.all().order_by('-created')[:10]

    context = {
        'projects': projects,
    }

    return render(request, 'projects/list_all.html', context)


def list_category(request, category):
    projects = Project.objects.filter(category__slug=category).order_by('-created')[:10]

    context = {
        'projects': projects,
        'category': Category.manager.get_by_slug(category)
    }

    return render(request, 'projects/list_category.html', context)


def view_project(request, slug):
    try:
        project = Project.manager.get_by_slug(slug)
    except ObjectDoesNotExist:
        return HttpResponseRedirect(reverse('projects_list_all'))

    context = {
        'project': project
    }

    return render(request, 'projects/view_project.html', context)


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
