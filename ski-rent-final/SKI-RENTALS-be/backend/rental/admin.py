from django.contrib import admin
from .models import Product, Draft, Contract, ContractItem, OTP

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id','name','sku','price_per_day','quantity')

@admin.register(Draft)
class DraftAdmin(admin.ModelAdmin):
    list_display = ('id','title','customer_name','created_by','updated_at')

class ContractItemInline(admin.TabularInline):
    model = ContractItem
    extra = 1


@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = ('number', 'customer_name', 'customer_phone', 'start_date', 'total_amount')
    search_fields = ('number', 'customer_name')
    inlines = [ContractItemInline]


@admin.register(ContractItem)
class ContractItemAdmin(admin.ModelAdmin):
    list_display = ('item_name', 'quantity', 'price_per_day', 'contract')


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ('phone', 'code', 'created_at', 'expire_at')