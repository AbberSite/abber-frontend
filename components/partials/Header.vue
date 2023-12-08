<template>
    <header class="absolute inset-x-0 top-0 z-30 mx-auto max-w-7xl" x-data="{ openDropdown: null }">
        <nav class="flex items-center justify-between px-4 py-6 xs:px-6 md:px-8" aria-label="Global">
          <div class="flex md:flex-1">
            <a class="-m-1.5 p-1.5" href="/">
              <img class="h-14 w-auto" src="../../assets/images/logo.webp" height="56" width="56" alt="عبر" />
            </a>
          </div>
          <div class="flex items-center md:hidden">
            <!-- Menu Button -->
            <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" @click="() => null">
              <span class="sr-only">فتح القائمة الرئيسية</span>
              <svg height="34" width="34" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
              </svg>
            </button>
          </div>
          <div class="hidden md:flex md:gap-x-12 2xl:text-lg">
            <a class="font-semibold" href="/">الرئيسية</a>
            <a class="font-semibold" href="/">المدونة</a>
            <a class="font-semibold" href="/">مركز الدعم</a>
          </div>
          <div class="hidden md:flex md:flex-1 md:justify-end 2xl:text-lg">
            <!-- Login Link -->
            <a class="font-semibold" href="/accounts/login"> تسجيل الدخول<span aria-hidden="true">←</span></a>
          </div>
        </nav>
        <!-- Mobile menu, show/hide based on menu open state. -->
        <div class="is-scroll fixed inset-0 divide-y-2 divide-gray-50 overflow-y-auto bg-white px-6 py-6 md:hidden" x-show="openDropdown === 2" @click.away="null" style="display: none" x-cloak>
          <div class="pb-6">
            <div class="flex items-center justify-between">
              <a class="-m-1.5 p-1.5" href="/">
                <span class="sr-only">عبر</span>
                <img class="lazyload h-14 w-auto" data-src="../../assets/images/logo.webp" height="56" width="56" alt="" />
              </a>
              <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" @click="null">
                <span class="sr-only">إغلاق القائمة</span>
                <!-- Heroicon name: outline/x-mark -->
                <svg height="26" width="26" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="pt-10">
              <nav class="space-y-3">
                <a class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50" href="/">
                  <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <!-- Heroicon name: outline/home -->
                    <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                    </svg>
                  </div>
                  <span class="ms-6 mt-1.5 font-semibold">الرئيسية</span>
                </a>
                <a class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50" href="/">
                  <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <!-- Heroicon name: outline/home -->
                    <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                    </svg>
                  </div>
                  <span class="ms-6 mt-1.5 font-semibold">المدونة</span>
                </a>
                <a class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50" href="/">
                  <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <!-- Heroicon name: outline/home -->
                    <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <span class="ms-6 mt-1.5 font-semibold">مركز الدعم</span>
                </a>
              </nav>
            </div>
          </div>
          <div class="space-y-3 py-6">
            <a class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" href="#">من نحن</a>
            <a class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" href="#">الأسئلة الشائعة</a>
            <a class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" href="#">الشروط و الأحكام</a>
            <a class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" href="#">إتفاقية المستخدم</a>
          </div>
          <div class="pt-6">
            <a class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50" href="/accounts/login">تسجيل الدخول</a>
          </div>
        </div>
      </header>
    
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>