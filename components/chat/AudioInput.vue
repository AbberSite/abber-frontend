<template>
  <p id="progress" v-if="recording">
    {{ timer.display.value }}
  </p>

  <!-- <div id="recordings" style="margin: 1rem 0"></div> -->
  <div class="flex gap-5 items-center">
    <div class="flex items-center gap-4">
      <span v-if="status === 'recording'" class="mt-3">
        {{ timer.display.value }}
      </span>
      <button ref="recordButton" class="text-gray-600 hover:text-gray-900" type="button" @click="toggleRecording">
        <TrashIcon v-if="status === 'recording'" class="w-6 h-6 text-red-500" />
        <MicrophoneIcon v-else class="w-6 h-6" />
      </button>
    </div>
    <button @click="finishRecording" v-if="status === 'recording'" class="rounded-md bg-gray-900 p-2 text-white"
      type="button">
      <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        viewBox="0 0 16 16">
        <path
          d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z">
        </path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon, MicrophoneIcon } from '@heroicons/vue/24/outline';
import type { Message } from 'postcss';

// const recordButton = ref(null);
const recording = ref(false);
// const progress = ref<HTMLElement | null>(null);
// const paused = ref(false);

const emit = defineEmits(['update:recording']);

const { send } = useChat();

const { messages } = storeToRefs(useOrdersStore())

const audioRecorder = useAudioRecorder()

const { data } = useAuth();

const { status, timer, audioBlobs } = audioRecorder.init({
  timer: {}
})


watch(status, (value) => {
  emit('update:recording', value);
  // When finish record send to server
  if (value === 'finished') { // Use strict equality comparison
    const fileName = getRandomFileName() + ".mp3";
    let blobUrl = URL.createObjectURL(audioBlobs[0]); // Use 'const' for variables that won't be reassigned

    messages.value.unshift({
      user: {
        username: data.value.username,
        image: data.value.image_url,
        first_name: data.value.first_name,
        last_name: data.value.last_name,
        is_online: data.value.is_online,
      },
      files: [{
        id: 0,
        file: blobUrl,
        name: fileName,
        mimetype: audioBlobs[0].type,
      }],
      date: new Date().toISOString(),
      sent: false,
    });

    const body = new FormData();
    body.append("file", audioBlobs[0], fileName);

    const response = useApi("/api/audio", {
      method: "post",
      body: body
    }).then((e) => {
      // After upload file send message with record file id
      send(JSON.stringify({ files: [e.id] }));
    });
  }
});

function getRandomFileName() {
  var timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  var random = ('' + Math.random()).substring(2, 8);
  var random_number = timestamp + random;
  return random_number;
}


async function toggleRecording() {
  if (status.value === "recording") {
    audioRecorder.cancel()
    return
  }

  await audioRecorder.play()

}

const finishRecording = async () => await audioRecorder.stop();
</script>

<style scoped></style>
