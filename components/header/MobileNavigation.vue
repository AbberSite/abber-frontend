<template>
  <div class="pb-6">
    <div class="flex items-center justify-between">
      <a class="-m-1.5 p-1.5" href="/">
        <span class="sr-only">عبر</span>
        <img class="lazyload h-14 w-auto" src="/images/logo.webp" height="56" width="56" alt="" />
      </a>
      <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" aria-labelledby="menu close button" @click="$emit('close')">
        <span class="sr-only">إغلاق القائمة</span>

        <!-- Heroicon name: outline/x-mark -->
        <XMarkIcon class="h-7 w-7" />
      </button>
    </div>
    <div class="pt-10">
      <nav class="space-y-3">
        <NuxtLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50 cursor-pointer" @click="$emit('navigate', { name: 'index' })">
          <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <!-- Heroicon name: outline/home -->
            <HomeIcon class="h-6 w-6 flex-shrink-0" />
          </div>
          <span class="ms-6 font-medium">الرئيسية</span>
        </NuxtLink>

        <NuxtLink v-if="'عميل' == data?.user_type || status == 'unauthenticated'" class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50 cursor-pointer gap-1" @click="$emit('navigate', { name: 'packages-orders-packages' })">
          <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <RocketLaunchIcon class="h-6 w-6 flex-shrink-0" />
          </div>
          <span class="ms-6 font-medium">الباقات</span>
          <span class="text-white bg-red-500 px-2 py-2 rounded-full text-xs font-medium">جديد</span>
        </NuxtLink>

        <NuxtLink v-if="false" class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50 cursor-pointer" @click="$emit('navigate', { name: 'support' })">
          <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <!-- Heroicon name: outline/Lifebuoy -->
            <LifebuoyIcon class="h-6 w-6 flex-shrink-0" />
          </div>
          <span class="ms-6 font-medium">مركز الدعم</span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon, HomeIcon, RssIcon, LifebuoyIcon, RocketLaunchIcon } from "@heroicons/vue/24/outline";
const { data, status } = await useAuth();
</script>

<style lang="scss" scoped></style>
