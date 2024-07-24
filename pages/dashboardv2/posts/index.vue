<template>
  <DashTitle department="الحسابات" title="المقالات"/>
  <DashTab :tabs="[{name: 'المقالات', value: 'posts'}, {name: 'التصنيفات', value: 'categories'}]" v-model:model-value="currentTab"/>
  <div class="pt-2">
    <template v-if="currentTab == 'posts'">
      <DashPosts/>
    </template>
    <template v-else >
      <DashPostsCategories/>
    </template>
  </div>
</template>

<script setup lang="ts">
const currentTab = ref('posts'); 


</script>
