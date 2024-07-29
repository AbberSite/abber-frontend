<template>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <TextInput label="اسم الموقع:"/> 
        <TextInput label="البريد الالكتروني للموقع:" />
        <LazyPhoneInput mobile/> 
        <TextInput label="عنوان الموقع:" />
<TextInput type="textarea" label="وصف الموقع:" /> 
        <TextInput type="textarea" label="الكلمات المفتاحية:" />
<TextInput type="textarea" label="اكواد اضافية(head):" /> 
        <TextInput type="textarea" label="اكواد اضافية(body):" />
<TextInput type="file" label="لوجو الموقع:" /> 
        <TextInput label="IP الموقع" />
 <TextInput  label="رابط تضمين إحصائيات جوجل:" /> 
        <TextInput label="من نحن" />
    </div>
    <PrimaryButton class="my-2">حفظ</PrimaryButton>
</template>

