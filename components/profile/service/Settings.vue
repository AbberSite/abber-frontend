<template>
    <div class="w-full">
        <h2 class="pt-16 font-semibold xs:text-lg">إعدادات عامه</h2>
        <div class="grid w-full gap-x-8 space-y-7 pb-14 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3">
            <div class="flex items-center">
                <input
                    class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
                    type="checkbox"
                    v-model="form.active"
                    name="checkbox"
                    id="available" />
                <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="available">متاح في الموقع</label>
            </div>
        </div>
        <h2 class="border-t border-gray-100 pt-16 font-semibold xs:text-lg">إعدادات المحادثة النصية</h2>
        <div class="flex items-center my-9">
            <input
                class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                name="checkbox"
                id="text-available"
                v-model="form.service_prices.text" />
            <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="text-available"
                >تفعيل الخدمة النصية</label
            >
        </div>
        <div
            class="grid w-full gap-x-8 space-y-7 pb-14 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3"
            v-if="form.service_prices.text">
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base"  for="text-price">السعر</label>
                <input
                    class="form-control h-[50px] appearance-none" :class="{'border-red-500 text-red-400': error?.type == 'text_price'}"
                    type="number"
                    name="number"
                    v-model.number="form.service_prices.text_price"
                    id="text-price"
                    placeholder="ادخل السعر"
                    dir="rtl"
                    required />
                <div class="text-[13px] leading-loose text-gray-500">إدخل سعر المحادثة النصية بالريال السعودي</div>
                <span v-if="error?.type == 'text_price'" class="text-red-500" >{{ error.message }}</span>
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="total">عدد الطلبات الكلي</label>
                <input
                    class="form-control h-[50px] appearance-none"
                    type="number"
                    v-model.number="form.text_service_capacity.maximum_orders"  :class="{'border-red-500 text-red-400': error?.type == 'text_price'}"
                    name="number"
                    id="total"
                    placeholder="ادخل عدد الطلبات الكلي"
                    dir="rtl"
                    required />
                <div class="text-[13px] leading-loose text-gray-500">إدخل الحد الأقصى لاستقبال الطلبات</div>
                <span v-if="error?.type == 'maximum_orders'" class="text-red-500" >{{ error.message }}</span>
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="allowed">عدد الطلبات المتاحه</label>
                <input
                    class="form-control h-[50px] appearance-none"
                    type="number"
                    name="number"
                    id="allowed"
                    placeholder="ادخل عدد الطلبات المتاحه"
                    dir="rtl"
                    required />
                <div class="text-[13px] leading-loose text-gray-500">إدخل عدد الطلبات المتاح استقبالها</div>
            </div>
        </div>
        <h2 class="border-t border-gray-100 pt-16 font-semibold xs:text-lg">إعدادات المحادثة الصوتية</h2>
        <div class="flex items-center my-9">
            <input
                class="h-6 w-6 flex-shrink-0 appearance-none rounded border" 
                type="checkbox"
                v-model="form.service_prices.video"
                name="checkbox"
                id="video-available" />
            <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="video-available"
                >تفعيل الخدمة الصوتية</label
            >
        </div>
        <div class="grid w-full gap-x-8 space-y-7 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3">
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="video-price">السعر</label>
                <input
                    class="form-control h-[50px] appearance-none" :class="{'border-red-500 text-red-400': error?.type == 'video_price'}"
                    type="number"
                    name="number"
                    id="video-price"
                    placeholder="ادخل السعر"
                    v-model.number="form.service_prices.video_price"
                    dir="rtl"
                    required />
                <div class="text-[13px] leading-loose text-gray-500">إدخل سعر المحادثة الصوتية بالريال السعودي</div>
                <span v-if="error?.type == 'video_price'" class="text-red-500" >{{ error.message }}</span>
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
const form = ref({
    active: false,
    service_prices: {
        video: false,
        text: false,
        text_price: 0,
        video_price: 0
    },
    text_service_capacity: {
        maximum_orders: 0,
        // stock: 0
    }
});
let error = ref<{type: string; message: string;} | undefined>(undefined)
const{data:user}= useAuth()
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
form.value = response as typeof form.value;

async function submit() {
    loading.value = true;
    validation();
    if(error.value != undefined) {
        loading.value = false;
        return ;
    }
    const data = new FormData()

    data.append("service_prices.video",form.value.service_prices.video as any)
    data.append("active",form.value.active as any)
    data.append("service_prices.text",form.value.service_prices.text as any)
    if(form.value.service_prices.text_price != 0 ){
        data.append("service_prices.text_price",form.value.service_prices.text_price as any)
    }
    if(form.value.service_prices.video_price != 0 ){
        data.append("service_prices.video_price",form.value.service_prices.video_price as any)
    }
  
    data.append("text_service_capacity.maximum_orders",form.value.text_service_capacity.maximum_orders as any)

    try {

      await useProxy(`/services/services/${user.value.username}/`, {
            method: 'PUT',
            body: data
        });

        useNotification({ content: 'تم تحديث المعلومات بنجاح', type: 'success' });
    } catch (error) {
        useNotification({ content: 'حدث خطأ ما', type: 'danger' });
        console.log(error);
    } finally {
        loading.value  = false;
    }

}


function validation(){
    if(form.value.service_prices.text_price < 0 || form.value.service_prices.text_price > 100){
        error.value = {type: 'text_price', message: 'يجب ان يكون السعر فوق 1.0 ريال واقل من 100' }
    } else if(form.value.service_prices.video_price < 0 || form.value.service_prices.video_price > 100){
        error.value = {type: 'video_price', message: 'يجب ان يكون السعر فوق 1.0 ريال وأقل من 100'}
    } else if(form.value.text_service_capacity.maximum_orders < 0){
        error.value = {type: 'maximum_orders', message: 'يجب ان يكون العدد اكبر من 1 '}
    } else {
        error.value = undefined;
    }
}
</script>

<style scoped></style>
