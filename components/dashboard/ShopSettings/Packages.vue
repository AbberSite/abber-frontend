<template>
    <Tabs :tabs="[ {value: 'packages', name: 'الباقات'}, {value: 'features', name: 'الميزات'} ]" v-model:model-value="currentTab" />
    <template v-if="currentTab == 'packages'">
        <DashboardShopSettingsNestedPackages />
    </template>
    <template v-if="currentTab == 'features'">
        <DashboardShopSettingsNestedFeatures />
    </template>
</template>
<script setup lang="ts">
const currentTab = ref('packages');
</script>