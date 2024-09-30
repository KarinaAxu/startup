from django import forms

from store.models import Dish


class DishForm(forms.ModelForm):
    class Meta:
        model = Dish
        fields = ('name', 'description', 'price', 'is_available', )
        # exclude = ['description']


class UpdateDishForm(forms.Form):
    price = forms.IntegerField()
