<template>
  <div class="hidden md:flex md:gap-x-12 2xl:text-lg md:items-center">
    <NuxtLink class="font-medium" :to="{ name: 'index' }"> الرئيسية </NuxtLink>
    <NuxtLink class="font-medium" :to="{ name: 'blog' }"> المدونة </NuxtLink>
    <NuxtLink class="font-medium flex items-start gap-1" v-if="'عميل' == data?.user_type || status == 'unauthenticated'" :to="{ name: 'packages-orders-packages' }">
      <span>الباقات</span>
      <span class="text-white bg-red-500 px-2 py-2 rounded-full text-xs">جديد</span>
    </NuxtLink>
    <NuxtLink class="font-medium" v-if="['عميل', 'معبر'].includes(data?.user_type)" :to="{ name: 'orders' }"> الطلبات </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { data, status } = await useAuth();
</script>

<style scoped></style>
