<template>
  <DashboardTitle department="الإحصائيات" title="كل الإحصائيات" />
  <Tabs     :tabs="[
      { name: 'الإحصائيات', value: 'tab0' },
      { name: 'إحصائيات المعبر', value: 'tab1' },
    ]"
    v-model:model-value="currentTab"
  />
  <div class="pt-3">
    <template v-if="currentTab == 'tab0'">
      <DashboardAnalytics/>
    </template>
    <template v-else >
      <DashboardAnalyticsExpressor/>
    </template>
  </div>
</template>

<script setup lang="ts">
import DashboardAnalytics from '~/components/dashboard/Analytics/Index.vue';
let currentTab = ref("tab0");

</script>
