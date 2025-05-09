<template>
    <div class="flex flex-col space-x-3" >
        <DashboardTablesTable :head-items="head" :body-items="userActivityList" :loading="loading" />
        <Pagination
    class="pt-4"
    :results="(pagination as PaginationResponse<any>)"
    @change="getUserActivity"
    per-page="20"
  />
    </div>
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const {loading, userActivityList, pagination} = storeToRefs(useDashboardUsersStore());
const {getUserActivity} = useDashboardUsersStore();
const head = {
    user: 'المستخدم',
    action_time: 'تاريخ الإجراء',
    action_flag: 'نوع الاجراء',
    change_message: 'الاجراء',
};
const items = [
    { user: 'الشيخ', date: '2024-07-05 13:03', type: 'تعديل', content: '	الرصيد المعلق من 217.35 ل 228.85' },
    { user: 'احمد', date: '2024-07-05 13:03', type: 'جذف', content: '	الرصيد المعلق من 217.35 ل 228.85' },
    { user: 'هيثم', date: '2024-07-05 13:03', type: 'اضافة', content: '	الرصيد المعلق من 217.35 ل 228.85' },
    { user: 'صالح', date: '2024-07-05 13:03', type: 'تعديل', content: '	الرصيد المعلق من 217.35 ل 228.85' },
]

onMounted(()=> {
    getUserActivity();
})
</script>