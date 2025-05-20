<template>
    <DashboardDateFilters v-model:modelValue="dateRange" />
    <div class="pt-3">
        <h3 class="text-sm font-medium">حالة الطلب</h3>
        <div class="flex items-center">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
            v-model="filters.status" id="all" :value="null" />
          <label class="mt-1.5 ps-3 text-sm" for="all">الكل</label>
        </div>
        <div class="flex items-center">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
            v-model="filters.status" id="paid" :value="'1'" />
          <label class="mt-1.5 ps-3 text-sm" for="paid">قيد المراجعة</label>
        </div>
        <div class="flex items-center">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
            v-model="filters.status" id="done" :value="'2'" />
          <label class="mt-1.5 ps-3 text-sm" for="done">تم</label>
        </div>
        <div class="flex items-center">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
            v-model="filters.status" id="rejected" :value="'3'" />
          <label class="mt-1.5 ps-3 text-sm" for="rejected">مرفوض</label>
        </div>
      </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardWithdrawalRequestsStore } from '~/stores/dashboard/dashboardWithdrawalRequests';
const { filters } = storeToRefs(useDashboardWithdrawalRequestsStore());

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

<style scoped>
/* Add your styles here if necessary */
</style>
