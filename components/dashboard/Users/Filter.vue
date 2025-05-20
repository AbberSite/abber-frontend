<template>
  <div class="flex flex-col gap-y-3">
    <div class="flex flex-col gap-y-2">
      <DashboardDateFilters
        title="تاريخ الإنضمام"
        :dateGteKey="'date__join_gte'"
        :dateLteKey="'date__join_lte'"
        v-model:modelValue="joinRange"
      />
      <DashboardDateFilters
        title="تاريخ الشراء"
        :dateGteKey="'date__purchase_gte'"
        :dateLteKey="'date__purchase_lte'"
        v-model:modelValue="purchaseRange"
      />
    </div>
    <Selector label="الصلاحية" :options="[{value: 'عميل'}, {value: 'إدارة'}, {value: 'معبر'}]" v-model:model-value="filters.user_type"  />

    <SearchSelector
      :items="countries"
      label="الدولة:"
      placeholder="إختر الدولة"
      display-key="name"
      value-key="name"
      v-model="country_selected"
    />
    <TextInput label="عدد الطلبات:" placeholder="مثال: 3 او 3+" v-model:model-value="filters.orders" />

    <Selector label="البريد الإلكتروني مؤكد" :options="[{value: true, text: 'نعم'}, {value: false, text: 'لا'}]" v-model:model-value="filters.email_verified" />
    <Selector label="الجوال مؤكد" :options="[{value: true, text: 'نعم'}, {value: false, text: 'لا'}]" v-model:model-value="filters.phone_verified"/>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';

const { filters, countries } = storeToRefs(useDashboardUsersStore());

const joinRange = computed({
  get: () => [
    filters.value.date__join_gte ?? null,
    filters.value.date__join_lte ?? null
  ],
  set: (value) => {
    if (!value || value.length === 0) {
      filters.value.date__join_gte = null;
      filters.value.date__join_lte = null;
    } else {
      const [start, end] = value;
      filters.value.date__join_gte = start;
      filters.value.date__join_lte = end;
    }
  }
});

const purchaseRange = computed({
  get: () => [
    filters.value.date__purchase_gte ?? null,
    filters.value.date__purchase_lte ?? null
  ],
  set: (value) => {
    if (!value || value.length === 0) {
      filters.value.date__purchase_gte = null;
      filters.value.date__purchase_lte = null;
    } else {
      const [start, end] = value;
      filters.value.date__purchase_gte = start;
      filters.value.date__purchase_lte = end;
    }
  }
});

// country_selected variable synced with filters.country
let country_selected = ref(null);

onMounted(()=> {
  watch(
  () => filters.value.country,
  (val) => {
    if (!val) {
      country_selected.value = null;
    } else {
      // Find the country object in countries list by name
      country_selected.value = countries.value.find(c => c.name === val) || { name: val };
    }
  },
  { immediate: true }
);

watch(
  country_selected,
  (val) => {
    filters.value.country = val ? val.name : '';
  }
);
});
</script>
