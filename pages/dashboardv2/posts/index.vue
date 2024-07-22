<template>
  <div class="relative -mt-2 pb-12">
    <p class="text-sm font-medium text-gray-800">الحسابات</p>
    <p class="text-lg font-semibold">المقالات</p>
  </div>
  <DashboardTab :tabs="[{name: 'المقالات', value: 'posts'}, {name: 'التصنيفات', value: 'categories'}]" v-model:model-value="currentTab"/>
  <div class="pt-2">
    <template v-if="currentTab == 'posts'">
        <DashboardTablesTable :head-items="{ username: 'المستخدم', title: 'عنوان المقال', pushed: 'مقبولة' }" :body-items="posts" :actions="{ modify: true, remove: true, view: {path: '/blog/'}}" addButton/>
    </template>
    <template v-else >
        <DashboardTablesTable :head-items="{ cateTitle: 'اسم التصنيف' }" :body-items="posts" :actions="{ modify: true, remove: true, view: {path: '/blog/'}}"/>
    </template>
  </div>
  <ClientOnly>
    <ModifyModal v-if="showModify" @close="showModify = false;" title="تعديل المقال">
        <TextInput label="عنوان المقال" />
        <TextInput label="رابط المقال" />
        <TextInput label="صورة المقال" :type="'file'" />
        <DashboardDatePickerInput label="تاريخ النشر"/>
        <TextInput label="وصف المقال" />
        <Selector :options="[ {value: 'one', text: 'حلم مبرمج'} ]" label="التصنيف" />
        <Checkbox label="هل المقال نشط؟" :value="false" v-model:model-value="showModify" class="my-2" />
        <textarea contenteditable="true"></textarea>
    </ModifyModal>
  </ClientOnly>
</template>

<script setup lang="ts">
const {$listen} = useNuxtApp();
const currentTab = ref('posts'); 
const showModify = ref(false);

$listen('table-modify-object', (data)=> {
    showModify.value = true;
});
$listen('open_add_window', ()=> showModify.value = true)
const posts = ref([
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: true},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: false},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: false},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: true},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: false},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: true},
])
</script>
