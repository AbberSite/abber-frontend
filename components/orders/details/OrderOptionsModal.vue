<template>
    <TransitionRoot as="template">
        <div class="fixed inset-0 sm:hidden z-50">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
            </TransitionChild>

            <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enter-from="translate-y-full "
                enter-to="translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leave-from="translate-y-0"
                leave-to="translate-y-full"
                as="template">
                <div
                    class="is-scroll fixed bottom-0 z-40 max-h-[400px] w-full overflow-y-auto rounded-t-2xl border-t border-gray-100 bg-white px-6 py-6 sm:hidden"
                    v-cloak>
                    <button
                        class="mx-auto block h-1 w-8 rounded-lg bg-gray-300"
                        type="button"
                        @click="$emit('close')"></button>
                    <nav class="pt-6">
                        <button
                            class="group -mx-3 flex w-full items-center rounded-lg p-3 hover:bg-gray-50"
                            type="button"
                            @click="$emit('show-review')">
                            <div
                                class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <!-- Heroicon name: outline/home -->
                                <svg
                                    class="h-6 w-6 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                                </svg>
                            </div>
                            <span class="ms-6 mt-1.5 font-semibold">تقييم العميل</span>
                        </button>

                        <button
                            class="group -mx-3 flex w-full items-center rounded-lg p-3 hover:bg-gray-50"
                            type="button"
                            @click="$emit('show-review')">
                            <div
                                class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <!-- Heroicon name: outline/home -->
                                <svg
                                    class="h-6 w-6 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            </div>
                            <span class="ms-6 mt-1.5 font-semibold">الإبلاغ عن مشكلة</span>
                        </button>

                        <button
                            class="group -mx-3 flex w-full items-center rounded-lg p-3 hover:bg-gray-50"
                            type="button"
                            @click="() => true">
                            <div
                                class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <!-- Heroicon name: outline/home -->
                                <svg
                                    class="h-6 w-6 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </div>
                            <span class="ms-6 mt-1.5 font-semibold">إلغاء الطلب</span>
                        </button>
                    </nav>
                </div>
            </TransitionChild>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const emit = defineEmits(['close', 'show-review']);
</script>

<style scoped></style>
