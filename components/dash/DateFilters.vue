<template>
    <DashDatePickerInput class="my-0" :title="title" v-model:model-date="range_date" range/>
</template>
<script setup lang="ts">
let filters = ref(null);
import { useDashOrdersStore } from '~/stores/dashboard/dashOrders';
import { useDashTransactionsStore } from '~/stores/dashboard/dashTransactions';
import { useDashWithdrawalRequestsStore } from '~/stores/dashboard/dashWithdrawalRequests';
import { useDashOperationsStore } from '~/stores/dashboard/dashOperations';
import { useDashUsersStore } from '~/stores/dashboard/dashUsers'
defineProps({title: {type: String, default: 'حسب التاريخ'}});
const section = inject('dateFilters') as string | 'orders';

const sectionState = {
    transactions: useDashTransactionsStore,
    orders: useDashOrdersStore,
    withdrawalRequests: useDashWithdrawalRequestsStore,
    operations: useDashOperationsStore,
    users: useDashUsersStore
};

if (sectionState[section]) {
    filters.value = sectionState[section]().filters;
}
let range_date = ref([]);

onMounted(() => {
    if (filters.value.date__gte && filters.value.date__lte) {
        range_date.value[0] = filters.value.date__gte;
        range_date.value[1] = filters.value.date__lte;
    }
})
watch(range_date, (value) => {
    if (value) {
        filters.value.date__gte = value[0];
        filters.value.date__lte = value[1];
    } else {
        filters.value.date__gte = '';
        filters.value.date__lte = '';
    }
});
</script>