<template>
  <div>
    <div v-for="file in files" :key="file.id">
      <!-- <div class="px-12 w-1/2" dir="ltr">{{ file }}</div> -->
      <ChatAudio v-if="file.mimetype.includes('audio')" :file="file" />
      <ChatImage v-if="file.mimetype.includes('image')" :file="file"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { File } from '~/types';

defineProps<{
  files: File[];
}>();

</script>
