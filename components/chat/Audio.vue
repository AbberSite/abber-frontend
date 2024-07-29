<template>
  <div class="flex gap-4 items-center">
    <audio
      controls
      controlsList="nodownload noplaybackrate"
      preload="none"
      class="max-w-[100%] min-w-[10rem]"
    >
      <source :src="file.file" />
    </audio>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  file: File;
}>();
</script>
