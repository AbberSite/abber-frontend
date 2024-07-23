<template>
  <div class="flex gap-4 items-center ">

    <!-- <audio :src="file.file" controls class="max-w-[10rem] sm:w-full sm:max-w-none" />  -->
    <audio controls controlsList="nodownload noplaybackrate" preload="none" class="max-w-[100%] min-w-[10rem]">
        <source :src="file.file">
      </audio>

    <!-- <div class="min-w-[10rem]" :id="`audio-${file.id}`" ref="audio"></div>


    <div class="rounded-md bg-gray-900 flex items-center justify-center h-9 w-9 text-white cursor-pointer"
      @click="playPause">
      <PlayIcon v-if="paused && !finished" class="w-4" />
      <PauseIcon v-else-if="!paused && !finished" class="w-4" />
      <ArrowPathIcon v-if="finished" class="w-5" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
// import WaveSurfer from 'wavesurfer.js';
import type { File } from '~/types';

import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/vue/24/solid';
import WaveSurfer from 'wavesurfer.js';

const props = defineProps<{
  file: File;
}>();

const audio = ref(null);

const paused = ref(true);
const finished = ref(false);

let wavesurfer: WaveSurfer;

function getPathFromUrl(url: string): string | null {
  const pathRegex = /^(?:\/\/|[^/]+)*\/([^?#]+)/;
  const match = url.match(pathRegex);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}

onMounted(() => {
  wavesurfer = WaveSurfer.create({
    container: audio.value ?? `audio-${props.file.id}`,
    waveColor: '#111827',
    progressColor: '#111827',
    url:props.file.file,
    height: 50,
    width: 200,
    barWidth: 5,
    barRadius: 20,
    barGap: 5,
    cursorWidth: 3
  });

  wavesurfer.on('interaction', () => {
    wavesurfer.play();
  });

  wavesurfer.on('finish', () => {
    finished.value = true;
    paused.value = false;
  });

  wavesurfer.on('play', () => {
    finished.value = false;
    paused.value = false;
  });
});

function playPause() {
  wavesurfer.playPause();

  paused.value = !paused.value;
}
</script>
