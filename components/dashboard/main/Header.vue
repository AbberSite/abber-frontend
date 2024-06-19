<template>
  <nav id="dashboard-innerSticky" class="flex items-center justify-between lg:px-8 px-4 py-7 w-full">
  <button class="bg-white border dark:bg-light dark:border-light dark:hover:bg-primary dark:text-gray-200 focus:outline-none hover:bg-primary hover:text-gray-100 px-3 py-3 rounded-lg shadow-sm text-primary dashboard-toggle-drawer" title="توسيع/تصغير القائمة">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </button>
  <div class="flex items-center space-x-3 space-x-reverse">
    <button id="notifications-button" data-section="section-notification" class="bg-white border dark:bg-light dark:border-light dark:hover:bg-primary dark:text-gray-200 focus:outline-none hover:bg-primary hover:text-gray-100 px-3 py-3 relative rounded-full shadow-sm text-primary" title="التنبيهات">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="18" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
        </svg>
          <span class="-top-2.5 absolute bg-red-600 flex font-bold items-center justify-center left-6 min-h-[20px] min-w-[20px] p-1 rounded-full text-gray-100 text-xs">{{ data?.notifications?.count }}</span>
      </div>
    </button>
    <button class="bg-white border dark:bg-light dark:border-light dark:hover:bg-primary dark:text-gray-200 focus:outline-none hover:bg-primary hover:text-gray-100 px-3 py-3 rounded-full shadow-sm text-primary toggle-theme" title="الوضع الداكن/الفاتح">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    </button>
    <div class="flex group items-center relative">
      <button class="relative" aria-label="Account">
        <img :src="data?.image_url" class="aspect-square bg-gray-100 border dark:border-light object-cover rounded-full shadow-sm" height="46" width="46" alt="Avatar" />
      </button>
      <div class="absolute bg-primary dark:border dark:border-light divide-light divide-y duration-300 group-hover:opacity-100 group-hover:visible invisible left-0 opacity-0 rounded-lg shadow-2xl text-gray-100 top-[calc(100%+20px)] transition-all w-60 z-10">
        <div class="px-5 py-4">
          <p class="font-medium text-secondary truncate">مرحبا بك, {{ data.first_name }}</p>
          <p class="text-sm">{{ data?.username == 'admin' ? 'المدير' : 'موظف' }}</p>
        </div>
        <ul class="py-2">
          <li>
            <NuxtLink :to="{name: 'index'}" class="flex hover:bg-light hover:text-secondary items-center px-5 py-4" title="عرض الموقع">
              <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span class="pr-3">عرض الموقع</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{name: 'profile'}" class="flex hover:bg-light hover:text-secondary items-center px-5 py-4" title="الملف الشخصي">
              <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span class="pr-3">الملف الشخصي</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{name: 'profile-change-password'}" class="flex hover:bg-light hover:text-secondary items-center px-5 py-4" title="تغيير كلمة المرور">
              <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span class="pr-3">تغيير كلمة المرور</span>
            </NuxtLink>
          </li>
        </ul>
        <ul class="py-2">
          <li>
            <NuxtLink :to="{name: 'index'}" class="flex hover:bg-light hover:text-secondary items-center px-5 py-4" title="الإعدادات">
              <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="pr-3">الإعدادات</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{name: 'accounts-sms'}" @click="useLogout()" class="flex hover:bg-light hover:text-secondary items-center px-5 py-4" title="تسجيل الخروج">
              <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="pr-3">تسجيل الخروج</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</template>

<script lang="ts" setup>
const {data} = useAuthState();
</script>

<style>

</style>