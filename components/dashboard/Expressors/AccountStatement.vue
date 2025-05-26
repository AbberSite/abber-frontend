<template>
    <!-- <SkeletonsTable v-if="loading"/> -->
    <div class="flex flex-col space-x-3" >
        <DashboardTablesTable :head-items="head" :body-items="[]" :loading="loading" />
        <!-- <Pagination
    class="pt-4"
    :results="(pagination as PaginationResponse<any>)"
    @change="getUserLogs"
    per-page="20"
  /> -->
    </div>
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const { userLogsList, loading, pagination } = storeToRefs(useDashboardUsersStore());
const head = {
    remote_addr: 'رقم المعاملة',
    url_path: 'وسيلة الدفع',
    user_platform: 'نوع المعاملة',
    ua_string: 'دائن',
    created_at: 'مدين',
    "geolocation_for_ip.country_name": 'الرصيد',
    version: 'تاريخ المعاملة'
};
</script>