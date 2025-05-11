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
onMounted(()=> {
    getUserActivity();
})
</script>