<template>
  <DashboardTitle department="الإحصائيات" title="كل الإحصائيات" />
  <DashboardTab
    :tabs="[
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
      
    </template>
  </div>
</template>

<script setup lang="ts">
let currentTab = ref("tab0");

</script>
