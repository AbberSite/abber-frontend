
<template>
    <div>
      <DashboardDateFilters />
    </div>
      <div class="pt-3">
        <h3 class="text-sm font-semibold">حالة الطلب</h3>
        <div class="flex items-center">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
            v-model="filters.status" id="all" :value="null" />
          <label class="mt-1.5 ps-3 text-sm font-medium" for="all">الكل</label>
        </div>
        <div class="flex items-center">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
            v-model="filters.status" id="paid" :value="'1'" />
          <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">قيد المراجعة</label>
        </div>
        <div class="flex items-center">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
            v-model="filters.status" id="done" :value="'2'" />
          <label class="mt-1.5 ps-3 text-sm font-medium" for="done">تم</label>
        </div>
        <div class="flex items-center">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
            v-model="filters.status" id="rejected" :value="'3'" />
          <label class="mt-1.5 ps-3 text-sm font-medium" for="rejected">مرفوض</label>
        </div>
      </div>
</template>

<script setup lang="ts">
import { useDashboardWithdrawalRequestsStore } from '~/stores/dashboard/DashboardWithdrawalRequests';
const { filters } = storeToRefs(useDashboardWithdrawalRequestsStore());
</script>

<style scoped>
/* Add your styles here if necessary */
</style>
