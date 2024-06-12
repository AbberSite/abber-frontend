<template>
  <div class="hidden md:flex md:gap-x-12 2xl:text-lg md:items-center">
    <NuxtLink class=" font-semibold" :to="{ name: 'index' }"> الرئيسية </NuxtLink>
    <NuxtLink class="font-semibold" :to="{ name: 'blog' }"> المدونة </NuxtLink>
    <NuxtLink class="font-semibold" v-if="'عميل' == data?.user_type" :to="{ name: 'packages-orders-packages' }"> الباقات </NuxtLink>
    <NuxtLink class="font-semibold" v-if="['عميل','معبر'].includes(data?.user_type)" :to="{ name: 'orders' }"> الطلبات </NuxtLink>
    <NuxtLink class="flex h-[45px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                    :to="{ name : 'orders-make'}" v-if="!['معبر', 'إدارة'].includes(data?.user_type)"> <span class="mt-1.5">فسر حلمك الان</span></NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAuth();
</script>

<style scoped></style>