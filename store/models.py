from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Model


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username


class Courier(models.Model):
    VEHICLE_CHOICES = (
        ("car", "Car"),
        ("bike", "Bike"),
        ("walk", "Walk"),
    )
    STATUS_CHOICES = (
        ("active", "Active"),
        ("inactive", "Inactive"),
        ("onDelivery", "OnDelivery"),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=50, choices=VEHICLE_CHOICES, default="walk")
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default="inactive")

    def __str__(self):
        return f"{self.user.username} - {self.vehicle_type}"


class Dish(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['created_at']
        verbose_name_plural = 'dishes'


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=300)
    phone = models.CharField(max_length=100)
    # todo правильно описать рабочее время
    open_from = models.PositiveSmallIntegerField()
    open_until = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('name', 'address', )

    def __str__(self):
        return f"{self.name} - {self.address}"


class Menu(models.Model):
    name = models.CharField(max_length=100)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    dishes = models.ManyToManyField(Dish)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.restaurant}"

    class Meta:
        unique_together = ('name', 'restaurant', )


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    courier = models.ForeignKey(Courier, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.customer} - {self.courier} - {self.restaurant}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order} - {self.dish} - {self.quantity}"


class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=100)
    status = models.BooleanField(default=False)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order} - {self.user} - {self.amount}"
