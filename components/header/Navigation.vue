<template>
  <div class="hidden md:flex md:gap-x-12 2xl:text-lg">
    <NuxtLink class=" font-semibold" :to="{ name: 'index' }"> الرئيسية </NuxtLink>
    <NuxtLink class="font-semibold" :to="{ name: 'blog' }"> المدونة </NuxtLink>
    <NuxtLink class="font-semibold" v-if="['عميل','معبر'].includes(data?.user_type)" :to="{ name: 'orders' }"> الطلبات
    </NuxtLink>
    <NuxtLink class="font-semibold" :to="{ name: 'orders-make' }" v-if="!['معبر', 'إدارة'].includes(data?.user_type)"> فسر حلمك الان </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAuth();
</script>

<style scoped></style>