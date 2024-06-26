<template>
    <div class="space-y-3">
        <h3 class="text-sm font-semibold">حالة الدفع</h3>
        <div class="space-y-3">
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    v-model="filters.success" id="all" :value="null" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">الكل</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    v-model="filters.success" id="paid" :value="true" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">تم الدفع</label>
            </div>
            <div class="flex items-center">
                <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                    v-model="filters.success" id="text" :value="false" />
                <label class="mt-1.5 ps-3 text-sm font-medium" for="text">فشل الدفع</label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDashTransactionsStore } from '~/stores/dashboard/dashTransactions';

const { filters } = storeToRefs(useDashTransactionsStore());
</script>

<style scoped></style>
