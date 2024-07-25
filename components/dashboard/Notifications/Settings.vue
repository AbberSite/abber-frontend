<template>
    <div class="flex flex-col gap-2">
        <div>
            <label for="buyer">Buyer sms send</label>
            <Checkbox label="جديد"/>
            <Checkbox label="مقبولة"/>
            <Checkbox label="بإنتظار الاستلام"/>
            <Checkbox label="مرفوضة"/>
            <Checkbox label="قيد التقدم"/>
            <Checkbox label="تم رفض طلب الالغاء"/>
            <Checkbox label="مكتمل"/>
            <Checkbox label="الموافقة على طلب الالغاء"/>
            <Checkbox label="في انتظار الالغاء"/>
            <Checkbox label="طلب اعادة التنفيذ"/>
            <Checkbox label="تنبيه المعبر للطلب "/>
            <Checkbox label="إلغاءالموعد"/>
            <Checkbox label="موعد (من قبل العميل)"/>
            <Checkbox label="موعد (من قبل المعبر)"/>
            <Checkbox label="طلب متاخر"/>
            <Checkbox label="مقابلة"/>
            <Checkbox label="فاتورة"/>
            <Checkbox label="دفع فاتورة"/>
            <Checkbox label="تأكيد البريد الالكتروني"/>
            <Checkbox label="استعادة كلمة السر"/>
            <Checkbox label="اعادة فتح الطلب"/>
            <Checkbox label="تأكيد طلب متاخر"/>
        </div>
        <div>
            <label for="buyer">Buyer email send</label>
            <Checkbox label="جديد"/>
            <Checkbox label="مقبولة"/>
            <Checkbox label="بإنتظار الاستلام"/>
            <Checkbox label="مرفوضة"/>
            <Checkbox label="قيد التقدم"/>
            <Checkbox label="تم رفض طلب الالغاء"/>
            <Checkbox label="مكتمل"/>
            <Checkbox label="الموافقة على طلب الالغاء"/>
            <Checkbox label="في انتظار الالغاء"/>
            <Checkbox label="طلب اعادة التنفيذ"/>
            <Checkbox label="تنبيه المعبر للطلب "/>
            <Checkbox label="إلغاءالموعد"/>
            <Checkbox label="موعد (من قبل العميل)"/>
            <Checkbox label="موعد (من قبل المعبر)"/>
            <Checkbox label="طلب متاخر"/>
            <Checkbox label="مقابلة"/>
            <Checkbox label="فاتورة"/>
            <Checkbox label="دفع فاتورة"/>
            <Checkbox label="تأكيد البريد الالكتروني"/>
            <Checkbox label="استعادة كلمة السر"/>
            <Checkbox label="اعادة فتح الطلب"/>
            <Checkbox label="تأكيد طلب متاخر"/>
        </div>
        <div>
            <label for="buyer">Seller sms send</label>
            <Checkbox label="جديد"/>
            <Checkbox label="مقبولة"/>
            <Checkbox label="بإنتظار الاستلام"/>
            <Checkbox label="مرفوضة"/>
            <Checkbox label="قيد التقدم"/>
            <Checkbox label="تم رفض طلب الالغاء"/>
            <Checkbox label="مكتمل"/>
            <Checkbox label="الموافقة على طلب الالغاء"/>
            <Checkbox label="في انتظار الالغاء"/>
            <Checkbox label="طلب اعادة التنفيذ"/>
            <Checkbox label="تنبيه المعبر للطلب "/>
            <Checkbox label="إلغاءالموعد"/>
            <Checkbox label="موعد (من قبل العميل)"/>
            <Checkbox label="موعد (من قبل المعبر)"/>
            <Checkbox label="طلب متاخر"/>
            <Checkbox label="مقابلة"/>
            <Checkbox label="فاتورة"/>
            <Checkbox label="دفع فاتورة"/>
            <Checkbox label="تأكيد البريد الالكتروني"/>
            <Checkbox label="استعادة كلمة السر"/>
            <Checkbox label="اعادة فتح الطلب"/>
            <Checkbox label="تأكيد طلب متاخر"/>
        </div>
        <div>
            <label for="buyer">Seller email send</label>
            <Checkbox label="جديد"/>
            <Checkbox label="مقبولة"/>
            <Checkbox label="بإنتظار الاستلام"/>
            <Checkbox label="مرفوضة"/>
            <Checkbox label="قيد التقدم"/>
            <Checkbox label="تم رفض طلب الالغاء"/>
            <Checkbox label="مكتمل"/>
            <Checkbox label="الموافقة على طلب الالغاء"/>
            <Checkbox label="في انتظار الالغاء"/>
            <Checkbox label="طلب اعادة التنفيذ"/>
            <Checkbox label="تنبيه المعبر للطلب "/>
            <Checkbox label="إلغاءالموعد"/>
            <Checkbox label="موعد (من قبل العميل)"/>
            <Checkbox label="موعد (من قبل المعبر)"/>
            <Checkbox label="طلب متاخر"/>
            <Checkbox label="مقابلة"/>
            <Checkbox label="فاتورة"/>
            <Checkbox label="دفع فاتورة"/>
            <Checkbox label="تأكيد البريد الالكتروني"/>
            <Checkbox label="استعادة كلمة السر"/>
            <Checkbox label="اعادة فتح الطلب"/>
            <Checkbox label="تأكيد طلب متاخر"/>
        </div>

        <TextInput type="textarea" label="قالب الايميل" />
        <PrimaryButton class="w-fit" >حفظ</PrimaryButton>
    </div>
</template>

<style scoped>
label {
    @apply font-semibold text-lg;
}
</style>