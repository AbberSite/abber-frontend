<template>
  <div class="absolute top-[calc(100%+15px)] hidden sm:flex flex-col gap-2 w-[280px] rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0 z-50" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" v-cloak>
    <div class="space-y-3">
      <h3 class="text-sm font-semibold">حسب التاريخ</h3>
      <DatePicker auto-apply range placeholder="اختر نطاق زمني" :max-date="new Date()"
       v-model="dateRange" model-type="yyyy-MM-dd" ref="datePicker" id="date" :SkeletonsTableapply="true"
        format="yyyy-MM-dd"  :enable-time-picker="false" />
    </div>
    <div class="flex justify-between mt-3">
      <div>
        <DashboardTransactionsFiltersTransactionSuccess />
      </div>
      <div>
        <h3 class="text-sm font-semibold">نوع العملية</h3>
        <DashboardTransactionsFiltersTransactionType />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashTransactionsStore } from "~/stores/dashboard/dashTransactions";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";

const { filters } = storeToRefs(useDashTransactionsStore());
const datePicker = ref<DatePickerInstance>(null);
const dateRange = ref(null);

watch(dateRange, async (value) => {
     filters.value.date__gte = value[0];
    filters.value.date__lte =value[1];
});
</script>

<style scoped></style>
