<template>
    <DashboardTitle department="العملاء" :title="`العميل ${userData.first_name}`" :loading="loading">
        <p class="text-xs font-medium text-gray-500 cursor-pointer" @click="downloadVCF" > #{{ userData?.id }} </p>
    </DashboardTitle>
    <Tabs :model-value="currentTab" :tabs="items" @update:modelValue="(value) => currentTab = value"/>
    <div class="w-full pt-2">
        <DashboardUsersDetails v-if="currentTab == 'tab0'"/>
        <DashboardExpressorsAccountStatement v-if="currentTab == 'tab1'"/>
        <DashboardUsersLogs v-if="currentTab == 'tab2'"/>
        <DashboardUsersServicesPaid v-if="currentTab == 'tab3'"/>
        <DashboardUsersTickets v-if="currentTab == 'tab4'"/>
        <DashboardUsersActionsLog v-if="currentTab == 'tab5'"/>
    </div>
</template>

<script setup>
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';

const id = useRoute().params.id;
const { userData, loading } = storeToRefs(useDashboardUsersStore());
const { fetchUserData, getUserIdByUsername } = useDashboardUsersStore();
onBeforeMount(async () => {
  let userId = id;

  // Check if the id is not numeric
  if (isNaN(Number(id))) {
    userId = await getUserIdByUsername(id);
  }

  // Fetch user data using the resolved id
  await fetchUserData(userId);
})
let currentTab = ref('tab0');

const items = ref([
  { name: 'بيانات العميل', value: 'tab0' },
  { name: 'كشف الحساب', value: 'tab1' },
  { name: 'السجل', value: 'tab2' },
  { name: 'خدمات تم شراؤها', value: 'tab3', dontShowIt: true },
  { name: 'تذكرة المساعدات', value: 'tab4' },
  { name: 'سجل الاجراءات', value: 'tab5' },
]);
watch(
  () => userData.value.user_type,
  (newVal) => {
    if (newVal !== undefined) {
      items.value[3].dontShowIt = newVal !== 'عميل';
    }
  },
  { immediate: true }
);
async function downloadVCF(){
    try {
        // Fetch the VCF data
        const response = await useDirectApi(`/accounts/dashboard-users/${id}/vcard/`);

        // Get the VCF data as a blob
        const blob = new Blob([response], {type: 'text/vcard'});

        // Create a URL for the blob
        const downloadUrl = window.URL.createObjectURL(blob);

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${userData.value.username}-${id}.vcf`; // You can adjust the file name as needed
        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(downloadUrl);
        link.remove();
      } catch (error) {
        console.error('Error downloading VCF file:', error);
      }
}

</script>