<template>
     <TransitionRoot appear :show="true" as="template">
        <Dialog as="div" class="relative z-50" @close="emit('close')" >
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95" >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                            <div class="py-3">
                                <div class="flex justify-between items-center pb-2">
                                    <h2 class="text-lg font-medium">{{title}}</h2>
                                    <XMarkIcon class="w-6 h-6 cursor-pointer" @click="emit('close')"/>
                                </div>
                                <slot/>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel

} from '@headlessui/vue';
defineProps(['title'])
const emit = defineEmits(['close'])

</script>