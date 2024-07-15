<template>
    <div class="space-y-3">
        <DashboardDateFilters />
    </div>
    <div class="flex flex-col gap-2 mt-3">
        <div>
            <div class="space-y-3">
                <h3 class="text-sm font-semibold">حالة الدفع</h3>
                <select class="form-control form-select h-[50px] appearance-none" name="select"
                    v-model="filters.success">
                    <option :value="null">الكل</option>
                    <option :value="true">تم الدفع</option>
                    <option :value="false">فشل الدفع</option>
                </select>
            </div>
        </div>
        <div>
            <h3 class="text-sm font-semibold">نوع العملية</h3>
            <div class="space-y-3 pt-4">
                <select class="form-control form-select h-[50px] appearance-none" name="type" v-model="filters.type">
                    <option :value="''">الكل</option>
                    <option :value="'1'">سحب</option>
                    <option :value="'2'">إرجاع</option>
                    <option :value="'3'">رسوم الخدمة</option>
                    <option :value="'4'">دفع الفاتورة</option>
                    <option :value="'5'">شحن الرصيد</option>
                    <option :value="'6'">باقة المعبر</option>
                    <option :value="'7'">تسجيل/تجديد النطاق</option>
                    <option :value="'8'">إضافة بطاقة</option>
                    <option :value="'9'">عملية على الرصيد</option>
                    <option :value="'10'">إلغاء الطلب</option>
                    <option :value="'11'">Cart checkout</option>
                    <option :value="'12'">Orders Package</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useDashTransactionsStore } from '~/stores/dashboard/dashTransactions';

const { filters } = storeToRefs(useDashTransactionsStore());
</script>