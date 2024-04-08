<template>
    <TransitionRoot as="template">
        <div class="fixed inset-0 sm:hidden">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
            </TransitionChild>

            <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="translate-y-full "
                enter-to="translate-y-0" leave="transition ease-in-out duration-300 transform"
                leave-from="translate-y-0" leave-to="translate-y-full" as="template">
                <div class="fixed bottom-0 z-40 w-full rounded-t-2xl border-t border-gray-100 bg-white px-6 py-6">
                    <button class="mx-auto block h-1 w-8 rounded-lg bg-gray-300" type="button"
                        @click="$emit('close')"></button>
                    <div class="pb-4 pt-8">
                        <div class="flex items-center justify-between space-x-3 rtl:space-x-reverse">
                            <h3 class="mt-1.5 text-lg font-semibold">فلترة</h3>
                            <a @click.prevent="apply"
                                class="flex items-center rounded-md bg-gray-900 px-4 pb-2 pt-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800"
                                href="/tickets">تطبيق</a>
                        </div>
                        <div class="flex space-x-6 pt-10 rtl:space-x-reverse">
                            <div class="w-full">
                                <h3 class="text-sm font-semibold">حالة التذكرة</h3>
                                <select class="form-control form-select h-[50px] appearance-none w-full" name="select"
                                    v-model="filters.status" required>
                                    <option value="">الكل</option>
                                    <option value="مفتوحة">مفتوحة</option>
                                    <option value="مغلقة">مغلقة</option>
                                    <option value="معلقة">معلقة</option>
                                </select>
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
const emit = defineEmits(["close"])
const { filters } = storeToRefs(useTicketsStore());
function apply() {
    emit("close");
}
</script>

<style scoped></style>
