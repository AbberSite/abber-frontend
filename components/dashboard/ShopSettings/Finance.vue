<template>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <TextInput type="number" label="الضريبة:"/>
        <TextInput type="number" label="خصم على الفواتير الإلكترونية:"/>
        <TextInput type="number" label="عمولة الدومين (بالريال):"/>
        <TextInput type="number" label="سعر صرف (الدولار) مقابل (الريال):"/>
        <TextInput type="number" label="الحد الاقصى لسحب الرصيد:"/>
        <TextInput type="number" label="الحد الادنى لسعر الخدمة:"/>
        <TextInput type="number" label="الحد الاقصى لسعر الخدمة:"/>
        <TextInput type="number" label="رسوم سحب الرصيد:"/>
        <TextInput type="number" label="سعر الطلب الافتراضي:"/>
        <TextInput type="number" label="رسوم المعبر للطلب المستعجل:"/>
        <TextInput type="number" label="ربح الاحالة:"/>
    </div>
    <PrimaryButton class="my-2">حفظ</PrimaryButton>
</template>