<template>
    <div class="flex flex-col space-x-3" >
        <DashboardTablesTable :head-items="head" :body-items="userServicesPaid" :loading="loading" :actions="{details:{path: '/dashboardv2/orders/'}, view:{path:'/orders/'}}" />
    </div>
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const {loading, userServicesPaid} = storeToRefs(useDashboardUsersStore());
const {getThePaidServices} = useDashboardUsersStore();
const head = {
    'seller.first_name': 'المعبر'
};
const id = useRoute().params.id;
onMounted(()=> {
    getThePaidServices(id);
    // getUserServicesVisited();
})
</script>