<template>
    <template v-if="loading"><SkeletonsSocialData/></template>
    <template v-else>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <MultiSelector label="عبر" :options="expressorsOptions" v-model="settings.services_settings.active_expressors.abber"/>
            <MultiSelector label="منام" :options="expressorsOptions" v-model="settings.services_settings.active_expressors.manam"/>
        </div>
         <PrimaryButton class="my-2" :loading="loading" @click="updateSettings(2, {services_settings: {...settings.services_settings}})">حفظ</PrimaryButton>
    </template>
</template>
<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const { settings, loading } = storeToRefs(useDashboardSettingsStore());
const { expressors } = storeToRefs(useDashboardUsersStore());
const { updateSettings } = useDashboardSettingsStore();
const { getExpressors } = useDashboardUsersStore();
let expressorsOptions = ref([]);
const updateExpressorsOptions = () => {
    expressorsOptions.value = expressors.value.map(e => ({ value: e.username, text: e.username }));
};
onMounted(async () => {
    if (expressors.value.length === 0) {
        await getExpressors();
    }
    watch(expressors, updateExpressorsOptions, { immediate: true, deep: true });
});
</script>