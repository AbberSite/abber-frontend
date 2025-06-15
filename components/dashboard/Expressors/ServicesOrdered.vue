<template>
    <div class="flex flex-col space-x-3" >
        <DashboardTablesTable :head-items="head" :body-items="userServicesPaid" :loading="loading" :actions="{view:{path:'/orders/'}}" />
    </div>
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const {loading, userServicesPaid} = storeToRefs(useDashboardUsersStore());
const {getThePaidServices} = useDashboardUsersStore();
const head = {
    'buyer.first_name': 'المشتري'
};
const id = useRoute().params.id;
onMounted(()=> {
    getThePaidServices(null, 'seller');
    // getUserServicesVisited();
})
</script>