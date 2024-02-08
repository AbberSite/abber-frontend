<template>
    <TransitionRoot as="template">
        <div class="fixed inset-0 z-30 sm:hidden" >
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
                class=" bottom-0 fixed  z-40 max-h-[400px] w-full overflow-y-auto rounded-t-2xl border-t border-gray-100 bg-white px-6 py-6"
                >
                    <button
                        class="mx-auto block h-1 w-8 rounded-lg bg-gray-300"
                        type="button"
                        @click="$emit('close')"></button>
                    <div class="pt-8">
                        <div class="flex items-center justify-between space-x-3 rtl:space-x-reverse">
                            <h3 class="mt-1.5 text-lg font-semibold">فلترة</h3>
                            <a
                                class="flex items-center rounded-md bg-gray-900 px-4 pb-2 pt-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800"
                                href="/order/"
                                >تطبيق</a
                            >
                        </div>
                        <div class="flex space-x-6 pt-10 rtl:space-x-reverse">
                            <div>
                                <h3 class="text-sm font-semibold">حالة الطلب</h3>
                                <div class="space-y-3 pt-4">
                                    <div class="flex items-center">
                                        <input
                                            class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                            type="checkbox"
                                            name="checkbox"
                                            id="checkbox" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">جديد</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input
                                            class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                            type="checkbox"
                                            name="checkbox"
                                            id="checkbox" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">قد التقدم</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input
                                            class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                            type="checkbox"
                                            name="checkbox"
                                            id="checkbox" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">ملغاة</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input
                                            class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                            type="checkbox"
                                            name="checkbox"
                                            id="checkbox" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox"
                                            >بإنتظار الإستلام</label
                                        >
                                    </div>
                                    <div class="flex items-center">
                                        <input
                                            class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                            type="checkbox"
                                            name="checkbox"
                                            id="checkbox" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">مكتمل</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input
                                            class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                            type="checkbox"
                                            name="checkbox"
                                            id="checkbox" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox"
                                            >بإنتظار الإلغاء</label
                                        >
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-sm font-semibold">نوع الطلب</h3>
                                <div class="space-y-3 pt-4">
                                    <div class="flex items-center">
                                        <input
                                            class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                            type="checkbox"
                                            name="checkbox"
                                            id="checkbox" />
                                    </div>
                                    <div class="flex items-center">
                                        <input
                                            class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                            type="checkbox"
                                            name="checkbox"
                                            id="checkbox" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionChild>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
</script>

<style scoped></style>
