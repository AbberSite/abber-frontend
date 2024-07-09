<template>
    <a class="text-gray-900 hover:text-green-700" :href="url" external target="_blank" ><DocumentArrowDownIcon class="w-5 h-5" /></a>
  </template>

<script lang="ts" setup>
import { EyeIcon, XCircleIcon, CheckCircleIcon,  DocumentArrowDownIcon, TrashIcon, PencilSquareIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";
defineProps<{ url: string;previewFiles:boolean  }>();

</script>

<style>

</style>