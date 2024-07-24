<template>
    <DashTablesTable :head-items="{ cateTitle: 'اسم التصنيف' }" :body-items="posts" :actions="{ modify: true, remove: true}"/>
    <ClientOnly>
        <ModifyModal @close="showModify = false" v-if="showModify" title="تعديل التصنيف">
            <TextInput label="إسم التصنيف"/>
            <PrimaryButton class="my-2 w-full">حفظ</PrimaryButton>
        </ModifyModal>
    </ClientOnly>
</template>

<script setup lang="ts" >
const {$listen} = useNuxtApp();
const showModify = ref(false);
const posts = ref([
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: true},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: false},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: false},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: true},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: false},
    {cateTitle: 'صنفي المفضل', username: 'الشيخ المختار', title: 'لكل امرإ من دهره ما  تعودى', pushed: true},
]);
$listen('table-modify-object', (data)=> {
    showModify.value = true;
});
</script>