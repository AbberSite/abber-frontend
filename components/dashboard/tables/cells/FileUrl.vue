<template>
  <template v-if="previewFiles">
    <button class="text-gray-900 hover:text-green-700" @click="()=> $event('table-preview-files', {url:url})"><DocumentArrowDownIcon class="w-5 h-5"/> </button>
  </template>
  <template v-else>
    <a class="text-gray-900 hover:text-green-700" :href="url" external target="_blank" ><DocumentArrowDownIcon class="w-5 h-5" /></a>
  </template>
  </template>

<script lang="ts" setup>
import { EyeIcon, XCircleIcon, CheckCircleIcon,  DocumentArrowDownIcon, TrashIcon, PencilSquareIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";
defineProps<{ url: string  }>();
const {$event} = useNuxtApp();
const previewFiles = inject('previewFiles') as Boolean | false;
</script>

<style>

</style>