<template>
    <DashTab :tabs="[ {value: 'packages', name: 'الباقات'}, {value: 'features', name: 'الميزات'} ]" v-model:model-value="currentTab" />
    <template v-if="currentTab == 'packages'">
        <DashShopSettingsNestedPackages />
    </template>
    <template v-if="currentTab == 'features'">
        <DashShopSettingsNestedFeatures />
    </template>
</template>
<script setup lang="ts">
const currentTab = ref('packages');
</script>