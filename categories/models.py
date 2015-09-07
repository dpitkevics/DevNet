from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.template.defaultfilters import slugify

from .managers import CategoryManager


class Category(models.Model):
    title = models.CharField(max_length=128)
    slug = models.SlugField(editable=False)

    objects = models.Manager()
    manager = CategoryManager()

    class Meta:
        verbose_name_plural = _('Categories')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk:
            self.slug = slugify(self.title)

        super(Category, self).save(*args, **kwargs)
