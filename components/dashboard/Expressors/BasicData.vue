<template>
    <SkeletonsUserDetails v-if="loading"/>
    <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput v-model="expressorData.nick_name" label="الإسم التجاري" />
                <TextInput v-model="expressorData.address" label="العنوان" />
                <TextInput v-model="expressorData.commercial_record" label="رقم السجل التجاري" />
                <TextInput v-model="expressorData.tax_record" label="رقم التسجيل الضريبي" />
                <TextInput v-model="expressorData.twitter_id" label="معرف تويتر" />
                <TextInput v-model="expressorData.instagram_id" label="معرف إنستجرام" />
                <TextInput v-model="expressorData.facebook_id" label="معرف الفيسبوك" />
                <TextInput v-model="expressorData.trading_ministry_id" label="رابط وزارة التجارة الخاص بك" />
                <CustomImageInput label="الشعار" v-model="expressorData.expressor_image" />
                <CustomImageInput 
                    label="صورة من السجل الضريبي"
                    v-model="expressorData.tax_record_image"
                />
                <CustomImageInput 
                    label="صورة من السجل التجاري"
                    v-model="expressorData.commercial_record_image"
                />
                <TextInput v-model="expressorData.expressor_url" label="رابط المعبر الخاص بك" />
                <TextInput v-model="expressorData.nationality" label="الجنسية" />
                <CustomImageInput 
                    label="صورة من الهوية الوطنية"
                    v-model="expressorData.national_id"
                />
                <!-- <TextInput label="الهوية الوطنية" type="file" @change="handleFileChange('national_id', $event)" /> -->
                <TextInput v-model="expressorData.about" label="نبذة تعريفية" />
                <Checkbox  v-model="expressorData.blog" label="blog" class="my-4" />
                <TextInput  label="خصم خاص على رسوم الموقع"><template #append><span class="text-gray-600 py-2">سيتم احتساب مبلغ ثابت, لاحتساب نسبة أضف %</span></template></TextInput>
                <TextInput v-model="expressorData.work_hours" label="ساعات العمل" />
        </div>
        <div class="flex items-center justify-between pt-6">
            <PrimaryButton :loading="updateLoading" @click.prevent="submit">حفظ</PrimaryButton>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';

const username = useRoute().params.id;
const { loading, updateLoading, expressorData } = storeToRefs(useDashboardUsersStore());
const { updateExpressor } = useDashboardUsersStore();

function submit() {
    const formData = new FormData();
    Object.entries(expressorData.value).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
    });
    console.log(formData)
    // Call updateExpressor with formData
    updateExpressor(username, formData);
}
</script>
<style module>
/* No extra styles needed, grid and flex handled in template */
</style>

