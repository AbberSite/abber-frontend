<template>
  <div>
    <div v-for="file in files" :key="file.id">
      <ChatAudio v-if="file.mimetype.includes('audio')" :file="file" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { File } from '~/types';

defineProps<{
  files: File[];
}>();

</script>
