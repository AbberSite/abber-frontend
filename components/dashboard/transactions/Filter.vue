<template>
    <div class="space-y-3">
        <DashboardDateFilters />
    </div>
    <div class="flex flex-col gap-2 mt-3">
        <div v-if="!hiddenStatus">
            <Selector label="حالة الدفع"
                :options="[{ value: true, text: 'تم الدفع' }, { value: false, text: 'فشل الدفع' }]"
                v-model:model-value="filters.success" />
        </div>
        <div>
            <Selector label="نوع العملية" :options="[
                    { value: '1', text: 'سحب' }, 
                    { value: '2', text: 'إرحاع' }, 
                    { value: '3', text: 'رسوم الخدمة' }, 
                    { value: '4', text: 'دفع الفاتورة' }, 
                    { value: '5', text: 'شحن الرصيد' },
                    { value: '6', text: 'باقة المعبر' },
                    { value: '7', text: 'تسجيل/تجديد النطاق' },
                    { value: '8', text: 'إضافة بطاقة' },
                    { value: '9', text: 'عملية على الرصيد' },
                    { value: '10', text: 'إلغاء الطلب' },
                    { value: '11', text: 'Cart checkout' },
                    { value: '12', text: 'Orders Package' },
                ]
                " v-model:model-value="filters.type" defaultOption="الكل" />
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps<{ hiddenStatus?: boolean }>();
import { useDashboardTransactionsStore } from '~/stores/dashboard/dashboardTransactions';



const { filters } = storeToRefs(useDashboardTransactionsStore());
</script>