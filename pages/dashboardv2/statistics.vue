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
      <div class="w-full h-full flex justify-center items-center">
        <span class="text-center font-semibold mt-3 text-gray-700" >لا توجد حاليا</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
let currentTab = ref("tab0");

</script>
