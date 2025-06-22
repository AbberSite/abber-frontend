<template>
    <div class="flex flex-col space-x-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <CustomSelect label="عملية ناجحة"
                :options="[
                    { value: true, label: 'نعم' },
                    { value: false, label: 'لا' },
                ]"
                v-model:model-value="filterSuccess" defaultLabel="الكل" />
            <CustomSelect label="النــوع"
                :options="[
                    { value: 'سحب' },
                    { value: 'إرجاع' },
                    { value: 'رسوم الخدمة' },
                    { value: 'دفع الفاتورة' },
                    { value: 'شحن الرصيد' },
                    { value: 'باقة المعبر' },
                    { value: 'تسجيل/تجديد النطاق' },
                    { value: 'إضافة بطاقة' },
                    { value: 'عملية على الرصيد' },
                    { value: 'إلغاء الطلب' },
                    { value: 'Cart checkout' },
                    { value: 'Orders package', label: 'باقة الطلبات' },
                ]"
                v-model:model-value="filterType" defaultLabel="الكل" />
        </div>
        <DashboardTablesTable :head-items="head" :body-items="filteredStatements" :loading="statementsLoading" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue';
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

const filterType = ref(""); // Filter state for type
const filterSuccess = ref(""); // Filter state for success

// Computed property to filter account statements
const filteredStatements = computed(() => {
    return accountStatements.value.filter(statement => {
        const matchesType = !filterType.value || statement.type.includes(filterType.value);
        const matchesSuccess = filterSuccess.value === "" || statement.success === filterSuccess.value;
        return matchesType && matchesSuccess;
    });
});

onMounted(() => {
     watchEffect(() => {
            const username = userData.value?.username;
            if (username) {
                getAccountStatements(username);
            }
        });
});
</script>