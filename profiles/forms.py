from django import forms

from taggit.forms import TagWidget

from .models import Profile


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['avatar', 'skill_set']

    def __init__(self, *args, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)

        self.fields['skill_set'].widget = TagWidget(attrs={'data-role': 'tagsinput'})
