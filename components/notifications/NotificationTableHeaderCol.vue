<template>
  <th class="whitespace-nowrap pb-1 pe-4 pt-1 font-semibold" scope="col" >
    <button
      class="flex w-full items-center justify-between space-x-3 rounded-md bg-gray-100 px-4 pb-2 pt-3 rtl:space-x-reverse"
      type="button" v-if="content == 'التاريخ'">
      <span>{{ content }}</span>
      <svg class="flex-shrink-0" :class="[true && 'scale-y-[-1]']" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="14" width="14">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
      </svg>
    </button>

    <button class="flex w-full items-center justify-between pb-2 pt-3" type="button" v-else>
      <span>{{ content }}</span>
    </button>
  </th>
</template>

<script lang="ts" setup>
const props = defineProps<{ content?: string; }>();
const {content} = toRefs(props);
</script>

<style></style>