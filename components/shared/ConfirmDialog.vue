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
                            <DialogTitle as="div" class="flex flex-col-reverse items-center" >
                              <h3 class="text-[16px] font-semibold leading-6 text-gray-900 py-1">{{title}}</h3>
                              <ExclamationTriangleIcon class="w-8 h-8" v-if="!payment" />
                              <CheckCircleIcon class="w-8 h-8" v-else/>
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500 text-center"  v-text="descritpion" />
                            </div>

                            <div class="mt-4 flex flex-col gap-2">
                                <PrimaryButton @click="emit('continue')"
                                    class="w-full">
                                    المتابعة
                                </PrimaryButton>
                                <button @click="emit('close')"
                                    class="w-full py-2 bg-slate-200 rounded-md font-semibold">
                                    إلغاء
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
// import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,

} from '@headlessui/vue';
const props = defineProps<{
  title: string; 
  descritpion: string;
  payment?:boolean
}>();
const emit = defineEmits(['continue', 'close'])

</script>