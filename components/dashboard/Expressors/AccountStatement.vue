<template>
    <div class="flex flex-col space-x-3" >
        <DashboardTablesTable :head-items="head" :body-items="accountStatements" :loading="statementsLoading" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import { useDashboardTransactionsStore } from '~/stores/dashboard/dashboardTransactions';
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';

const { userData } = storeToRefs(useDashboardUsersStore());
const { accountStatements, statementsLoading } = storeToRefs(useDashboardTransactionsStore());
const { getAccountStatements } = useDashboardTransactionsStore();
const head = {
    id: 'رقم المعاملة',
    amount: 'المبلغ',
    method: 'وسيلة الدفع',
    type: 'نوع المعاملة',
    success: 'عملية ناجحة',
    date: 'تاريخ المعاملة'
};
onMounted(() => {
    if(!accountStatements.value || accountStatements.value.length === 0) {
        watchEffect(() => {
        const username = userData.value?.username;
            if (username) {
                getAccountStatements(username);
            }
        });
    }
});
</script>