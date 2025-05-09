<template>
    <div class="flex flex-col space-x-3" >
        <DashboardTablesTable :head-items="head" :body-items="userServicesVisited" :loading="loading" />
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
const {loading, userServicesVisited, pagination} = storeToRefs(useDashboardUsersStore());
const {getUserServicesVisited} = useDashboardUsersStore();
const head = {
    seller: 'المعبر',
    date: 'التاريخ'
};
onMounted(()=> {
    getUserServicesVisited();
})
</script>