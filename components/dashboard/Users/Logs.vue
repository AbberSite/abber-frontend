<template>
    <!-- <SkeletonsTable v-if="loading"/> -->
    <div class="flex flex-col space-x-3" >
        <DashboardTablesTable :head-items="head" :body-items="userLogsList" :loading="loading" />
        <Pagination
    class="pt-4"
    :results="(pagination as PaginationResponse<any>)"
    @change="getUserLogs"
    per-page="20"
  />
    </div>
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const { userLogsList, loading, pagination } = storeToRefs(useDashboardUsersStore());
const { getUserLogs } = useDashboardUsersStore();
const head = {
    remote_addr: 'IP',
    url_path: 'المسار',
    user_platform: 'المنصة',
    ua_string: 'الجهاز',
    created_at: 'التاريخ',
    "geolocation_for_ip.country_name": 'الموقع',
    version: 'النسخة'
};
onMounted(async ()=> {
    getUserLogs();
});
</script>