<template>
    <TransitionRoot as="template">
        <div class="fixed inset-0 z-50">
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
                enter-from="translate-x-full "
                enter-to="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
                as="template">
                <div class="fixed inset-0 z-40 bg-white sm:w-[340px]" v-cloak>
                    <div class="flex items-center justify-between border-b border-gray-100 px-6 py-8">
                        <h2 class="text-lg font-semibold xs:text-xl">سحب الرصيد</h2>
                        <button
                            class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
                            type="button"
                            @click="$emit('close')">
                            <span class="sr-only">إغلاق القائمة</span>
                            <!-- Heroicon name: outline/x-mark -->
                            <svg
                                height="26"
                                width="26"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div>
                        <fieldset class="is-scroll space-y-7 overflow-y-auto px-6 py-8 pb-36">
                            <div
                                class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
                                x-show="alert"
                                role="alert">
                                <div class="mt-1.5 flex">
                                    <span class="me-3 flex-shrink-0">
                                        <!-- Heroicon name: outline/information-circle -->
                                        <svg
                                            class="text-blue-500"
                                            height="24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
                                        </svg>
                                    </span>
                                    <div class="w-0 flex-1 text-sm font-medium leading-loose">
                                        رسوم سحب الرصيد 10 ر.س. يمكنك الدفع من الرصيد المتبقي أو من المبلغ المراد سحبه
                                    </div>
                                </div>
                            </div>
                            <label
                                class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none">
                                <div class="flex w-full pt-1.5">
                                    <div class="w-full space-y-3">
                                        <div class="ms-3 pt-1 text-sm font-semibold">
                                            <div>سحب جزء من الرصيد</div>
                                        </div>
                                        <div class="ms-3 text-justify text-[13px] leading-loose text-gray-700">
                                            حدد المبلغ المراد سحبه من محفظتك
                                        </div>
                                        <template v-if="selectedOption === 'part'">
                                            <div class="w-full space-y-3" >
                                                <input
                                                    v-model="amount"
                                                    class="form-control h-[50px] appearance-none"
                                                    type="number"
                                                    name="text"
                                                    id="amount"
                                                    placeholder="إدخل المبلغ المراد سحبه"
                                                    dir="rtl"
                                                    value=""
                                                    required />
                                            </div>
                                            <InputError :message="errors.amount" class="mt-2" />
                                        </template>
                                    </div>
                                </div>
                                <input
                                    class="h-5 w-5 flex-shrink-0 appearance-none rounded-full"
                                    id="part"
                                    type="radio"
                                    name="type"
                                    value="part"
                                    v-model="selectedOption"
                                    @change="selectedOption = 'part'" />
                            </label>
                            <label
                                class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none">
                                <div class="flex w-full pt-1.5">
                                    <div class="w-full space-y-3">
                                        <div class="ms-3 pt-1 text-sm font-semibold">
                                            <div>سحب كامل الرصيد</div>
                                        </div>
                                        <div class="ms-3 text-justify text-[13px] leading-loose text-gray-700">
                                            سيتم سحب جميع المبالغ من محفظتك
                                        </div>
                                    </div>
                                </div>
                                <input
                                    class="h-5 w-5 flex-shrink-0 appearance-none rounded-full"
                                    id="all"
                                    type="radio"
                                    name="type"
                                    value="all"
                                    v-model="selectedOption"
                                    @change="selectedOption = 'all'" />
                            </label>
                        </fieldset>
                    </div>
                    <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]">
                        <PrimaryButton
                            @click="submit"
                            class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                            :loading="loading">
                            <span class="mt-1.5">متابعة</span>
                        </PrimaryButton>
                    </div>
                </div>
            </TransitionChild>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const selectedOption = ref<'part' | 'all'>('part');
const amount = ref(0);
let loading = ref(false);
const emit = defineEmits(['close']);
const errors = ref<{ amount?: string }>({});

async function submit() {
    errors.value = {};
    
    if (selectedOption.value == 'part' && !amount.value) {
        errors.value.amount = 'هذا الحقل مطلوب';
        return;
    }
    
    loading.value = true;
    try{
        const response = await useProxy("/wallets/balance-withdrawal/", {
            method: 'POST',
            body: {
                part_or_all: selectedOption.value,
                amount: selectedOption.value == 'part' ? amount.value : undefined
            }
        });
        loading.value = false;
        emit('close');
        console.log(response)
        useNotification({type: 'success', content: response.message})
    } catch(e){
        loading.value = false;
        emit('close');
        useNotification({type: 'danger', content: 'هناك مشكلة، يجب عليك تعبئة بياناتك البنكية'})
    }

}
</script>

<style></style>
