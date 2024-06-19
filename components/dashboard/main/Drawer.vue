<template>
  

<div>
  <nav id="dashboard-drawer" class="bg-primary dark:border-l dark:border-light divide-light divide-y duration-300 ease-linear fixed top-0 right-0 flex flex-col group h-screen invisible lg:hover:w-80 lg:translate-x-0 lg:visible lg:w-[6.1rem] transition-all translate-x-96 w-80 z-30">
  <div class="bg-primary dark:border-l dark:border-light sticky top-0 flex items-center justify-between px-4 py-6 w-full z-40">
    <NuxtLink to="/dashboardv2/" title="عبر">
      <img src="/images/logo.webp" class="aspect-square invert" height="58" width="58" alt="عبر" />
    </NuxtLink>
    <button class="dashboard-toggle-drawer -ml-[35px] rounded-full bg-secondary px-3 py-3 text-primary shadow hover:bg-gray-100 lg:group-hover:visible lg:invisible" title="توسيع/تصغير القائمة">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
  <ul class="bg-primary overflow-x-hidden overflow-y-auto py-4 z-30 is-scroll text-gray-100">
    <li class="before:absolute before:bg-secondary before:ease-linear before:group-hover:right-0 before:h-[1px] before:right-[2.35rem] before:top-[1.5rem] before:transition-all before:w-4 flex-shrink-0 my-1 overflow-hidden px-8 py-3 relative text-clip w-full whitespace-nowrap">
      <span class="brand lg:group-hover:visible lg:invisible text-secondary">الرئيسية</span>
    </li>
    <li class="py-1.5 w-full">
      
      <NuxtLink :to="{name: 'dashboardv2'}" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="الرئيسية" :class="{'bg-light text-secondary': route.name.endsWith('dashboardv2')}">
        <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
        </svg>
        <span class="brand lg:group-hover:visible lg:invisible pr-3">الرئيسية</span>
      </NuxtLink>
    </li>
    <li class="py-1.5 w-full">
      <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="التنبيهات والاشعارات">
        <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
        </svg>
        <span class="brand lg:group-hover:visible lg:invisible pr-3">التنبيهات والإشعارات</span>
      </a>
    </li>
    <li class="py-1.5 w-full">
      <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title=" سجل الإجراءات">
        <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
        <span class="brand lg:group-hover:visible lg:invisible pr-3"> سجل الإجراءات </span>
      </a>
    </li>
    <!-- start if statement -->
    <template v-if="isAdmin">
      <li class="before:absolute before:bg-secondary before:ease-linear before:group-hover:right-0 before:h-[1px] before:right-[2.35rem] before:top-[1.5rem] before:transition-all before:w-4 flex-shrink-0 my-1 overflow-hidden px-8 py-3 relative text-clip w-full whitespace-nowrap">
        <span class="brand lg:group-hover:visible lg:invisible text-secondary">الإحصائيات</span>
      </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3"></span>
        </a>
      </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3"></span>
        </a>
      </li>
    
    
      <li class="before:absolute before:bg-secondary before:ease-linear before:group-hover:right-0 before:h-[1px] before:right-[2.35rem] before:top-[1.5rem] before:transition-all before:w-4 flex-shrink-0 my-1 overflow-hidden px-8 py-3 relative text-clip w-full whitespace-nowrap">
        <span class="brand lg:group-hover:visible lg:invisible text-secondary">الطلبات</span>
      </li>
    
    
      <li class="py-1.5 w-full">
        <NuxtLink :to="{name: 'dashboardv2-orders'}" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="الطلبات" :class="{'bg-light text-secondary': route.name.includes('dashboardv2-orders')}">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">الطلبات</span>
        </NuxtLink>
      </li>
    
    
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="الطلبات">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3"></span>
        </a>
      </li>
    
    
      <li class="before:absolute before:bg-secondary before:ease-linear before:group-hover:right-0 before:h-[1px] before:right-[2.35rem] before:top-[1.5rem] before:transition-all before:w-4 flex-shrink-0 my-1 overflow-hidden px-8 py-3 relative text-clip w-full whitespace-nowrap">
        <span class="brand lg:group-hover:visible lg:invisible text-secondary">المالية</span>
      </li>
    
    
      <li class="py-1.5 w-full">
        <a href="?status=1" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="طلبات السحب">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">طلبات السحب</span>
        </a>
      </li>
    
    
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="العمليات المالية">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">العمليات المالية</span>
        </a>
      </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="العمليات المالية">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">الحركات المالية</span>
        </a>
      </li>
    
    
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="الفروقات">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">الفروقات</span>
        </a>
      </li>
    
    <li class="before:absolute before:bg-secondary before:ease-linear before:group-hover:right-0 before:h-[1px] before:right-[2.35rem] before:top-[1.5rem] before:transition-all before:w-4 flex-shrink-0 my-1 overflow-hidden px-8 py-3 relative text-clip w-full whitespace-nowrap">
      <span class="brand lg:group-hover:visible lg:invisible text-secondary">الحسابات</span>
    </li>
    
      <li class="py-1.5 w-full">
        
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="المعبرون">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">المعبرون</span>
        </a>
      </li>
    
    
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="العملاء">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">العملاء</span>
        </a>
      </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"/>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3"></span>
        </a>
      </li>
    
    
      <li class="py-1.5 w-full">
        
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="المجموعات">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">المجموعات</span>
        </a>
      </li>
    
    
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="مدراء العلاقة">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="21" width="21" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">مدراء العلاقة</span>
        </a>
      </li>
    
    
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="إدارة العلاقات">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="21" width="21" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">إدارة العلاقات</span>
        </a>
      </li>
    
    
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="إدارة العلاقات">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="21" width="21" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">المقالات</span>
        </a>
      </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="نطاقات المعبرين">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="21" width="21" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">نطاقات المعبرين</span>
        </a>
      </li>
      <li class="before:absolute before:bg-secondary before:ease-linear before:group-hover:right-0 before:h-[1px] before:right-[2.35rem] before:top-[1.5rem] before:transition-all before:w-4 flex-shrink-0 my-1 overflow-hidden px-8 py-3 relative text-clip w-full whitespace-nowrap">
        <span class="brand lg:group-hover:visible lg:invisible text-secondary">إعدادات</span>
      </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="إعدادات عامة">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">إعدادات عامة</span>
        </a>
        </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="إعدادات الموقع">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">إعدادات الموقع</span>
        </a>
      </li>
    </template>
      <!-- end if statement -->
    <li class="before:absolute before:bg-secondary before:ease-linear before:group-hover:right-0 before:h-[1px] before:right-[2.35rem] before:top-[1.5rem] before:transition-all before:w-4 flex-shrink-0 my-1 overflow-hidden px-8 py-3 relative text-clip w-full whitespace-nowrap">
      <span class="brand lg:group-hover:visible lg:invisible text-secondary">الدعم التقني</span>
    </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="إعدادات الموقع">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">إعدادات مركز المساعدة</span>
        </a>
      </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="تذاكر المساعدة">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">تذاكر المساعدة</span>
        </a>
      </li>
    <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">المحادثات</span>
        </a>
      </li>
      <li class="py-1.5 w-full">
        <a href="" class="hover:bg-light hover:text-secondary flex items-center mx-4 px-5 py-5 rounded-lg whitespace-nowrap" title="الأسئلة الشائعة">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="23" width="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <span class="brand lg:group-hover:visible lg:invisible pr-3">الأسئلة الشائعة</span>
        </a>
      </li>

  </ul>
</nav>


<div id="overlay" class="backdrop-blur-sm bg-light/80 cursor-pointer fixed hidden inset-0 lg:hidden dashboard-toggle-drawer z-20"></div>

</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const {data} = useAuth(); 
const isAdmin = computed(()=> {
  return data.value.user_type == 'إدارة' && data.value.username == 'admin';
})
</script>

<style>

</style>