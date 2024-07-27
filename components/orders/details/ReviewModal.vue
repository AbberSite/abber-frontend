<template>
    <Modal title="تقييم المعبر" @close="emit('close')">
        <fieldset class="is-scroll space-y-7 overflow-y-auto px-6 py-8">
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select">جودة الخدمة</label>
                                <select class="form-control form-select h-[50px] appearance-none"
                                    v-model="rating.quality_rate" name="select" id="select" required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select">التسليم في الوقت
                                    المحدد</label>
                                <select class="form-control form-select h-[50px] appearance-none" name="select"
                                    v-model="rating.delivery_rate" id="select" required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select">التواصل
                                    والمتابعة</label>
                                <select class="form-control form-select h-[50px] appearance-none" name="select"
                                    v-model="rating.communication_rate" id="select" required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select">الإحترافية في
                                    التعامل</label>
                                <select class="form-control form-select h-[50px] appearance-none" name="select"
                                    id="select" v-model="rating.professional_rate" required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select">التعامل معه مرة
                                    أخرى</label>
                                <select class="form-control form-select h-[50px] appearance-none" name="select"
                                    v-model="rating.again_rate" id="select" required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="select">الخبرة</label>
                                <select class="form-control form-select h-[50px] appearance-none" name="select"
                                    v-model="rating.expertise_rate" id="select" required>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </select>
                            </div>
                            <div class="w-full space-y-3">
                                <label class="block text-sm font-semibold xs:text-base" for="textarea">إضافة
                                    تعليق</label>
                                <textarea v-model="rating.comment"
                                    class="form-control block max-h-[300px] min-h-[200px] py-4" name="textarea"
                                    id="textarea" rows="5" required></textarea>
                            </div>
                            <PrimaryButton @click="submit" :loading="loading" type="submit">
                                <span>حفظ</span>
                            </PrimaryButton>
                        </fieldset>
    </Modal>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const id = useRoute().params.id;
const emit = defineEmits(['close', 'rated_success']);

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
        await useDirectApi(`/services/services/${order.value?.service}/ratings/`, {
            method: 'POST',
            body: rating.value
        });

        emit('close');
        useNotification({ type: 'success', content: 'تم اضافة التقييم.' });
        emit('rated_success');
    } catch (error: any) {
        emit('close');
        useNotification({ type: 'danger', content: 'خدث خطأ عند اضافة التقييم.' });
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped></style>
