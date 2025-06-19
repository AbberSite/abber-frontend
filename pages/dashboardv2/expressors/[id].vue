<template>
  <!-- i should change this -->
    <DashboardTitle department="المعبرون" :title="`المعبر ${expressorData.expressor_url}`" :loading="loading">
        <!-- <p class="text-xs font-medium text-gray-500 cursor-pointer" @click="downloadVCF" > #{{ expressorData.id }} </p> -->
    </DashboardTitle>
    <Tabs :model-value="currentTab" :tabs="items" @update:modelValue="(value) => currentTab = value"/>
    <div class="w-full pt-2">
        <DashboardExpressorsBasicData v-if="currentTab == 'tab0'"/>
        <DashboardExpressorsAccountStatement v-if="currentTab == 'tab1'"/>
        <DashboardExpressorsServicesOrdered v-if="currentTab == 'tab2'"/>
        <DashboardExpressorsRates v-if="currentTab == 'tab3'"/>
    </div>
</template>

<script setup>
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';

const id = useRoute().params.id;
const { loading, expressorData } = storeToRefs(useDashboardUsersStore());
const { getExpressor } = useDashboardUsersStore();
onBeforeMount(async()=> {
    // fetchUserData(id);
    getExpressor(id);
})
let currentTab = ref('tab0');

const items = ref([
  { name: 'البيانات الأساسية', value: 'tab0' },
  { name: 'التقييمات', value: 'tab3' },
  { name: 'كشف الحساب', value: 'tab1' },
  { name: 'الطلبات', value: 'tab2' },
]);

async function downloadVCF(){
    try {
        // Fetch the VCF data
        const response = await useDirectApi(`/accounts/dashboard-users/${expressorData.value?.id}/vcard/`);

        // Get the VCF data as a blob
        const blob = new Blob([response], {type: 'text/vcard'});

        // Create a URL for the blob
        const downloadUrl = window.URL.createObjectURL(blob);

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${expressorData.value?.expressor_url}-${expressorData.value?.id}.vcf`; // You can adjust the file name as needed
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