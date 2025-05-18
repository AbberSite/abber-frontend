<template>
  <DashboardTitle department="الحسابات" title="المعبرون"/>
  <div class="w-full pt-8">
      <DashboardInputsSearch placeholder="ابحث عن معبر" />
      <DashboardTablesTable
        :head-items="{
          first_name: 'معبر',
          email: 'البريد الالكتروني',
          emailVerified: '',
          phone: 'الجوال',
          phoneVerified: '',
        }"
        :body-items="expressors"
        :actions="{ details: true, view: { path: '/expresssors/' } }"
      />
  </div>
  <ClientOnly>
    <ModifyModal @close="showModifyModal = false" v-if="showModifyModal">
      <Selector
        label="اختر الاجراء"
        :options="[
          { value: 'agree', text: 'الموافقة على طلب التعديل' },
          { value: 'disagree', text: 'رفض طلب المعبر' },
          { value: 'needEdit', text: 'طلب تعديل البيانات' },
        ]"
        v-model="selected"
      />
      <PrimaryButton class="w-full my-2">متابعة</PrimaryButton>
    </ModifyModal>
  </ClientOnly>
</template>

<script setup lang="ts">
const { $listen } = useNuxtApp();
let showModifyModal = ref(false);
$listen("table-modify-object", (data: object) => {
  showModifyModal.value = true;
});
const selected = ref("");
const expressors = [
  {
    first_name: "هيثم صالح",
    email: "lsdkjf@glk.co",
    emailVerified: false,
    phone: "00971554455",
    content: "لقد قمت بتحديث بيانات الخاصة بي",
    phoneVerified: true,
    id: 122,
  },
  {
    first_name: "هيثم صالح",
    email: "lsdkjf@glk.co",
    emailVerified: false,
    phone: "00971554455",
    content: "لقد قمت بتحديث بيانات الخاصة بي",
    phoneVerified: true,
    id: 123,
  },
  {
    first_name: "هيثم صالح",
    email: "lsdkjf@glk.co",
    emailVerified: false,
    phone: "00971554455",
    content: "لقد قمت بتحديث بيانات الخاصة بي",
    phoneVerified: true,
    id: 55,
  },
  {
    first_name: "هيثم صالح",
    email: "lsdkjf@glk.co",
    emailVerified: false,
    phone: "00971554455",
    content: "لقد قمت بتحديث بيانات الخاصة بي",
    phoneVerified: true,
    id: 45,
  },
  {
    first_name: "هيثم صالح",
    email: "lsdkjf@glk.co",
    emailVerified: false,
    phone: "00971554455",
    content: "لقد قمت بتحديث بيانات الخاصة بي",
    phoneVerified: true,
    id: 45,
  },
];
</script>
