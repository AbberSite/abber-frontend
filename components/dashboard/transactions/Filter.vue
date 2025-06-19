<template>
    <DashboardDateFilters v-model:modelValue="dateRange" />
    <div class="flex flex-col gap-2 mt-3">
        <div v-if="!hiddenStatus">
                <CustomSelect label="حالة الدفع"
                :options="[
                    { value: true, text: 'تم الدفع' },
                    { value: false, text: 'فشل الدفع' }
                ]"
                v-model:model-value="filters.success" defaultLabel="الكل" />
        </div>
        <div>
            <CustomSelect label="نوع العملية"
                :options="[
                    { value: '1', text: 'سحب' },
                    { value: '2', text: 'إرجاع' },
                    { value: '3', text: 'رسوم الخدمة' },
                    { value: '4', text: 'دفع الفاتورة' },
                    { value: '5', text: 'شحن الرصيد' },
                    { value: '6', text: 'باقة المعبر' },
                    { value: '7', text: 'تسجيل/تجديد النطاق' },
                    { value: '8', text: 'إضافة بطاقة' },
                    { value: '9', text: 'عملية على الرصيد' },
                    { value: '10', text: 'إلغاء الطلب' },
                    { value: '11', text: 'Cart checkout' },
                    { value: '12', text: 'باقةالطلبات' },
                ]
                " v-model:model-value="filters.type" defaultLabel="الكل" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardTransactionsStore } from '~/stores/dashboard/dashboardTransactions';

defineProps<{ hiddenStatus?: boolean }>();

const { filters } = storeToRefs(useDashboardTransactionsStore());

const dateRange = computed({
  get: () => [
    filters.value.date__gte ?? null,
    filters.value.date__lte ?? null
  ],
  set: (value) => {
    if (!value || value.length === 0) {
      filters.value.date__gte = null;
      filters.value.date__lte = null;
    } else {
      const [start, end] = value;
      filters.value.date__gte = start;
      filters.value.date__lte = end;
    }
  }
});
</script>