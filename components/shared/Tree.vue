<template>
  <div class="flex justify-between gap-1 text-slate-800 pt-4">
    <NuxtLink v-for="(item, index) in breadcrumbItems" :key="index"
      class="flex justify-center items-center gap-2 hover:text-blue-500" :to="item.path">
      <span class="text-xs font-medium">{{ item.title }}</span>
      <svg v-if="index < breadcrumbItems.length - 1" height="10px" width="9px" viewBox="0 0 15 26"
        xmlns="http://www.w3.org/2000/svg">
        <polygon fill="#231F20"
          points="12.885,0.58 14.969,2.664 4.133,13.5 14.969,24.336 12.885,26.42 2.049,15.584 -0.035,13.5" />
      </svg>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const translations: Record<string, string> = {
  orders: 'الطلبات',
  support: 'الدعم'
};

const breadcrumbItems = computed(() => {
  const segments = route.fullPath.split('/').filter(segment => segment && !['video'].includes(segment));
  return [{"title":"الرئيسية","path":"/"}].concat(segments.map((segment, index) => {
    return {
      title: translations[segment] || segment,
      path: '/' + segments.slice(0, index + 1).join('/')
    };
  }));
});
console.log(breadcrumbItems)
</script>