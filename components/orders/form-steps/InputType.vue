<template>
    <Head>
        <title>عبر - طلب تعبير حلم - إدخال تفاصيل الحلم</title>
    </Head>

    <form method="POST" @submit.prevent="$emit('next', { inputType: selectedOption, activeNavigationIndex : 1 })">
        <fieldset class="space-y-7">
            <label
                class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none"
                :class="[selectedOption == 'text_communication' && 'border-gray-900 ring-1 ring-gray-900']">
                <div class="flex pt-1.5">
                    <span class="flex-shrink-0">
                        <CursorArrowRaysIcon class="w-6 h-6" />
                    </span>
                    <span class="flex flex-col space-y-3">
                        <span class="ms-3 mt-1.5 text-sm font-semibold">إدخال نصي</span>
                        <span class="ms-3 text-[13px] leading-loose text-gray-700"
                            >إدخل تفاصيل حلمك يدويا من خلال ملئ حقول الإدخال.</span
                        >
                    </span>
                </div>

                <input
                    class="h-5 w-5 flex-shrink-0 appearance-none rounded-full"
                    id="text-communication"
                    type="radio"
                    name="type"
                    value="text_chat"
                    v-model="selectedOption" />
            </label>
            <label
                class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none"
                :class="[selectedOption == 'voice_communication' && 'border-gray-900 ring-1 ring-gray-900']">
                <div class="flex pt-1.5">
                    <span class="flex-shrink-0">
                        <!-- Heroicon name: outline/microphone -->

                        <MicrophoneIcon class="w-6 h-6" />
                    </span>
                    <span class="flex flex-col space-y-3">
                        <span class="ms-3 mt-1.5 text-sm font-semibold">إدخال صوتي</span>
                        <span class="ms-3 text-[13px] leading-loose text-gray-700"
                            >إدخل تفاصيل حلمك صوتيا بإستخدام بصمة الصوت ولمدة دقيقتين كحد أقصى.</span
                        >
                    </span>
                </div>
                <input
                    class="h-5 w-5 flex-shrink-0 appearance-none rounded-full"
                    id="voice-communication"
                    type="radio"
                    name="type"
                    value="voice_chat"
                    v-model="selectedOption" />
            </label>

            <PrimaryButton :disabled="!selectedOption" class="w-full">
                <span class="mt-1.5">متابعة</span>
            </PrimaryButton>
        </fieldset>
    </form>
</template>

<script setup lang="ts">
import { CursorArrowRaysIcon, MicrophoneIcon } from '@heroicons/vue/24/outline';
// const props = defineProps(['type'])

const selectedOption = ref('');
</script>

<style scoped></style>
