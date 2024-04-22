<template>
    <div>
        <img class="aspect-[3/2] bg-gray-50 rounded-xl mb-2 lazyloaded" :src="file.file">
    </div>
</template>
<script setup lang="ts">
import type {File} from '~/types/index'
defineProps<{
    file: File
}>()
</script>