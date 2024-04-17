<template>
    <Modal title="شحن الرصيد" @close="emit('close')">

        <div class="is-scroll overflow-y-auto flex h-full flex-col gap-7 px-4 py-8 pb-36">
            <fieldset class="space-y-7">
                <div class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
                    x-show="alert" role="alert">
                    <div class="mt-1.5 flex">
                        <span class="me-3 flex-shrink-0">
                            <!-- Heroicon name: outline/information-circle -->
                            <svg class="text-blue-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z">
                                </path>
                            </svg>
                        </span>
                        <div class="w-0 flex-1 text-sm font-medium leading-loose">
                            رسوم شحن الرصيد 200 ر.س. يمكنك الدفع من الرصيد المتبقي أو من المبلغ المراد شحنه
                        </div>
                    </div>
                </div>
                <transition enter-active-class="transition-all" leave-active-class="transition-all"
                    enter-from-class="translate-x-5 opacity-0" leave-to-class="-translate-x-5 opacity-0" mode="out-in">
                    <div :key="activeStepIndex">
                        <component :is="activeStep" />
                    </div>
                </transition>
            </fieldset>
        </div>
        <!-- <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]">
        <button @click="execute"
            class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            ><span class="mt-1.5">متابعة</span></button>
    </div> -->

    </Modal>

</template>

<script setup lang="ts">
import type { OrderForm } from '~/types';
import 'intl-tel-input/build/css/intlTelInput.css';
import useScript from '~/composables/useScript';
import intlTelInput from 'intl-tel-input';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import Payment from './Payment.vue';
import PriceInput from './PriceInput.vue';

const { activeStep, activeStepIndex, emitNext, state } = useFormWizard<any>("deposit", [
    { id: 'amount-input', component: PriceInput },
    { id: 'payment', component: Payment },
]);
state.value.data = {}

const emit = defineEmits(['close']);
</script>
