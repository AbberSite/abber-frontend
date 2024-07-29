<template>
  <div>
    <div v-for="file in files" :key="file.id">
      <ChatImage v-if="file.mimetype == null || file.mimetype.includes('image')" :file="file"/>
      <ChatAudio v-else-if="file.mimetype.includes('audio')" :file="file" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { File } from '~/types';

defineProps<{
  files: File[];
}>();

</script>
