<template>
    <div class="flex flex-col space-x-3" >
        <DashboardTablesTable :head-items="head" :body-items="userServicesPaid" :loading="loading" :actions="{view:{path:'/dashboardv2/accounts/users/user-update/'}}" />
        <Pagination
    class="pt-4"
    :results="(pagination as PaginationResponse<any>)"
    @change="getUserServicesVisited"
    per-page="20"
  />
    </div>
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const {loading, userServicesPaid, pagination} = storeToRefs(useDashboardUsersStore());
const {getUserServicesVisited} = useDashboardUsersStore();
const head = {
    first_name: 'المعبر'
};
onMounted(()=> {
    getUserServicesVisited();
})
</script>