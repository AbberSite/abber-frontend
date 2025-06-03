<template>
  <div class="flex flex-col gap-y-3">
    <div class="flex flex-col gap-y-2">
      <DashboardDateFilters
        title="تاريخ الإنضمام"
        :dateGteKey="'date_joined__gte'"
        :dateLteKey="'date_joined__lte'"
        v-model:modelValue="joinRange"
      />
      <DashboardDateFilters
        title="تاريخ الشراء"
        :dateGteKey="'order_date_after'"
        :dateLteKey="'order_date_before'"
        v-model:modelValue="purchaseRange"
      />
    </div>
    <Selector label="الصلاحية" :options="[{value: 'عميل'}, {value: 'إدارة'}, {value: 'معبر'}]" v-model:model-value="filters.user_type__name"  />

    <SearchSelector
      :items="countries"
      label="الدولة:"
      placeholder="إختر الدولة"
      display-key="name"
      value-key="code"
      v-model="country_selected"
    />
    <TextInput
      label="عدد الطلبات:"
      placeholder="مثال: 3 او 3+"
      v-model:model-value="ordersCountInput"
    />

    <Selector label="البريد الإلكتروني مؤكد" :options="[{value: true, text: 'نعم'}, {value: false, text: 'لا'}]" v-model:model-value="filters.verified_email" />
    <Selector label="الجوال مؤكد" :options="[{value: true, text: 'نعم'}, {value: false, text: 'لا'}]" v-model:model-value="filters.verified_phone"/>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
import { useRoute, useRouter } from 'vue-router';

const { filters, countries } = storeToRefs(useDashboardUsersStore());

const router = useRouter();
const route = useRoute();

const joinRange = computed({
  get: () => [
    filters.value.date_joined__gte ?? null,
    filters.value.date_joined__lte ?? null
  ],
  set: (value) => {
    if (!value || value.length === 0) {
      filters.value.date_joined__gte = null;
      filters.value.date_joined__lte = null;
    } else {
      const [start, end] = value;
      filters.value.date_joined__gte = start;
      filters.value.date_joined__lte = end;
    }
  }
});

const purchaseRange = computed({
  get: () => [
    filters.value.order_date_after ?? null,
    filters.value.order_date_before ?? null
  ],
  set: (value) => {
    if (!value || value.length === 0) {
      filters.value.order_date_after = null;
      filters.value.order_date_before = null;
    } else {
      const [start, end] = value;
      filters.value.order_date_after = start;
      filters.value.order_date_before = end;
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
        // Find the country object in countries list by code
        country_selected.value = countries.value.find(c => c.code === val) || { code: val, name: val };
      }
    },
    { immediate: true }
  );

  watch(
    country_selected,
    (val) => {
      filters.value.country = val ? val.code : '';
    }
  );
});

// For orders_count input: allow plain number or number+
const ordersCountInput = computed({
  get() {
    // Show whatever is in filters.value.orders_count for editing
    return filters.value.orders_count ?? '';
  },
  set(val: string) {
    // Allow only digits or digits followed by a single '+'
    const match = val.match(/^(\d+)(\+?)$/);
    filters.value.orders_count = match ? match[0] : '';
  }
});

// Watch filters and update URL query parameters
watch(
  filters,
  (val) => {
    const activeFilters = Object.fromEntries(
      Object.entries(val).filter(([k, v]) => v !== null && v !== undefined && v !== '')
    );
    // Always update the query after the path (and trailing slash if present)
    // Use router.replace with a string path to ensure correct query placement
    const path = route.path; // includes trailing slash if present
    router.replace({ path, query: activeFilters });
  },
  { deep: true }
);
</script>
