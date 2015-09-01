from django import forms

from .models import Profile


class TestForm(forms.Form):
    boolean = forms.BooleanField()
    char = forms.CharField()
    choice = forms.ChoiceField(choices=(
        ('test1', 'Test 1'),
        ('test2', 'Test 2'),
    ))
    date = forms.DateField()
    url = forms.URLField()


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['avatar', 'skill_set']
