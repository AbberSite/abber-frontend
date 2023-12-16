<template>
  <header class="absolute inset-x-0 top-0 z-30 mx-auto max-w-7xl">
    <nav class="flex items-center justify-between px-4 py-6 xs:px-6 md:px-8" aria-label="Global">
      <div class="flex md:flex-1">
        <a class="-m-1.5 p-1.5" href="/">
          <img class="h-14 w-auto" src="../../assets/images/logo.webp" height="56" width="56" alt="عبر" />
        </a>
      </div>
      <div class="flex items-center md:hidden">

          <!-- Notification Button -->
        <button v-if="status = 'authenticated'" class="relative me-3 rounded-full p-1 text-gray-700 hover:text-gray-900 focus:outline-none" type="button" @click="profileDropdown = true">
          
          <span class="sr-only">عرض الاشعارات</span>
          <!-- Heroicon name: outline/bell -->
          <svg height="27" width="27" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
          </svg>

          <!-- Show when user have unread notifications -->
          <span class="absolute top-[3px] h-[9px] w-[9px] rounded-full border border-white bg-red-600 ltr:left-2 rtl:right-2">
            <span class="absolute right-0 inline-flex h-full w-full flex-shrink-0 animate-ping rounded-full bg-red-600 opacity-80"></span>
          </span>

        </button>

        <!-- Menu Button -->
        <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" @click="openDropdown = true">
          <span class="sr-only">فتح القائمة الرئيسية</span>
          <svg height="34" width="34" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
          </svg>
        </button>
      </div>
      <div class="hidden md:flex md:gap-x-12 2xl:text-lg">
        <RouterLink class="font-semibold" :to="{ name: 'index' }">
          الرئيسية
        </RouterLink>
        <RouterLink class="font-semibold" :to="{ name: 'blog' }">
          المدونة
        </RouterLink>
        <RouterLink class="font-semibold" :to="{ name: 'index' }">
          مركز الدعم
        </RouterLink>
        <a href="/"></a>
      </div>

      <div v-if="status == 'authenticated'" class="hidden md:flex md:flex-1 md:justify-end">
        <div class="flex items-center">
          <!-- Notification Button -->
          <button class="relative rounded-full p-1 text-gray-700 hover:text-gray-900 focus:outline-none" type="button" @click="notificationDropdown = true">
            <span class="sr-only">عرض الاشعارات</span>
            <!-- Heroicon name: outline/bell -->
            <svg height="28" width="28" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
            </svg>

            <!-- Show when user have unread notifications -->
            <span class="absolute top-[3px] h-[9px] w-[9px] rounded-full border border-white bg-red-600 ltr:left-2 rtl:right-2">
              <span class="absolute right-0 inline-flex h-full w-full flex-shrink-0 animate-ping rounded-full bg-red-600 opacity-80"></span>
            </span>
          </button>
          <!-- Profile dropdown -->
          <div class="relative ms-3">
            <button class="rounded-full bg-white focus:outline-none" type="button" @click="profileDropdown = true" aria-expanded="false" aria-haspopup="true">
              <span class="sr-only">فتح قائمة المستخدم</span>
              <img class="h-10 w-10 rounded-full" :src="data.image_url" height="40" width="40" alt="" />
            </button>
            <div class="absolute top-[calc(100%+10px)] w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0" v-if="profileDropdown" v-on-click-outside="() => profileDropdown = false"  role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900" href="#" role="menuitem" tabindex="-1">الملف الشخصي</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900" href="#" role="menuitem" tabindex="-1">الإعدادات</a>
              <a @click.prevent="signOut({callbackUrl : '/accounts/login', redirect : true})" class="block px-4 pb-1.5 pt-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900" role="menuitem" tabindex="-1">تسجيل الخروج</a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="hidden md:flex md:flex-1 md:justify-end 2xl:text-lg">
        <!-- Login Link -->
        <NuxtLink class="font-semibold" :to="{ name: 'accounts-login' }">
          تسجيل الدخول<span aria-hidden="true">←</span>
        </NuxtLink>
        <!-- <a class="font-semibold" href="/accounts/login"></a> -->
      </div>

      <div class="fixed inset-0 divide-y-2 divide-gray-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 md:absolute md:inset-auto md:top-[84px] md:w-[340px] md:rounded-md ltr:md:right-20 rtl:md:left-20" v-if="notificationDropdown" v-on-click-outside="() => notificationDropdown = false">
        <div class="flex items-center justify-between px-6 py-8 md:hidden">
          <h2 class="text-lg font-semibold xs:text-xl">الإشعارات</h2>
          <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" @click="notificationDropdown = false">
            <span class="sr-only">إغلاق القائمة</span>
            <!-- Heroicon name: outline/x-mark -->
            <svg height="26" width="26" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- Show when founded notifications list -->
        <ul class="is-scroll max-h-[400px] divide-y divide-gray-100 overflow-y-auto">
          <li class="bg-gray-50">
            <a class="flex flex-col px-6 py-8 md:py-6" href="#">
              <div class="flex items-start justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10" src="/assets/images/avatar.webp" height="" width="" alt="صورة المستخدم" />
                  </div>
                  <div class="ms-3 flex flex-col">
                    <div class="text-sm font-semibold">عبدالله النعيمي</div>
                    <div class="text-xs font-medium text-gray-600">مدير</div>
                  </div>
                </div>
                <time class="text-xs text-gray-600" datetime="2023-11-07">1 أسبوع، 5 أيام</time>
              </div>
              <p class="pt-6 text-justify text-sm text-gray-800 md:pt-4">تم الموافقه علي طلب سلمان حسن واصبح معبر</p>
            </a>
          </li>
          <li class="bg-gray-50">
            <a class="flex flex-col px-6 py-8 md:py-6" href="#">
              <div class="flex items-start justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10" src="/assets/images/avatar.webp" height="" width="" alt="صورة المستخدم" />
                  </div>
                  <div class="ms-3 flex flex-col">
                    <div class="text-sm font-semibold">عبدالله النعيمي</div>
                    <div class="text-xs font-medium text-gray-600">مدير</div>
                  </div>
                </div>
                <time class="text-xs text-gray-600" datetime="2023-11-07">1 أسبوع، 5 أيام</time>
              </div>
              <p class="pt-6 text-justify text-sm text-gray-800 md:pt-4">تم الموافقه علي طلب سلمان حسن واصبح معبر</p>
            </a>
          </li>
          <li class="hover:bg-gray-50">
            <a class="flex flex-col px-6 py-8 md:py-6" href="#">
              <div class="flex items-start justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10" src="/assets/images/avatar.webp" height="" width="" alt="صورة المستخدم" />
                  </div>
                  <div class="ms-3 flex flex-col">
                    <div class="text-sm font-semibold">عبدالله النعيمي</div>
                    <div class="text-xs font-medium text-gray-600">مدير</div>
                  </div>
                </div>
                <time class="text-xs text-gray-600" datetime="2023-11-07">1 أسبوع، 5 أيام</time>
              </div>
              <p class="pt-6 text-justify text-sm text-gray-800 md:pt-4">تم الموافقه علي طلب سلمان حسن واصبح معبر</p>
            </a>
          </li>
          <li class="hover:bg-gray-50">
            <a class="flex flex-col px-6 py-8 md:py-6" href="#">
              <div class="flex items-start justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10" src="/assets/images/avatar.webp" height="" width="" alt="صورة المستخدم" />
                  </div>
                  <div class="ms-3 flex flex-col">
                    <div class="text-sm font-semibold">عبدالله النعيمي</div>
                    <div class="text-xs font-medium text-gray-600">مدير</div>
                  </div>
                </div>
                <time class="text-xs text-gray-600" datetime="2023-11-07">1 أسبوع، 5 أيام</time>
              </div>
              <p class="pt-6 text-justify text-sm text-gray-800 md:pt-4">تم الموافقه علي طلب سلمان حسن واصبح معبر</p>
            </a>
          </li>
        </ul>
        <div class="fixed bottom-0 z-40 w-full bg-white px-6 py-6 text-center md:relative">
          <a class="px-6 py-3 font-semibold md:text-sm" href="#">عرض جميع الإشعارات ←</a>
        </div>
        <!-- Show when empty notifications list 
        <div class="flex h-[75%] flex-col items-center justify-center p-6 text-center">
          <span class="flex-shrink-0">
            <svg class="text-gray-400" height="40" width="40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
            </svg>
          </span>
          <p class="pt-4 font-semibold text-gray-700 md:text-sm">لا توجد إشعارات لعرضها حتى الان.</p>
        </div>
        -->
      </div>
    </nav>
    <!-- Mobile menu, show/hide based on menu open state. -->
    <div class="is-scroll fixed inset-0 divide-y-2 divide-gray-50 overflow-y-auto bg-white px-6 py-6 md:hidden"
      v-if="openDropdown">
      <div class="pb-6">
        <div class="flex items-center justify-between">
          <a class="-m-1.5 p-1.5" href="/">
            <span class="sr-only">عبر</span>
            <img class="lazyload h-14 w-auto" src="../../assets/images/logo.webp" height="56" width="56" alt="" />
          </a>
          <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" @click="openDropdown = false">
            <span class="sr-only">إغلاق القائمة</span>
            <!-- Heroicon name: outline/x-mark -->
            <svg height="26" width="26" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="pt-10">
          <nav class="space-y-3">

            <RouterLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50"  :to="{ name: 'index' }">
              <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <!-- Heroicon name: outline/home -->
                <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25">
                  </path>
                </svg>
              </div>
              <span class="ms-6 mt-1.5 font-semibold">الرئيسية</span>
            </RouterLink>

            <RouterLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50"  :to="{ name: 'blog' }">
              <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <!-- Heroicon name: outline/home -->
                <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z">
                  </path>
                </svg>
              </div>
              <span class="ms-6 mt-1.5 font-semibold">المدونة</span>
            </RouterLink>
           
            <RouterLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50"  :to="{ name: 'index' }">
              <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <!-- Heroicon name: outline/home -->
                <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z">
                  </path>
                </svg>
              </div>
              <span class="ms-6 mt-1.5 font-semibold">مركز الدعم</span>
            </RouterLink>
          </nav>
        </div>
      </div>
      <div class="space-y-3 py-6">
        <NuxtLink class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" :to="{name : 'index'}">من نحن</NuxtLink>
        <NuxtLink class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" :to="{name : 'index'}">الأسئلة الشائعة</NuxtLink>
        <NuxtLink class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" :to="{name : 'index'}">الشروط و الأحكام</NuxtLink>
        <NuxtLink class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" :to="{name : 'index'}">إتفاقية المستخدم</NuxtLink>
      </div>
      <div class="pt-6">
        <NuxtLink class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" :to="{name : 'accounts-login'}">
          تسجيل الدخول
        </NuxtLink>

    </div>
  </div>
</header></template>

<script setup lang="ts">

const {
  signIn,
  token,
  refreshToken,
  refresh,
  data,
  status,
  lastRefreshedAt,
  signOut,
  getSession
} = useAuth()

import { vOnClickOutside } from '@vueuse/components'

const authStore = useAuthStore()


const openDropdown = ref(false)
const profileDropdown = ref(false)
const notificationDropdown = ref(false)
</script>

<style scoped></style>