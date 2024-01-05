<template>
    <form method="POST" @submit.prevent="$emit('next', {recordedAudio})">
        <fieldset class="space-y-7">
            <div class="flex h-[75%] flex-col items-center justify-center rounded-md border p-6 text-center shadow-sm">
                <div class="pt-2" v-if="status === 'initialized'">
                    <button
                        class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                        type="button"
                        @click="record">
                        <!-- Heroicon name: outline/microphone -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="1.5">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"></path>
                        </svg>
                    </button>
                    <p class="pt-6 text-sm font-semibold xs:text-[15px]">إبدأ التسجيل</p>
                </div>

                <div class="w-full pt-2" v-if="status === 'recording' || status === 'paused'">
                    <div class="flex items-center justify-evenly">
                        <!-- Delete Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            @click="audio.cancel()"
                            title="حذف التسجيل الحالي">
                            <!-- Heroicon name: outline/x-mark -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <!-- Pause Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            @click="audio.pause()"
                            v-if="status == 'recording'"
                            title="إيقاف التسجيل مؤقتا">
                            <!-- Heroicon name: outline/pause -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.5">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"></path>
                            </svg>
                        </button>
                        <!-- Resume Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            v-if="status == 'paused'"
                            @click="audio.resume()"
                            title="إستئناف التسجيل">
                            <!-- Heroicon name: outline/play -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.5">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"></path>
                            </svg>
                        </button>
                        <!-- Stop Button -->
                        <button
                            class="rounded-full border border-transparent bg-gray-900 px-4 py-4 text-white shadow-sm hover:bg-gray-800"
                            type="button"
                            @click="stop"
                            title="إيقاف التسجيل">
                            <!-- Heroicon name: outline/stop -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.5">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="pt-6 font-semibold">
                        {{ timer.display.value }}
                    </p>
                </div>
                <div class="w-full" v-if="status === 'finished'" >
                    <audio class="w-full" controls ref="audioSource">
                        <source /> 
                        <p>متصفحك لا يدعم عنصر الصوت.</p>
                    </audio>
                </div>
            </div>
    
            <div>
                <PrimaryButton class="w-full" :disabled="status !== 'finished'">
                    <span class="mt-1.5">متابعة</span>
                </PrimaryButton>
            </div>
        </fieldset>
    </form>
</template>

<script setup lang="ts">
const resumeButton = ref(false);
const audio = useAudioRecorder();

const audioSource = ref<HTMLSourceElement | null>(null);
let recordedAudio : Blob; 

const { status, timer } = audio.init({
    timer : {
        timeout : 120,
        onTimeout : async () => {

            useNotification({ content : 'المدة القصوى للتسجيل هي دقيقتين', type : 'warning' })
            await stop()

        }
    }
});



async function record() {
    await audio.play();
}

async function stop() {

    const audioBlob = await audio.stop();

    let reader = new FileReader();

    reader.onload = (e: any) => {

        let base64URL = e.target?.result;

        if (!audioSource.value) return;

        audioSource.value.src = base64URL;


        recordedAudio = audioBlob

        const BlobType = audioBlob.type.includes(';')
            ? audioBlob.type.substr(0, audioBlob.type.indexOf(';'))
            : audioBlob.type;

        audioSource.value.type = BlobType;

    };

    reader.readAsDataURL(audioBlob);

}
</script>

<style scoped></style>
