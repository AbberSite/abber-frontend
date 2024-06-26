<template>
    <div class="space-y-3 pt-4">
        <div class="gap-4">
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="paid" :value="true" checked />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">الكل</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">سحب</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إرجاع</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">رسوم الخدمة</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">دفع الفاتورة</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">شحن الرصيد</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">باقة المعبر</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">تسجيل/تجديد النطاق</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إضافة بطاقة</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">عملية على الرصيد</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إلغاء الطلب</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">Cart checkout</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">Orders Package</label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDashTransactionsStore } from '~/stores/dashboard/dashTransactions';

const { filters } = storeToRefs(useDashTransactionsStore());
</script>

<style scoped></style>
