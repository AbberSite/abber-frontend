<template>
  <DashboardTitle department="الطلبات" title="الكوبونات"/>

  <DashboardInputsSearch placeholder="ابحث عن كوبون" />
  <DashboardTablesTable
    :head-items="{
      first_name: 'المستخدم',
      public: 'عام',
      amount: 'المبلغ',
      code: 'الرمز',
      expireDate: 'تاريخ انتهاء الكوبون',
      orders: 'الطلبات',
    }"
    :bodyItems="coupons"
    :actions="{ modify: true, remove: true }"
  />
  <ClientOnly>
    <ModifyModal
      @close="showModify = false"
      v-if="showModify"
      :title="'تعديل الكوبون'"
    >
      <TextInput label="الرمز" />
      <TextInput label="مبلغ الخصم" />
      <DashboardDatePickerInput label="تاريخ البدء"/>
      <DashboardDatePickerInput label="تاريخ الإنتهاء"/>
      
      <div class="w-full space-y-3">
        <div class="flex items-center pt-1">
          <input
            class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
            type="checkbox"
            name="checkbox"
          />
          <label class="mt-1.5 ps-3 text-sm font-medium xs:text-base"
            >إستخدام أكثر من مرة</label
          >
        </div>
        
      </div>
      <CustomSelect
          class="w-full"
          label="المنصات المتاحة"
          :options="[
            { value: 'website', text: 'الموقع' },
            { value: 'android', text: 'تطبيق الاندرويد' },
            { value: 'ios', text: 'تطبيق الايفون' },
          ]" multi dialog
        />

      <PrimaryButton class="w-full mt-4">حفظ</PrimaryButton>
    </ModifyModal>
  </ClientOnly>
</template>
<script setup lang="ts">
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";
const datePicker = ref<DatePickerInstance>(null);
let showModify = ref(false);
const { $listen } = useNuxtApp();
$listen("table-modify-object", (data) => {
  showModify.value = true;
});
const coupons = ref([
  {
    first_name: "الشيخ",
    public: false,
    amount: "25%",
    code: "sldjf",
    expireDate: "2020-05-30 10:11",
    orders: 10,
  },
  {
    first_name: "المهندس",
    public: true,
    amount: "15%",
    code: "abcd",
    expireDate: "2021-07-20 14:30",
    orders: 5,
  },
  {
    first_name: "الدكتور",
    public: false,
    amount: "30%",
    code: "efgh",
    expireDate: "2022-12-25 09:00",
    orders: 8,
  },
  {
    first_name: "الأستاذ",
    public: true,
    amount: "10%",
    code: "ijkl",
    expireDate: "2023-03-15 16:45",
    orders: 0,
  },
]);
</script>
