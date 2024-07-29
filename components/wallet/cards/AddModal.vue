<template>

    <Modal title="إضافة بطاقة إئتمانية" @close="emit('close')">

        <div class="is-scroll overflow-y-auto flex h-full flex-col gap-7 px-4 py-8 pb-36" id="addMyCard">
            <fieldset class="space-y-7">
                <div class="max-w-[320px] overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
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
                        <div class="w-0 flex-1 text-sm font-medium leading-loose">رسوم إضافة بطاقة إئتمانية 1 ر.س. يمكنك
                            الدفع من رصيد المحفظة</div>
                    </div>
                </div>
                <FormStepsPayment addCard />
            </fieldset>
        </div>

    </Modal>

</template>

<script setup lang="ts">

</script>

<style>
</style>
