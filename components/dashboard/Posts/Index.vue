<template>
  <DashboardInputsSearch placeholder="بحث عن مقال" />
  <DashboardTablesTable
    :head-items="{
      username: 'المستخدم',
      title: 'عنوان المقال',
      pushed: 'مقبولة',
    }"
    :body-items="posts"
    :actions="{ modify: true, remove: true, view: { path: '/blog/' } }"
    addButton
  />
  <ClientOnly>
    <ModifyModal
      v-if="showModify"
      @close="showModify = false"
      :title="modifyTitle"
    >
      <template v-if="modifyTitle != 'تعديل التصنيف'">
        <TextInput label="عنوان المقال" />
        <TextInput label="رابط المقال" />
        <TextInput label="صورة المقال" :type="'file'" />
        <DashboardDatePickerInput label="تاريخ النشر" />
        <TextInput label="وصف المقال" />
        <Selector
          :options="[{ value: 'one', text: 'حلم مبرمج' }]"
          label="التصنيف"
        />
        <Checkbox
          label="هل المقال نشط؟"
          :value="false"
          v-model:model-value="showModify"
          class="my-2"
        />
        <ClientOnly><Editor v-model="postContent" /></ClientOnly>
        <PrimaryButton class="w-full my-2">نشر المقال</PrimaryButton>
      </template>
    </ModifyModal>
  </ClientOnly>
</template>
<script setup lang="ts">
const { $listen } = useNuxtApp();
const showModify = ref(false);
let modifyTitle = ref("");
const postContent = ref("");
const posts = ref([
  {
    cateTitle: "صنفي المفضل",
    username: "الشيخ المختار",
    title: "لكل امرإ من دهره ما  تعودى",
    pushed: true,
  },
  {
    cateTitle: "صنفي المفضل",
    username: "الشيخ المختار",
    title: "لكل امرإ من دهره ما  تعودى",
    pushed: false,
  },
  {
    cateTitle: "صنفي المفضل",
    username: "الشيخ المختار",
    title: "لكل امرإ من دهره ما  تعودى",
    pushed: false,
  },
  {
    cateTitle: "صنفي المفضل",
    username: "الشيخ المختار",
    title: "لكل امرإ من دهره ما  تعودى",
    pushed: true,
  },
  {
    cateTitle: "صنفي المفضل",
    username: "الشيخ المختار",
    title: "لكل امرإ من دهره ما  تعودى",
    pushed: false,
  },
  {
    cateTitle: "صنفي المفضل",
    username: "الشيخ المختار",
    title: "لكل امرإ من دهره ما  تعودى",
    pushed: true,
  },
]);
$listen("table-modify-object", (data) => {
  showModify.value = true;
  modifyTitle.value = "تعديل المقال";
});
provide("pathProperty", "username");
$listen("open_add_window", () => {
  showModify.value = true;
  modifyTitle.value = "إنشاء مقال جديد";
});
</script>
