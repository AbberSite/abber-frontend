<template>
  <Head>
        <Title>عبر - {{ titleComputed }}</Title>
    </Head>
    <SkeletonsTitle v-if="loading"/>
    <div class="relative -mt-2 pb-12" v-else>
    <p class="text-sm font-medium text-gray-600">{{ department }}</p>
    <p class="text-lg font-medium">{{ title }}</p>
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{department: string, title:string, loading?:boolean}>();
const titleComputed = computed(()=> {
  if(useRoute().path.includes('dashboardv2')){
    return `لوحة التحكم ${props.title == 'لوحة التحكم'? ``: `- ${props.title}`}`
  }
  return props.title;
})
</script>