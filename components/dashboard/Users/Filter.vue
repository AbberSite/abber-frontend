<template>
  <div class="flex flex-col gap-y-3">
    <div class="flex flex-col gap-y-2">
      <DashboardDateFilters title="تاريخ الإنضمام" />
      <DashboardDateFilters title="تاريخ الشراء" />
    </div>
    <div>
      <h3 class="text-sm font-semibold">الصلاحية:</h3>
      <select class="form-control form-select h-[50px] appearance-none" name="select" v-model="filters.user_type">
        <option :value="''">إختر</option>
        <option :value="'مستخدم عادي'">مستخدم عادي</option>
        <option :value="'إدارة'">إدارة</option>
        <option :value="'معبر'">معبر</option>
      </select>
    </div>

    <SearchSelector :items="countries" label="الدولة:" placeholder="إختر الدولة" display-key="name.common"
      value-key="name" v-model="country_selected" />
    <TextInput label="عدد الطلبات:" placeholder="مثال: 3 او 3+" />


    <div>
      <h3 class="text-sm font-semibold">البريد الإلكتروني مؤكد:</h3>
      <select class="form-control form-select h-[50px] appearance-none" name="select" v-model="filters.email_verified">
        <option :value="''">إختر</option>
        <option :value="true">نعم</option>
        <option :value="false">لا</option>
      </select>
    </div>

    <div>
      <h3 class="text-sm font-semibold">الجوال مؤكد:</h3>
      <select class="form-control form-select h-[50px] appearance-none" name="select" v-model="filters.phone_verified">
        <option :value="''">إختر</option>
        <option :value="true">نعم</option>
        <option :value="false">لا</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashUsersStore } from '~/stores/dashboard/dashUsers';
const { filters, countries } = storeToRefs(useDashUsersStore());

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
