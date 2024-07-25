<template>
  <div class="flex flex-col gap-y-3">
    <div class="flex flex-col gap-y-2">
      <DashboardDateFilters title="تاريخ الإنضمام" />
      <DashboardDateFilters title="تاريخ الشراء" />
    </div>
    <Selector label="الصلاحية" :options="[{value: 'مستخدم عادي'}, {value: 'إدارة'}, {value: 'معبر'}]" v-model:model-value="filters.user_type"  />

    <SearchSelector :items="countries" label="الدولة:" placeholder="إختر الدولة" display-key="name.common"
      value-key="name" v-model="country_selected" />
    <TextInput label="عدد الطلبات:" placeholder="مثال: 3 او 3+" />


    <Selector label="البريد الإلكتروني مؤكد" :options="[{value: true, text: 'نعم'}, {value: false, text: 'لا'}]" v-model:model-value="filters.email_verified" />
    <Selector label="الجوال مؤكد" :options="[{value: true, text: 'نعم'}, {value: false, text: 'لا'}]" v-model:model-value="filters.phone_verified"/>
  </div>
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/DashboardUsers';
const { filters, countries } = storeToRefs(useDashboardUsersStore());

const country_selected = ref(null);

// const updateJoinDateRange = (dates) => {
//   filters.value.date__join_gte = dates[0];
//   filters.value.date__join_lte = dates[1];
// };

// const updatePurchaseDateRange = (dates) => {
//   filters.value.date__purchase_gte = dates[0];
//   filters.value.date__purchase_lte = dates[1];
// };

// provide('fetchDateFilter', () => {
//   if (filters.value.date__join_gte && filters.value.date__join_lte) {
//     range_date.value[0] = filters.value.date__join_gte;
//     range_date.value[1] = filters.value.date__join_lte;
//   }
// }, true)
</script>

<style scoped>
/* Add your styles here if necessary */
</style>
