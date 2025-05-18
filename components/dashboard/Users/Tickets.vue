<template>
    <div class="flex flex-col space-x-3">
        <DashboardTablesTable :head-items="head" :body-items="userTickets" :loading="loading" :actions="{view:{path:'/support/'}}"/>
    </div>
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const { userTickets, loading } = storeToRefs(useDashboardUsersStore());
const { getUserTickets } = useDashboardUsersStore();
const head = {
    'user.first_name': 'المستخدم',
    ticket_status:'حالة التذكرة',
    title: 'المشكلة',
    date: 'تاريخ فتح التذكرة',
    end_date: 'تاريخ اغلاق التذكرة '
};
onMounted(() => {
    getUserTickets();
});
</script>