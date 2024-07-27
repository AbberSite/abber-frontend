<template>
  <th class="whitespace-nowrap pb-1 pe-4 pt-1 font-medium" scope="col">
    <button class="flex w-full items-center justify-between pb-2 pt-3">
      <slot>
        {{ content }}
      </slot>
    </button>
  </th>
</template>

<script lang="ts" setup>
defineProps<{ content: any }>();
</script>

<style></style>
