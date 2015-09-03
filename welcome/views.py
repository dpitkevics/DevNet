from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


def index(request):
    context = {}

    return render(request, 'welcome/index.html', context)


@csrf_exempt
def node_api(request):
    pass
