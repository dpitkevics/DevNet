from django.db import models


class Skill(models.Model):
    title = models.CharField(max_length=128)
    
    def __str__(self):
        return self.title
