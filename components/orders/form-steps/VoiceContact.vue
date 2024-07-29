<template>
    <form method="POST" @submit.prevent="submit">
        <fieldset class="space-y-7">
            <div class="flex h-[75%] flex-col items-center justify-center rounded-md border p-6 text-center shadow-sm">
                <div class="pt-2" v-if="status === 'initialized'">
                    <button
                        class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                        type="button"
                        @click="record">
                        <!-- Heroicon name: outline/microphone -->

                        <MicrophoneIcon class="w-9 h-9" />
                    </button>
                    <p class="pt-6 text-sm font-medium xs:text-[15px]">إبدأ التسجيل</p>
                </div>

                <div class="w-full pt-2" v-if="status === 'recording' || status === 'paused'">
                    <div class="flex items-center justify-evenly">
                        <!-- Delete Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            @click="audio.cancel()"
                            title="حذف التسجيل الحالي">
                            <XMarkIcon class="w-9 h-9" />
                        </button>
                        <!-- Pause Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            @click="audio.pause()"
                            v-if="status == 'recording'"
                            title="إيقاف التسجيل مؤقتا">
                            <PauseIcon class="w-9 h-9" />
                        </button>
                        <!-- Resume Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            v-if="status == 'paused'"
                            @click="audio.resume()"
                            title="إستئناف التسجيل">
                            <PlayIcon class="w-9 h-9" />
                        </button>
                        <!-- Stop Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            @click="stop"
                            title="إيقاف التسجيل">
                            <!-- Heroicon name: outline/stop -->

                            <StopIcon class="w-9 h-9" />
                        </button>
                    </div>
                    <p class="pt-6 font-medium">
                        {{ timer.display.value }}
                    </p>
                </div>
                <div class="w-full" v-if="status === 'finished'">
                    <div class="flex items-center justify-evenly">
                        <!-- Delete Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            @click="reset"
                            title="حذف التسجيل الحالي">
                            <TrashIcon class="w-8 h-8" />
                        </button>
                        <!-- Record Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            @click="recordAgain"
                            title="تسجيل جديد">
                            <MicrophoneIcon class="w-8 h-8" />
                        </button>
                        <!-- Download Button -->
                        <a
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            @click.prevent="download"
                            title="تنزيل التسجيل">
                            <ArrowDownTrayIcon class="w-8 h-8" />
                        </a>
                    </div>
                    <audio class="w-full pt-8" controls ref="audioSource">
                        <source />
                        <p>متصفحك لا يدعم عنصر الصوت.</p>
                    </audio>
                </div>
            </div>

            <div>
                <PrimaryButton class="w-full" :disabled="status !== 'finished'">
                    <span>متابعة</span>
                </PrimaryButton>
            </div>
        </fieldset>
    </form>
</template>

<script setup lang="ts">
import {
    MicrophoneIcon,
    XMarkIcon,
    PauseIcon,
    PlayIcon,
    StopIcon,
    ArrowDownTrayIcon,
    TrashIcon
} from '@heroicons/vue/24/outline';
import type { OrderForm } from '~/types';
const resumeButton = ref(false);
const audio = useAudioRecorder();

const audioSource = ref<HTMLSourceElement | null>(null);

const { next } = useFormWizard<OrderForm>('order');

let recordedAudio: Blob;

const { status, timer } = audio.init({
    timer: {
        timeout: 120,
        onTimeout: async () => {
            useNotification({ content: 'المدة القصوى للتسجيل هي دقيقتين', type: 'warning' });
            await stop();
        }
    }
});

async function record() {
    await audio.play();
}

async function recordAgain() {
    audio.reset();
    await audio.play();
}

async function stop() {
    const audioBlob = await audio.stop();

    let reader = new FileReader();

    reader.onload = (e: any) => {
        let base64URL = e.target?.result;

        if (!audioSource.value) return;

        audioSource.value.src = base64URL;

        recordedAudio = audioBlob;

        const BlobType = audioBlob.type.includes(';')
            ? audioBlob.type.substr(0, audioBlob.type.indexOf(';'))
            : audioBlob.type;

        audioSource.value.type = BlobType;
    };

    reader.readAsDataURL(audioBlob);
}

async function reset() {
    audio.reset();
}

function download() {
    const fileLink = document.createElement('a');

    fileLink.href = window.URL.createObjectURL(recordedAudio);
    fileLink.setAttribute('download', 'تفاصيل الحلم');
    document.body.appendChild(fileLink);
    fileLink.click();
}

function submit() {
}
</script>

<style scoped></style>
