<template>
    
    <form method="POST" @submit.prevent="$emit('next', { type : selectedOption })">
        <fieldset class="space-y-7">
            <label
                class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none"
                :class="[(selectedOption == 'text_communication') && 'border-gray-900 ring-1 ring-gray-900']"
                
                >
                <div class="flex pt-1.5">
                    <span class="flex-shrink-0">
                        <!-- Heroicon name: outline/chat-bubble-left-ellipsis -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="1.5">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"></path>
                        </svg>
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
                
                :class="[(selectedOption == 'voice_communication') && 'border-gray-900 ring-1 ring-gray-900']"

                >
                <div class="flex pt-1.5">
                    <span class="flex-shrink-0">
                        <!-- Heroicon name: outline/microphone -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="1.5">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"></path>
                        </svg>
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

            <PrimaryButton :disabled="selectedOption === ''" class="w-full">
                <span class="mt-1.5">متابعة</span>
            </PrimaryButton>
       
        </fieldset>
    </form>
</template>

<script setup lang="ts">

const props = defineProps(['type'])

const selectedOption = ref(props.type);

</script>

<style scoped></style>
