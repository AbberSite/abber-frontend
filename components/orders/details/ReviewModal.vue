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
                    <div class="flex h-full flex-col">
                        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-8">
                            <h2 class="text-lg font-semibold xs:text-xl">تقييم المعبر</h2>
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
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <fieldset class="is-scroll space-y-7 overflow-y-auto px-6 py-8">
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select">جودة الخدمة</label>
                                <select
                                    class="form-control form-select h-[50px] appearance-none"
                                    v-model="rating.quality_rate"
                                    name="select"
                                    id="select"
                                    required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select"
                                    >التسليم في الوقت المحدد</label
                                >
                                <select
                                    class="form-control form-select h-[50px] appearance-none"
                                    name="select"
                                    v-model="rating.delivery_rate"
                                    id="select"
                                    required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select"
                                    >التواصل والمتابعة</label
                                >
                                <select
                                    class="form-control form-select h-[50px] appearance-none"
                                    name="select"
                                    v-model="rating.communication_rate"
                                    id="select"
                                    required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select"
                                    >الإحترافية في التعامل</label
                                >
                                <select
                                    class="form-control form-select h-[50px] appearance-none"
                                    name="select"
                                    id="select"
                                    v-model="rating.professional_rate"
                                    required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select"
                                    >التعامل معه مرة أخرى</label
                                >
                                <select
                                    class="form-control form-select h-[50px] appearance-none"
                                    name="select"
                                    v-model="rating.again_rate"
                                    id="select"
                                    required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select">الخبرة</label>
                                <select
                                    class="form-control form-select h-[50px] appearance-none"
                                    name="select"
                                    v-model="rating.expertise_rate"
                                    id="select"
                                    required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="textarea"
                                    >إضافة تعليق</label
                                >
                                <textarea
                                    v-model="rating.comment"
                                    class="form-control block max-h-[300px] min-h-[200px] py-4"
                                    name="textarea"
                                    id="textarea"
                                    rows="5"
                                    required></textarea>
                            </div>
                            <PrimaryButton @click="submit" :loading="loading" type="submit">
                                <span class="mt-1.5">حفظ</span>
                            </PrimaryButton>
                        </fieldset>
                    </div>
                </div>
            </TransitionChild>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const id = useRoute().params.id;
const emit = defineEmits(['close']);

const loading = ref(false);

const { order } = storeToRefs(useOrdersStore());

const rating = ref({
    professional_rate: 5,
    communication_rate: 5,
    quality_rate: 5,
    expertise_rate: 5,
    delivery_rate: 5,
    again_rate: 5,
    comment: '',
    order_id: id
});

async function submit() {
    loading.value = true;
    try {
        const data = await useProxy(`/services/services/${order.value?.service}/ratings/`, {
            method: 'POST',
            body: rating.value
        });

        emit('close');
        useNotification({ type: 'success', content: 'تم اضافة التقييم.' });
    } catch (error: any) {
        emit('close');
        useNotification({ type: 'danger', content: 'خدث خطأ عند اضافة التقييم.' });
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped></style>
