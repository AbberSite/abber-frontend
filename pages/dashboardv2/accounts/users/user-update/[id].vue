<template>
    <DashTitle department="العملاء" :title="`العميل ${userData.first_name}`">
        <p class="text-xs font-medium text-gray-500"> #{{ id }} </p>
    </DashTitle>
    <DashTab :model-value="currentTab" :tabs="items" @update:modelValue="(value) => currentTab = value"/>
    <div class="w-full pt-2">
        <DashUsersDetails v-if="currentTab == 'tab0'"/>
        <DashUsersLogs v-if="currentTab == 'tab1'"/>
        <DashUsersServicesVisited v-if="currentTab == 'tab2'"/>
        <DashUsersServicesPaid v-if="currentTab == 'tab3'"/>
        <DashUsersTickets v-if="currentTab == 'tab6'"/>
        <DashUsersActionsLog v-if="currentTab == 'tab7'"/>
    </div>
</template>

<script setup>
const id = useRoute().params.id;
let currentTab = ref('tab0');
const userData = {
    first_name: 'الشيخ المختار', 
    id: id, 

};
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
onBeforeMount(async()=> {
    // fetch user's data
    
});
</script>