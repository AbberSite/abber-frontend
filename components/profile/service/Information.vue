<template>
    <div class="w-full" x-show="activeTab === 0" x-cloak="x-cloak">
        <h2 class="pt-16 font-semibold xs:text-lg">البيانات الأساسية</h2>
        <div class="grid w-full gap-x-8 space-y-7 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3">
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="commercial-name">الإسم التجاري</label>
                <input
                    v-model="primary.nick_name"
                    class="form-control h-[50px] appearance-none"
                    type="text"
                    name="text"
                    id="commercial-name"
                    placeholder="ادخل الإسم التجاري الخاص بك"
                    dir="rtl"
                    required />
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="address">العنوان</label>
                <input
                    v-model="primary.address"
                    class="form-control h-[50px] appearance-none"
                    type="text"
                    name="text"
                    id="address"
                    placeholder="ادخل العنوان الخاص يك"
                    dir="rtl"
                    required />
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="nationality">الجنسية</label>
                <input
                    v-model="primary.nationality"
                    class="form-control h-[50px] appearance-none"
                    type="text"
                    name="text"
                    id="nationality"
                    placeholder="ادخل الجنسية الخاصة يك"
                    dir="rtl"
                    required />
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="national-number">رقم الهوية الوطنية</label>
                <input
                    v-model="primary.national_id"
                    class="form-control h-[50px] appearance-none"
                    type="text"
                    name="text"
                    id="national-number"
                    placeholder="ادخل رقم الهوة الوطنية الخاصة يك"
                    dir="rtl"
                    required />
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="bio">نبذه تعريفية</label>
                <textarea
                    v-model="primary.about"
                    class="form-control block max-h-[300px] min-h-[200px] py-4"
                    name="textarea"
                    id="bio"
                    rows="5"
                    placeholder="ادخل نبذه تعريفية مختصرة خاصة يك"
                    required></textarea>
            </div>
        </div>
        <div class="pb-14 pt-8 sm:pt-14">
            <PrimaryButton
                @click="submit(primary, 'primary')"
                :loading="loading.primary"
                class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                type="submit"
                ><span class="mt-1.5">حفظ</span></PrimaryButton
            >
        </div>
        <h2 class="border-t border-gray-100 pt-16 font-semibold xs:text-lg">السجل</h2>
        <div class="grid w-full gap-x-8 space-y-7 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3">
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="certificate-number">رقم الشهادة</label>
                <input
                    class="form-control h-[50px] appearance-none"
                    type="text"
                    v-model="record.commercial_record"
                    name="text"
                    id="certificate-number"
                    placeholder="ادخل رقم الشهادة الخاص بك"
                    dir="rtl"
                    required />
                <div class="text-[13px] leading-loose text-gray-500">رقم شهادة وثيقة العمل الحر أو السجل التجاري</div>
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="register-image"
                    >صورة من السجل التجاري</label
                >
                <input
                    class="form-control h-[50px] appearance-none"
                    type="file"
                    name="file"
                    id="register-image"
                    @input="record.commercial_record_image = ($event?.target as HTMLInputElement)?.files?.[0]"
                    dir="rtl"
                    required />
                <a class="text-[13px] leading-loose text-gray-500 underline" target="_blank" :href="(record.commercial_record_image as any)" v-if="record.commercial_record_image">الصورة الحالية</a>

            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="tax-number">رقم التسجيل الضريبي</label>
                <input
                    class="form-control h-[50px] appearance-none"
                    type="text"
                    name="text"
                    id="tax-number"
                    v-model="record.tax_record"
                    placeholder="ادخل التسجيل الضريبي الخاصة يك"
                    dir="rtl"
                    required />
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="tax-register-number"
                    >صورة من السجل الضريبي</label
                >
                <input
                    class="form-control h-[50px] appearance-none"
                    type="file"
                    @input="record.tax_record_image = ($event?.target as HTMLInputElement)?.files?.[0]"

                    name="file"
                    id="tax-register-number"
                    dir="rtl"
                    required />
                <a class="text-[13px] leading-loose text-gray-500 underline" target="_blank" :href="(record.tax_record_image as any)" v-if="record.tax_record_image">الصورة الحالية</a>

                    
                    
            </div>
        </div>
        <div class="pt-8 sm:pt-14">
            <PrimaryButton @click="submitRecord" :loading="loading.record" type="submit">
                <span class="mt-1.5">حفظ</span>
            </PrimaryButton>
        </div>
    </div>
</template>

<script setup lang="ts">

const primary = ref({
    nick_name: '',
    address: '',
    nationality: '',
    national_id: '',
    about: ''
});

const record = ref<{

    commercial_record : string, 
    commercial_record_image : File | undefined,
    tax_record : string,
    tax_record_image : File | undefined
}>({
    commercial_record: '',
    commercial_record_image: undefined,
    tax_record: '',
    tax_record_image: undefined
});

const loading = ref({
    record : false, 
    primary : false
})

onMounted(async () => {
    const details = await getExpressorDetails();

    primary.value = details as typeof primary.value
    record.value = details as typeof record.value
});

async function getExpressorDetails() {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await useProxy(`/expressors/expressor/account/`);

            resolve(data);
        } catch (error) {
            reject({});
        }
    });
}

async function submit(data: any, LoadingKey : 'record'|'primary') {
    loading.value[LoadingKey] = true;

    try {
        await useProxy(`/expressors/expressor/account/`, {
            method: 'PUT',
            body: data
        });

        useNotification({ content: 'تم تحديث المعلومات بنجاح', type: 'success' });
    } catch (error) {
        useNotification({ content: 'حدث خطأ ما', type: 'danger' });
        console.log(error);
    } finally {
        loading.value[LoadingKey]  = false;
    }
}

async function submitRecord() {
    loading.value.record = true;

    const data = new FormData()


    console.log(typeof record.value.commercial_record_image);
    
    if(typeof record.value.commercial_record_image !== 'string'){
        data.append("commercial_record_image", record.value.commercial_record_image as File)
    }
    if(typeof record.value.tax_record_image !== 'string'){
        data.append("tax_record_image", record.value.tax_record_image as File)
    }
    data.append("commercial_record", record.value.commercial_record)
    data.append("tax_record", record.value.tax_record)

    try {
        await useProxy(`/expressors/expressor/account/`, {
            method: 'PUT',
            body: data
        });

        useNotification({ content: 'تم تحديث المعلومات بنجاح', type: 'success' });
    } catch (error) {
        useNotification({ content: 'حدث خطأ ما', type: 'danger' });
        console.log(error);
    } finally {
        loading.value.record  = false;
    }

}
</script>

<style scoped></style>
