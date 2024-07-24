<template>
  <thead class="border-b border-t">
    <tr class="bg-gray-2 text-right dark:bg-meta-4">
      <slot>
        <DashTablesCol v-for="(value, key, index) in headItems" :key="index" :content="value" :name="key"/>
      </slot>
    </tr>
  </thead>
</template>

<script lang="ts" setup>
defineProps<{ headItems: {} }>();
</script>

<style></style>
