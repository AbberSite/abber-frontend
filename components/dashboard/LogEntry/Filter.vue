<template>
  <CustomSelect label="نوع المحتوى" v-model="logs_filters.content_type" :options="content_types" default-label="الكل" />
  <CustomSelect
    label="نوع الإجراء"
    :options="[
      { value: '1', text: 'إضافة' },
      { value: '2', text: 'تعديل' },
      { value: '3', text: 'حذف' },
    ]"
    default-label="كل" v-model="logs_filters.action_flag"
  />
</template>

<script setup lang="ts">
import CustomSelect from "~/components/shared/CustomSelect.vue";
import { useDashboardUsersStore } from "~/stores/dashboard/dashboardUsers";
const { content_types, logs_filters } = storeToRefs(useDashboardUsersStore());
content_types.value = [
  { value: "1", text: "admin | مدخلة سجلات" },
  { value: "2", text: "auth | الصلاحية" },
  { value: "3", text: "auth | مجموعة" },
  { value: "4", text: "contenttypes | نوع المحتوى" },
  { value: "5", text: "sessions | جلسة" },
  { value: "6", text: "sites | موقع" },
  { value: "7", text: "flatpages | صفحة مسطحة" },
  { value: "8", text: "account | عنوان بريد إلكتروني" },
  { value: "9", text: "account | تأكيد البريد الإلكتروني" },
  { value: "10", text: "socialaccount | حساب تواصل اجتماعي" },
  { value: "11", text: "socialaccount | تطبيق اجتماعي" },
  { value: "12", text: "socialaccount | social application token" },
  { value: "13", text: "authtoken | الرمز" },
  { value: "14", text: "authtoken | token" },
  { value: "15", text: "taggit | الوسم" },
  { value: "16", text: "taggit | العنصر الموسوم" },
  { value: "17", text: "accounts | المستخدم" },
  { value: "18", text: "accounts | دور" },
  { value: "19", text: "accounts | صورة المستخدم" },
  { value: "20", text: "accounts | الملف الشخصي" },
  { value: "21", text: "custom_account | user phone" },
  { value: "22", text: "custom_account | phone confirmation" },
  { value: "23", text: "blog | مقال" },
  { value: "24", text: "support | مشكلة" },
  { value: "25", text: "support | تذكرة المساعدة" },
  { value: "26", text: "expressors | حساب معبر" },
  { value: "27", text: "expressors | Expressor domain" },
  { value: "28", text: "packages | الخاصية" },
  { value: "29", text: "packages | باقة" },
  { value: "30", text: "packages | اشتراك" },
  { value: "31", text: "chat | Chat File" },
  { value: "32", text: "videomeeting" },
  { value: "33", text: "chat | رسالة" },
  { value: "34", text: "coupons | كود الخصم" },
  { value: "35", text: "services | التصنيف" },
  { value: "36", text: "services | الخدمات" },
  { value: "37", text: "services | أسعار الخدمة" },
  { value: "38", text: "services | تقييم" },
  { value: "39", text: "services | عرض" },
  { value: "40", text: "orders | بيانات الطلب المالي" },
  { value: "41", text: "orders | بيانات أوقات الطلب" },
  { value: "42", text: "orders | الطلب" },
  { value: "43", text: "wallets | طلب سحب الرصيد" },
  { value: "44", text: "wallets | البطاقات الإئتمانية" },
  { value: "45", text: "wallets | المحفظة" },
  { value: "46", text: "wallets | العمليات المالية" },
  { value: "47", text: "wallets | charge" },
  { value: "48", text: "pages | ايقونة" },
  { value: "49", text: "settings | اعداد API" },
  { value: "50", text: "settings | الإعدادات المالية" },
  { value: "51", text: "settings | الإعدادات العامة" },
  { value: "52", text: "settings | اعدادات التنبيهات" },
  { value: "53", text: "settings | اعدادات السياسات" },
  { value: "54", text: "settings | اعدادات التواصل" },
  { value: "55", text: "settings | إعدادات الموقع" },
  { value: "56", text: "alerts | تنبيه" },
  { value: "57", text: "alerts | اشعار" },
  { value: "58", text: "alerts | رسالة" },
  { value: "59", text: "tracking | user visit" },
  { value: "60", text: "tracking | object change tracker" },
  { value: "61", text: "apikey" },
  { value: "62", text: "dashboard | ادارة" },
  { value: "63", text: "bills | فاتورة" },
  { value: "64", text: "accounts | custom user password history" },
  { value: "65", text: "blog | تصنيف" },
  { value: "66", text: "meetings | Video Session" },
  { value: "67", text: "meetings | video meeting" },
  { value: "68", text: "settings | إعدادات رسوم وسائل الدفع" },
  { value: "69", text: "services | Text Service Capacity" },
  { value: "70", text: "wallets | سجل الرصيد" },
  { value: "71", text: "zoom | zoom account" },
  { value: "72", text: "wallets | عملية علي الرصيد" },
  { value: "73", text: "support | faq" },
  { value: "74", text: "api_key | api key" },
  { value: "75", text: "fcm_django | FCM device" },
  { value: "76", text: "guests | guest profile" },
  { value: "77", text: "support | User note" },
  { value: "78", text: "reviews | platform feedback" },
  { value: "79", text: "whatsapp_chat | conversation" },
  { value: "80", text: "whatsapp_chat | message" },
  { value: "81", text: "whatsapp_chat | ميديا" },
  { value: "82", text: "orders | cart" },
  { value: "83", text: "packages | باقة الطلبات" },
  { value: "84", text: "packages | Membership" },
  { value: "85", text: "orders | Dream Info" },
  { value: "86", text: "referrals | referral code" },
  { value: "87", text: "custom_account | user pin" },
  { value: "88", text: "advertisements | slider" },
  { value: "89", text: "alerts | FCM device" },
  { value: "90", text: "services | urgent service stock" },
  { value: "91", text: "expressors | work hour" },
  { value: "92", text: "expressors | work hour split" },
  { value: "93", text: "settings | إعدادات التطوير" },
  { value: "94", text: "settings | services settings" }
];

</script>

<style scoped>
/* Add your styles here if necessary */
</style>
