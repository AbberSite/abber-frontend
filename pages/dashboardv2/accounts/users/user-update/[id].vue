<template>
    <DashboardTitle department="العملاء" :title="`العميل ${userData.first_name}`" :loading="loading">
        <p class="text-xs font-medium text-gray-500"> #{{ id }} </p>
    </DashboardTitle>
    <Tabs :model-value="currentTab" :tabs="items" @update:modelValue="(value) => currentTab = value"/>
    <div class="w-full pt-2">
        <DashboardUsersDetails v-if="currentTab == 'tab0'"/>
        <DashboardUsersLogs v-if="currentTab == 'tab1'"/>
        <DashboardUsersServicesVisited v-if="currentTab == 'tab2'"/>
        <DashboardUsersServicesPaid v-if="currentTab == 'tab3'"/>
        <DashboardUsersTickets v-if="currentTab == 'tab6'"/>
        <DashboardUsersActionsLog v-if="currentTab == 'tab7'"/>
    </div>
</template>

<script setup>
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';

const id = useRoute().params.id;
const { userData, loading } = storeToRefs(useDashboardUsersStore());
const { fetchUserData } = useDashboardUsersStore();
onBeforeMount(async()=> {
    fetchUserData(id);
})
let currentTab = ref('tab0');

const items = ref([
  { name: 'بيانات العميل', value: 'tab0' },
  { name: 'السجل', value: 'tab1' },
  { name: 'خدمات تمت زيارتها', value: 'tab2' },
  { name: 'خدمات تم شراؤها', value: 'tab3' },
  { name: 'ملاحظات', value: 'tab4' },
  { name: 'المحادثات', value: 'tab5' },
  { name: 'تذكرة المساعدات', value: 'tab6' },
  { name: 'سجل الاجراءات', value: 'tab7' },
]);



</script>