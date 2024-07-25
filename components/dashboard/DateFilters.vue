<template>
    <DashboardDatePickerInput class="my-0" :title="title" v-model:model-date="range_date" range/>
</template>
<script setup lang="ts">
let filters = ref(null);
import { useDashboardOrdersStore } from '~/stores/dashboard/DashboardOrders';
import { useDashboardTransactionsStore } from '~/stores/dashboard/DashboardTransactions';
import { useDashboardWithdrawalRequestsStore } from '~/stores/dashboard/DashboardWithdrawalRequests';
import { useDashboardOperationsStore } from '~/stores/dashboard/DashboardOperations';
import { useDashboardUsersStore } from '~/stores/dashboard/DashboardUsers'
defineProps({title: {type: String, default: 'حسب التاريخ'}});
const section = inject('dateFilters') as string | 'orders';

const sectionState = {
    transactions: useDashboardTransactionsStore,
    orders: useDashboardOrdersStore,
    withdrawalRequests: useDashboardWithdrawalRequestsStore,
    operations: useDashboardOperationsStore,
    users: useDashboardUsersStore
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