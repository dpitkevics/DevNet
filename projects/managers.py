from django.db import models


class ProjectManager(models.Manager):
    def get_by_slug(self, slug):
        return self.get(slug=slug)
