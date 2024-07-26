<template>
  <DashboardTitle department="الحسابات" title="المقالات"/>
  <Tabs :tabs="[{name: 'المقالات', value: 'posts'}, {name: 'التصنيفات', value: 'categories'}]" v-model:model-value="currentTab"/>
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
