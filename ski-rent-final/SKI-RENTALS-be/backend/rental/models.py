from django.db import models, transaction
from django.conf import settings
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
import uuid, random, string
from datetime import timedelta
from django.contrib.auth.models import User



User = settings.AUTH_USER_MODEL

def gen_contract_number():
    return uuid.uuid4().hex[:10].upper()

class Product(models.Model):
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quantity = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Draft(models.Model):
    title = models.CharField(max_length=255, blank=True)
    customer_name = models.CharField(max_length=255, blank=True)
    customer_phone = PhoneNumberField(blank=True, null=True)
    items = models.JSONField(default=list, blank=True)  # [{product_id, qty, days}]
    notes = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='drafts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Draft #{self.id} {self.title or ''}"

class Contract(models.Model):
    number = models.CharField(max_length=50, unique=True)
    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True) 
    signed = models.BooleanField(default=False)

    def __str__(self):
        return f"Contract {self.number} — {self.customer_name}"


class ContractItem(models.Model):
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='items')
    item_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    price_per_day = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.item_name} (x{self.quantity})"


class OTP(models.Model):
    phone = models.CharField(max_length=20)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expire_at = models.DateTimeField()
    used = models.BooleanField(default=False)

    def is_valid(self):
        """Проверяет, не истёк ли срок действия OTP"""
        return timezone.now() < self.expire_at

    def __str__(self):
        return f"{self.phone} - {self.code}"
    
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name