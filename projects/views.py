from django.shortcuts import render
from categories.models import Category

from .forms import ProjectForm


def list_all(request):
    context = {}

    return render(request, 'projects/list_all.html', context)


def list_category(request, category):
    context = {
        'category': category,
    }

    return render(request, 'projects/list_category.html', context)


def view_project(request, slug):
    context = {
        'slug': slug,
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
