<template>
    <img class="aspect-[3/2] w-2/4 bg-gray-50 rounded-xl mb-2 lazyloaded" :src="file.file">
</template>
<script setup lang="ts">
import type {File} from '~/types/index'
defineProps<{
    file: File
}>()
</script>