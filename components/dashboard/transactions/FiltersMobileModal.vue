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
                                href="/order/">تطبيق</a>
                        </div>
                        <div class="flex space-x-6 pt-10 rtl:space-x-reverse">
                            <div>
                                <h3 class="text-sm font-semibold">نوع العملية</h3>
                                <div class="grid grid-rows-6 grid-flow-col gap-1">
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus" id="paid" :value="true" checked />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">الكل</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">سحب</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إرجاع</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">رسوم الخدمة</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">دفع الفاتورة</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">شحن الرصيد</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">باقة المعبر</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">تسجيل/تجديد النطاق</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إضافة بطاقة</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">عملية على الرصيد</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إلغاء الطلب</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">Cart checkout</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus"  id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">Orders Package</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-sm font-semibold">حالة الدفع</h3>
                                <div class="space-y-3 pt-4">
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus" v-model="success" id="all" :value="null" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">الكل</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus" v-model="success" id="paid" :value="true" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">تم الدفع</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                                            name="paymentStatus" v-model="success" id="text" :value="false" />
                                        <label class="mt-1.5 ps-3 text-sm font-medium" for="text">فشل الدفع</label>
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
import { useDashTransactionsStore } from '~/stores/dashboard/dashTransactions';


const success = ref(null);


const { filters } = storeToRefs(useDashTransactionsStore())
const emit = defineEmits(["close"])

onMounted(() => {
    success.value = filters.value.success;
})


function apply() {
    filters.value.success = success.value;
    emit("close");
}
</script>

<style scoped></style>
