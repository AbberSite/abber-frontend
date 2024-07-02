<template>
  <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
    <slot>
      <h5 class="font-medium text-black dark:text-white" >
       <span v-if="name.includes('date')">{{ useArabicFormattedDate(content)}}</span>
       <span v-else-if="content?.first_name">
        {{ content.first_name }}
       </span>
        <span v-else>{{ content }}</span>
      </h5>
    </slot>
  </td>
</template>

<script lang="ts" setup>
defineProps<{ content: any ;name:string}>();
</script>

<style></style>
