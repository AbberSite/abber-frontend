<template>
  <TransitionRoot as="template">
    <div class="fixed inset-0 z-30 sm:hidden">
      <!-- Overlay -->

      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm w-full" @click="$emit('close')"></div>
      </TransitionChild>

      <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="translate-y-full" enter-to="translate-y-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-y-0" leave-to="translate-y-full" as="template">
        <div class="bottom-0 fixed z-40 max-h-[400px] w-full overflow-y-auto rounded-t-2xl border-t border-gray-100 bg-white px-6 py-6">
          <button class="mx-auto block h-1 w-8 rounded-lg bg-gray-300" type="button" @click="$emit('close')"></button>
          <nav class="pt-6">
            <NuxtLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50" :to="{ name: 'profile-change-password' }">
              <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <!-- Heroicon name: outline/home -->
                <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                </svg>
              </div>
              <span class="ms-6 font-medium">تغيير كلمة المرور</span>
            </NuxtLink>
              <NuxtLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50" :to="{ name: 'profile-pin' }">
              <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <!-- Heroicon name: outline/home -->
                <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>
              </div>
              <span class="ms-6 font-medium">تغيير رمز الوصول السريع</span>
            </NuxtLink>
            <a class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50" href="#" @click.prevent="logout">
              <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <!-- Heroicon name: outline/home -->
                <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"></path>
                </svg>
              </div>
              <span class="ms-6 font-medium">تسجيل الحروج</span>
            </a>
            <NuxtLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50" :to="{ name: 'profile-delete' }">
              <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <!-- Heroicon name: outline/home -->
                <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                </svg>
              </div>
              <span class="ms-6 font-medium">حذف الحساب</span>
            </NuxtLink>
          </nav>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from "@headlessui/vue";

async function logout() {
  await useLogout();
}
</script>

<style scoped></style>
