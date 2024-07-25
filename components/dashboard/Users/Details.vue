<template>
    <div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 py-5">
            <div class="flex justify-between items-center">
                <p class="font-medium">تاريخ التسجيل</p>
                <h2>يوليو 5, 2024, 1:03 م</h2>
            </div>
            <div class="flex justify-between items-center">
                <p class="font-medium">أخر دخول</p>
                <h2>يوليو 5, 2024, 1:03 م</h2>
            </div>
        </div>
        <div :class="$style.input_elements">
            <TextInput label="إسم المستخدم:" />
            <TextInput label="البريد الالكتروني:" />
        </div>
        <div :class="$style.input_elements">
            <TextInput label="الاسم:" />
            <PhoneInput mobile />
        </div>
        <div :class="$style.input_elements">
            <Selector label="نوع العضوية" :options="[{ value: 'عميل' }, { value: 'معبر' }, { value: 'إدارة' }]"
                :modelValue="'عميل'" />
            <TextInput label="الرصيح المتاح:" />
        </div>
        <div :class="$style.input_elements">
            <TextInput label="الرصيد القابل للسحب:" />
            <TextInput label="الرصيد المعلق:" />
        </div>
        <div :class="$style.input_elements">
            <TextInput label="رقم IBAN:" />
            <Selector label="الجنس" :options="[{ value: 'ذكر' }, { value: 'انثى' }]" :modelValue="'ذكر'" />
        </div>
        <div :class="$style.input_elements">
            <DashboardDatePickerInput label="تاريخ الميلاد" />
            <TextInput label="الصورة" :type="'file'"/>
        </div>

        <div class="flex items-center  gap-1">
            <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" id="isActive" checked />
            <label class="mt-1.5 ps-3 font-semibold" for="isActive">نشط</label>
        </div>
        <div class="flex items-center justify-between pt-6">
            <PrimaryButton >حفظ</PrimaryButton>
            <PrimaryButton >إضافة طلب</PrimaryButton>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style module>
.input_elements {
    @apply flex flex-col sm:flex-row justify-between items-start gap-x-5 my-2;
}
</style>
