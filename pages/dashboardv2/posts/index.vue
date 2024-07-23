<template>
  <div class="relative -mt-2 pb-12">
    <p class="text-sm font-medium text-gray-800">الحسابات</p>
    <p class="text-lg font-semibold">المقالات</p>
  </div>
  <DashboardTab :tabs="[{name: 'المقالات', value: 'posts'}, {name: 'التصنيفات', value: 'categories'}]" v-model:model-value="currentTab"/>
  <div class="pt-2">
    <template v-if="currentTab == 'posts'">
      <DashboardPosts/>
    </template>
    <template v-else >
      <DashboardPostsCategories/>
    </template>
  </div>
</template>

<script setup lang="ts">
const currentTab = ref('posts'); 


</script>
