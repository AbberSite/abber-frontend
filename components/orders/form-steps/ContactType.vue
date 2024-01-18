<template>
    <Head>
        <title>عبر - طلب تعبير حلم - طريقة تعبير الحلم</title>
    </Head>
    <form method="POST" @submit.prevent="submit">
        <fieldset class="space-y-7">
            <label
                class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none"
                :class="[selectedOption == 'text_communication' && 'border-gray-900 ring-1 ring-gray-900']">
                <div class="flex pt-1.5">
                    <span class="flex-shrink-0">
                        <ChatBubbleLeftEllipsisIcon class="w-6 h-6" />
                    </span>
                    <span class="flex flex-col space-y-3">
                        <span class="ms-3 mt-1.5 text-sm font-semibold">محادثة نصية</span>
                        <span class="ms-3 text-[13px] leading-loose text-gray-700"
                            >سيتواصل المعبر معك نصيا عن طريق شات منصة عبر.</span
                        >
                    </span>
                </div>

                <input
                    class="h-5 w-5 flex-shrink-0 appearance-none rounded-full"
                    id="text-communication"
                    type="radio"
                    name="type"
                    value="text_communication"
                    v-model="selectedOption" />
            </label>
            <label
                class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none"
                :class="[selectedOption == 'voice_communication' && 'border-gray-900 ring-1 ring-gray-900']">
                <div class="flex pt-1.5">
                    <span class="flex-shrink-0">
                        <MicrophoneIcon class="w-6 h-6" />
                    </span>
                    <span class="flex flex-col space-y-3">
                        <span class="ms-3 mt-1.5 text-sm font-semibold">محادثة صوتية</span>
                        <span class="ms-3 text-[13px] leading-loose text-gray-700"
                            >سيتواصل المعبر معك صوتيا عن طريق تطبيق Zoom.</span
                        >
                    </span>
                </div>
                <input
                    class="h-5 w-5 flex-shrink-0 appearance-none rounded-full"
                    id="voice-communication"
                    type="radio"
                    name="type"
                    value="voice_communication"
                    v-model="selectedOption" />
            </label>

            <PrimaryButton :disabled="!selectedOption" class="w-full">
                <span class="mt-1.5">متابعة</span>
            </PrimaryButton>
        </fieldset>
    </form>
</template>

<script setup lang="ts">
import { ChatBubbleLeftEllipsisIcon, MicrophoneIcon } from '@heroicons/vue/24/outline';
import type { OrderForm } from '~/types';
const props = defineProps(['type']);

const { state, next } = useFormWizard<OrderForm>('order');

const emits = defineEmits(['next']);

const selectedOption = ref(state.value.data?.type);


function submit() {
    
    next({
        nextStepId: selectedOption.value === 'voice_communication' ? 'service' : 'dream-details',
        options: {
            activeNavigationIndex: selectedOption.value === 'voice_communication' ? 2 : undefined
        },
        data : {
            type: selectedOption.value
        }
    });

}
</script>

<style scoped></style>
