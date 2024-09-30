from rest_framework import serializers
from store.models import Dish

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

    def validate_price(self, value):
        if not (100 < value < 100000):
            raise serializers.ValidationError("Цена должна быть между 100 и 100000.")
        return value