<template>
    <div class="space-y-3 pt-4">
        <div class="gap-4">
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="paid" :value="null" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">الكل</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'1'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">سحب</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'2'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إرجاع</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'3'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">رسوم الخدمة</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'4'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">دفع الفاتورة</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'5'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">شحن الرصيد</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'6'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">باقة المعبر</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'7'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">تسجيل/تجديد النطاق</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'8'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إضافة بطاقة</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'9'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">عملية على الرصيد</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'10'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إلغاء الطلب</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'11'" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">Cart checkout</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" v-model="filters.type"
                    id="text" :value="'12'" />
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
