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
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const { filters, countries } = storeToRefs(useDashboardUsersStore());

const country_selected = ref(null);

</script>
