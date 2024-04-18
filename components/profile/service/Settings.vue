<template>
    <div class="w-full">
        <h2 class="pt-16 font-semibold xs:text-lg">إعدادات عامه</h2>
        <div class="grid w-full gap-x-8 space-y-7 pb-14 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3">
            <div class="flex items-center">
                <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox"
                    v-model="form.active" name="checkbox" id="available" />
                <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="available">متاح في الموقع</label>
            </div>
        </div>
        <h2 class="border-t border-gray-100 pt-16 font-semibold xs:text-lg">إعدادات المحادثة النصية</h2>
        <div class="flex items-center my-9">
            <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
                id="text-available" v-model="form.service_prices.text" />
            <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="text-available">تفعيل الخدمة
                النصية</label>
        </div>
        <div class="grid w-full gap-x-8 space-y-7 pb-14 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3"
            v-if="form.service_prices.text">
            <div class="w-full space-y-3">
                <TextInput name="text_price" type="number" v-model="text_price" label="السعر"
                    placeholder="أدخل السعر" :error="errors.text_price" />
                <div class="text-[13px] leading-loose text-gray-500">إدخل سعر المحادثة النصية بالريال السعودي</div>
            </div>
            <div class="w-full space-y-3">
                <TextInput name="maximum_orders" type="number" v-model="maximum_orders" label="عدد الطلبات الكلي"
                    placeholder="ادخل عدد الطلبات الكلي" :error="errors.maximum_orders" />
                <div class="text-[13px] leading-loose text-gray-500">إدخل الحد الأقصى لاستقبال الطلبات</div>
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="allowed">عدد الطلبات المتاحه</label>
                <input class="form-control h-[50px] appearance-none" type="number" name="number" id="allowed"
                    placeholder="ادخل عدد الطلبات المتاحه" dir="rtl" required />
                <div class="text-[13px] leading-loose text-gray-500">إدخل عدد الطلبات المتاح استقبالها</div>
            </div>
        </div>
        <h2 class="border-t border-gray-100 pt-16 font-semibold xs:text-lg">إعدادات المحادثة الصوتية</h2>
        <div class="flex items-center my-9">
            <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox"
                v-model="form.service_prices.video" name="checkbox" id="video-available" />
            <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="video-available">تفعيل الخدمة
                الصوتية</label>
        </div>
        <div class="grid w-full gap-x-8 space-y-7 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3">
            <div class="w-full space-y-3">
                <TextInput name="video_price" type="number" v-model="video_price" label="السعر"
                    placeholder="أدخل السعر" :error="errors.video_price" />
                <div class="text-[13px] leading-loose text-gray-500">إدخل سعر المحادثة الصوتية بالريال السعودي</div>
                <span v-if="error?.type == 'video_price'" class="text-red-500">{{ error.message }}</span>
            </div>
        </div>
        <div class="pt-8 sm:pt-14">
            <PrimaryButton @click="submit" type="submit" :loading="loading">
                <span class="mt-1.5">حفظ</span>
            </PrimaryButton>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
const { defineField, errors, validate } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            text_price: yup.number().min(1, 'هذا الحقل مطلوب').max(100, 'هذا لحقل لايمكن ان يتجاوز 100').required('هذا الحقل مطلوب'),
            video_price: yup.number().min(1, 'هذا الحقل مطلوب').max(100, 'هذا لحقل لايمكن ان يتجاوز 100').required('هذا الحقل مطلوب'),
            maximum_orders: yup.number().min(1, 'هذا الحقل مطلوب').required('هذا الحقل مطلوب')
        })
    )
});

const [text_price] = defineField('text_price');
const [video_price] = defineField('video_price');
const [maximum_orders] = defineField('maximum_orders');

const form = ref({
    active: false,
    service_prices: {
        video: false,
        text: false
    }
});
let error = ref<{ type: 'text_price' | 'video_price' | 'maximum_orders'; message: string; } | undefined>(undefined)
const { data: user } = useAuth()
const loading = ref(false);

async function getServiceDetails() {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await useProxy(`/services/services/${user.value.username}/`);

            resolve(data);
        } catch (error) {
            reject({});
        }
    });
}

const response = await getServiceDetails();
text_price.value = response.service_prices.text_price;
video_price.value = response.service_prices.video_price;
maximum_orders.value = response.text_service_capacity.maximum_orders;
delete response.service_prices.text_price;
delete response.service_prices.video_price;
delete response.text_service_capacity.maximum_orders
form.value = response as typeof form.value;

async function submit() {
    const validation = await validate();
    if(!validation.valid) return;
    loading.value = true;
    form.value.service_prices.text_price = text_price.value;
    form.value.service_prices.video_price = video_price.value;
    form.value.text_service_capacity.maximum_orders = maximum_orders.value;
    try {

        await useProxy(`/services/services/${user.value.username}/`, {
            method: 'PUT',
            body: form.value
        });

        useNotification({ content: 'تم تحديث المعلومات بنجاح', type: 'success' });
    } catch (error) {
        useNotification({ content: 'حدث خطأ ما', type: 'danger' });
        console.log(error);
    } finally {
        loading.value = false;
    }

}

</script>

<style scoped></style>
