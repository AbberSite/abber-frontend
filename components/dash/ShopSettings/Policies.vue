<template>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2" >
        <TextInput type="number" label="مدة إرسال تنبيه طلب متأخر إلى المعبر (ساعات):" />
        <TextInput type="number" label="تغيير الطلب المتأخر (ساعات):" />
        <TextInput type="number" label="مدة تأخير دور العميل (دقائق):" />
        <TextInput type="number" label="مدة تحويل حالة التحويل الطلبات المكتملة لتم الارسال (بالساعة):" />
        <TextInput type="number" label="عدد الايام لتحويل (حالة التحويل للخدمات المنفذة لمكتمل):"/>
        <TextInput type="number" label="مهلة إنهاء جلسة الفيديو بعد خروج المعبر (بالساعات):"/>
        <TextInput type="number" label="إكمال الطلبات الباشرة قيد التنفيذ المتأخرة في التسليم (بالساعة):"/>
        <TextInput type="number" label="إكمال الطلبات المتأخرة في الاستلام (بالساعة):"/>
        <TextInput type="number" label="الحد الأقصى لمدة التسجيل الصوتي (ثواني):"/>
    </div>
    <PrimaryButton class="my-2">حفظ</PrimaryButton>
</template>