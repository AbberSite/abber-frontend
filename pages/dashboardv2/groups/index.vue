<template>
  <DashboardTitle department="الحسابات" title="المجموعات" />
  <DashboardTablesTable :headItems="{ group: 'المجموعة', users: 'المستخدمين' }" :bodyItems="groups" :actions="{modify: true, remove: true}"/>

  <ClientOnly>
    <ModifyModal v-if="showModify" @close="showModify = false" title="تعديل المجموعة">
        <TextInput label="الاسم" />
        <TextInput label="الصلاحيات" />
    </ModifyModal>
  </ClientOnly>
</template>

<script setup lang="ts">
let showModify = ref(false);
const {$listen} = useNuxtApp();
$listen('table-modify-object', (data)=>{
    showModify.value = true;
})
const groups = ref([
    {group: 'موظف علاقات العملاءء', users: ['الشيخ']},
    {group: 'مدير علاقات العملاء', users: ['الشيخ']},
    {group: 'مدير التشغيل', users: ['الشيخ']},
    {group: 'مشرف مقالات', users: ['الشيخ']},
    {group: 'ادمن', users: ['الشيخ']},
])
</script>