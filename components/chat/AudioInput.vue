<template>
    <!-- <p id="progress" v-if="recording">
        {{ timer.display.value }}
    </p> -->

    <!-- <div id="recordings" style="margin: 1rem 0"></div> -->
<div class="flex gap-5 items-center">
    
        <div class="flex items-center gap-4">
            <span v-if="recording" class="mt-3">
                {{ timer.display.value }}
            </span>
            <button
                ref="recordButton"
                class="text-gray-600 hover:text-gray-900"
                type="button"
                @click="toggleRecording">
                <TrashIcon v-if="recording" class=" w-6 h-6 text-red-500" />
                <MicrophoneIcon v-else class=" w-6 h-6 "  />
            </button>
        </div>
        <button @click="finishRecording" v-if="recording" class="rounded-md bg-gray-900 p-2 text-white" type="button">
            <svg
                class="flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path
                    d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path>
            </svg>
        </button>
    
</div>
</template>

<script setup lang="ts">
import { TrashIcon, MicrophoneIcon } from '@heroicons/vue/24/outline';

// const recordButton = ref(null);
const recording = ref(false);
// const progress = ref<HTMLElement | null>(null);
// const paused = ref(false);

const emit = defineEmits(['update:recording']);
watch(recording, (value) => emit('update:recording', value));

const { send } = useChat();

const timer = useTimer();
timer.init({ hours: false });

// let wavesurfer: WaveSurfer | undefined, record: any;
// Create an instance of WaveSurfer

const audioContext = new AudioContext();

const testTone = (function () {
    var lfo, osc, oscMod, output;
    osc = audioContext.createOscillator();
    lfo = audioContext.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 2;
    oscMod = audioContext.createGain();
    osc.connect(oscMod);
    lfo.connect(oscMod.gain);
    output = audioContext.createGain();
    output.gain.value = 0.5;
    oscMod.connect(output);
    osc.start();
    lfo.start();
    return output;
})();

const testToneLevel = audioContext.createGain();

testToneLevel.gain.value = 0;

testTone.connect(testToneLevel);

const audioInLevel = audioContext.createGain();

audioInLevel.gain.value = 0;

const mixer = audioContext.createGain();

testToneLevel.connect(mixer);

let audioIn: any = void 0;

audioInLevel.connect(mixer);

mixer.connect(audioContext.destination);

type Recorder = {
    isRecording: () => boolean;
    startRecording: Function;
    cancelRecording: Function;
    finishRecording: Function;
    onComplete: (recorder: Recorder, blob: Blob) => void;
    onError: (recorder: Recorder, message: string) => void;
    recordingTime: () => number | null;
};
//@ts-ignore
const recorder: Recorder = new WebAudioRecorder(mixer, {
    encoding: 'mp3',
    workerDir: '/audio-recorder/'
});

const recordingTime = computed(() => {
    return recorder.recordingTime();
});

recorder.onError = function (recorder: Recorder, message: string) {
    console.log('an error happend : ' + message);
};

recorder.onComplete = async function (recorder: Recorder, blob: Blob) {
    const data = new FormData();

    data.append('file', blob, getRandomFileName() + '.mp3');
    const file: { id: string } = await useApi('/api-proxy/chat/files/', {
        method: 'POST',
        body: data
    });
    send(
        JSON.stringify({
            files: [file.id]
        })
    );
    console.log('result is : ' + blob);
};

console.log(Mp3LameEncoder);


function toggleRecording() {


    if (recorder.isRecording()) {
        recorder.cancelRecording();
        timer.stop();
        timer.reset();
        recording.value = false;

        return;
    }

    audioContext.resume();

    navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
            audioIn = audioContext.createMediaStreamSource(stream);
            audioIn.connect(audioInLevel);

            recorder.startRecording();
            timer.start();
            recording.value = true;
        })
        .catch((err) => {
            console.error(`you got an error: ${err}`);
        });

    // console.log(`wavesurfer : ${wavesurfer}`);
    // if (wavesurfer === undefined) {
    //     console.log('undefined');
    //     wavesurfer = WaveSurfer.create({
    //         container: progress.value ?? '#mic',
    //         waveColor: '#111827',
    //         progressColor: '#111827',
    //         height: 50,
    //         barWidth: 5,
    //         barRadius: 20,
    //         barGap: 5,
    //         cursorWidth: 3
    //     });
    // }
    // if (record.isRecording()) {
    //     record.destroy();
    //     recording.value = false;
    //     paused.value = false;
    //     wavesurfer.destroy();
    //     wavesurfer = undefined;
    //     timer.stop();
    //     return;
    // }
    // record.startRecording({}).then(() => {
    //     recording.value = true;
    //     timer.start();
    // });
}


function finishRecording(){
    if (recorder.isRecording()) {
        recorder.finishRecording();
        timer.stop();
        timer.reset();
        recording.value = false;

        return;
    }
}

function getRandomFileName() {
    var timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    var random = ('' + Math.random()).substring(2, 8);
    var random_number = timestamp + random;
    return random_number;
}
</script>

<style scoped></style>
