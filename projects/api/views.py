from rest_framework import generics

from ..models import Project
from .serializers import ProjectSerializer


class ProjectList(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        try:
            return Project.objects.filter(category__slug=self.kwargs['category'])
        except KeyError:
            return Project.objects.all()


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
