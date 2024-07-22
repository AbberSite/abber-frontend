<template>
    <div class="relative -mt-2 pb-12">
    <p class="text-sm font-medium text-gray-800">الحسابات</p>
    <p class="text-lg font-semibold">المجموعات</p>
  </div>
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