from django import forms

from taggit.forms import TagWidget

from .models import Project


class ProjectForm(forms.ModelForm):

    class Meta:
        model = Project
        fields = ('title', 'description', 'image', 'required_skill_set')

    def __init__(self, *args, **kwargs):
        super(ProjectForm, self).__init__(*args, **kwargs)

        self.fields['required_skill_set'].widget = TagWidget(attrs={'data-role': 'tagsinput'})
