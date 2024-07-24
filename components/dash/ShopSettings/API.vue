<template>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2" >
        <TextInput label="Twilio id:"/>
        <TextInput label="Twilio token:"/>
        <TextInput label="Twilio number:"/>
        <TextInput label="Twilio messaging service sid:"/>
        <TextInput label="Access token:"/>
        <TextInput label="EntityId mada:"/>
        <TextInput label="EntityId visa master:"/>
        <TextInput label="Test access token:"/>
        <TextInput label="Test entityId mada:"/>
        <TextInput label="Test entityId apple pay:"/>
        <TextInput label="EntityId apple pay:"/>
        <TextInput label="Test entityId visa master:"/>
        <TextInput label="Aws access key id:"/>
        <TextInput label="Aws secret access key:"/>
        <TextInput label="Bucket name:"/>
        <Selector multiple label="Active payment methods">
            <optgroup label="الموقع">
                <option value="apple pay">ابل باي</option>
                <option value="mada">مدى كارد</option>
                <option value="visa">فيزا كارد</option>
                <option value="master">ماستر كارد</option>
                <option value="stcPay">اس تي سي باي</option>
                <option value="wallet">المحفظة</option>
                <option value="in_app_pruchase">in_app_pruchase</option>
                <option value="CARD">CARD</option>
            </optgroup>
            <optgroup label="تطبيق الاندرويد">
                <option value="apple pay">ابل باي</option>
                <option value="mada">مدى كارد</option>
                <option value="visa">فيزا كارد</option>
                <option value="master">ماستر كارد</option>
                <option value="stcPay">اس تي سي باي</option>
                <option value="wallet">المحفظة</option>
                <option value="in_app_pruchase">in_app_pruchase</option>
                <option value="CARD">CARD</option>
            </optgroup>
            <optgroup label="تطبيق الايفون">
                <option value="apple pay">ابل باي</option>
                <option value="mada">مدى كارد</option>
                <option value="visa">فيزا كارد</option>
                <option value="master">ماستر كارد</option>
                <option value="stcPay">اس تي سي باي</option>
                <option value="wallet">المحفظة</option>
                <option value="in_app_pruchase">in_app_pruchase</option>
                <option value="CARD">CARD</option>
            </optgroup>
        </Selector>
        <Checkbox label="وضع الدفع التجريبي:"/>
        <TextInput type="file" label="التحقق من ابل:"/>
        <Selector multiple label="Active login methods">
            <optgroup label="الموقع">
                <option value="apple pay">ابل </option>
                <option value="mada">جوجل</option>
                <option value="visa">رقم الجوال</option>
                <option value="master">الواتساب</option>
                <option value="stcPay">زائر</option>
            </optgroup>
            <optgroup label="تطبيق الاندرويد">
                <option value="apple pay">ابل </option>
                <option value="mada">جوجل</option>
                <option value="visa">رقم الجوال</option>
                <option value="master">الواتساب</option>
                <option value="stcPay">زائر</option>
            </optgroup>
            <optgroup label="تطبيق الايفون">
                <option value="apple pay">ابل </option>
                <option value="mada">جوجل</option>
                <option value="visa">رقم الجوال</option>
                <option value="master">الواتساب</option>
                <option value="stcPay">زائر</option>
            </optgroup>
        </Selector>
        <Selector label="تفعيل الكوبون" multiple>
            <option value="site">الموقع</option>
                <option value="android">تطبيق الاندرويد</option>
                <option value="ios">تطبيق الايفون</option>
        </Selector>
        <TextInput label="Our SMS token:"/>
    </div>
    <PrimaryButton class="my-2" >حفظ</PrimaryButton>
</template>