<template>
  <div class="hidden md:flex md:gap-x-12 2xl:text-lg md:items-center">
    <!-- Horizontal menu -->
    <div class="is-scroll hidden h-14 space-x-8 overflow-x-auto overflow-y-hidden border-y border-gray-100 rtl:space-x-reverse md:flex md:px-8">
        <a class="flex items-center space-x-2 whitespace-nowrap font-semibold rtl:space-x-reverse 2xl:text-lg" href="/dashboard/">
          <!-- Heroicon name: outline/home -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="20" width="20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg
          ><span class="mt-1.5">الرئيسية</span></a
        >
        <div class="relative flex">
          <button class="flex items-center space-x-2 whitespace-nowrap font-semibold rtl:space-x-reverse 2xl:text-lg" type="button" @click="openDropdown = 4">
            <!-- Heroicon name: outline/... -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="20" width="20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"></path></svg
            ><span class="mt-1.5">الإحصائيات</span>
            <!-- Heroicon name: outline/chevron-down -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="12" width="12">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
            </svg>
          </button>
          <div class="absolute top-[calc(100%+10px)] w-48 divide-y-2 divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0" x-transition x-show="openDropdown === 4" @click.outside="openDropdown = null" x-cloak>
            <div class="py-2">
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/" role="menuitem" tabindex="-1">العودة للموقع</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/accounts/password/change" role="menuitem" tabindex="-1">تغيير كلمة المرور</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/settings/" role="menuitem" tabindex="-1">إعدادات الموقع</a>
            </div>
          </div>
        </div>
        <div class="relative flex">
          <button class="flex items-center space-x-2 whitespace-nowrap font-semibold rtl:space-x-reverse 2xl:text-lg" type="button" @click="openDropdown = 5">
            <!-- Heroicon name: outline/... -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="20" width="20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"></path></svg
            ><span class="mt-1.5">الطلبات</span>
            <!-- Heroicon name: outline/chevron-down -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="12" width="12">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
            </svg>
          </button>
          <div class="absolute top-[calc(100%+10px)] w-48 divide-y-2 divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0" x-transition x-show="openDropdown === 5" @click.outside="openDropdown = null" x-cloak>
            <div class="py-2">
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/" role="menuitem" tabindex="-1">العودة للموقع</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/accounts/password/change" role="menuitem" tabindex="-1">تغيير كلمة المرور</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/settings/" role="menuitem" tabindex="-1">إعدادات الموقع</a>
            </div>
          </div>
        </div>
        <div class="relative flex">
          <button class="flex items-center space-x-2 whitespace-nowrap font-semibold rtl:space-x-reverse 2xl:text-lg" type="button" @click="openDropdown = 6">
            <!-- Heroicon name: outline/... -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="20" width="20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"></path></svg
            ><span class="mt-1.5">المالية</span>
            <!-- Heroicon name: outline/chevron-down -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="12" width="12">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
            </svg>
          </button>
          <div class="absolute top-[calc(100%+10px)] w-48 divide-y-2 divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0" x-transition x-show="openDropdown === 6" @click.outside="openDropdown = null" x-cloak>
            <div class="py-2">
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/" role="menuitem" tabindex="-1">العودة للموقع</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/accounts/password/change" role="menuitem" tabindex="-1">تغيير كلمة المرور</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/settings/" role="menuitem" tabindex="-1">إعدادات الموقع</a>
            </div>
          </div>
        </div>
        <div class="relative flex">
          <button class="flex items-center space-x-2 whitespace-nowrap font-semibold rtl:space-x-reverse 2xl:text-lg" type="button" @click="openDropdown = 7">
            <!-- Heroicon name: outline/... -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="20" width="20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg
            ><span class="mt-1.5">الحسابات</span>
            <!-- Heroicon name: outline/chevron-down -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="12" width="12">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
            </svg>
          </button>
          <div class="absolute top-[calc(100%+10px)] w-48 divide-y-2 divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0" x-transition x-show="openDropdown === 7" @click.outside="openDropdown = null" x-cloak>
            <div class="py-2">
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/" role="menuitem" tabindex="-1">العودة للموقع</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/accounts/password/change" role="menuitem" tabindex="-1">تغيير كلمة المرور</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/settings/" role="menuitem" tabindex="-1">إعدادات الموقع</a>
            </div>
          </div>
        </div>
        <div class="relative flex">
          <button class="flex items-center space-x-2 whitespace-nowrap font-semibold rtl:space-x-reverse 2xl:text-lg" type="button" @click="openDropdown = 8">
            <!-- Heroicon name: outline/... -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="20" width="20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"></path></svg
            ><span class="mt-1.5">الإعدادات</span>
            <!-- Heroicon name: outline/chevron-down -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="12" width="12">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
            </svg>
          </button>
          <div class="absolute top-[calc(100%+10px)] w-48 divide-y-2 divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0" x-transition x-show="openDropdown === 8" @click.outside="openDropdown = null" x-cloak>
            <div class="py-2">
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/" role="menuitem" tabindex="-1">العودة للموقع</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/accounts/password/change" role="menuitem" tabindex="-1">تغيير كلمة المرور</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/settings/" role="menuitem" tabindex="-1">إعدادات الموقع</a>
            </div>
          </div>
        </div>
        <div class="relative flex">
          <button class="flex items-center space-x-2 whitespace-nowrap font-semibold rtl:space-x-reverse 2xl:text-lg" type="button" @click="openDropdown = 9">
            <!-- Heroicon name: outline/... -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="20" width="20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"></path></svg
            ><span class="mt-1.5">الدعم التقني</span>
            <!-- Heroicon name: outline/chevron-down -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="12" width="12">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
            </svg>
          </button>
          <div class="absolute top-[calc(100%+10px)] w-48 divide-y-2 divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0" x-transition x-show="openDropdown === 9" @click.outside="openDropdown = null" x-cloak>
            <div class="py-2">
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/" role="menuitem" tabindex="-1">العودة للموقع</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/accounts/password/change" role="menuitem" tabindex="-1">تغيير كلمة المرور</a>
              <a class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="/settings/" role="menuitem" tabindex="-1">إعدادات الموقع</a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
const { data, status } = await useAuth();
</script>

<style scoped></style>