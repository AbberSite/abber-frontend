<template>
    <div class="is-scroll w-full overflow-x-auto pt-6">
        <table class="w-full text-sm ltr:text-left rtl:text-right">
          <thead class="border-b border-t">
            <tr>
              <th class="whitespace-nowrap pb-1 pe-4 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between pb-2 pt-3" type="button"><span>المالك</span></button>
              </th>
              <th class="whitespace-nowrap pb-1 pe-4 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between pb-2 pt-3" type="button"><span>رقم البطاقة</span></button>
              </th>
              <th class="whitespace-nowrap pb-1 pe-4 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between pb-2 pt-3" type="button"><span>وسيلة الدفع</span></button>
              </th>
              <th class="whitespace-nowrap pb-1 pe-4 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between space-x-3 rounded-md bg-gray-100 px-4 pb-2 pt-3 rtl:space-x-reverse" type="button">
                  <span>التأريخ</span>
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="14" width="14">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
                  </svg>
                </button>
              </th>
              <th class="px-4 pb-1 pt-1" scope="col"></th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">**** 1898</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center pe-4 pb-4 pt-5">
                <button type="button" title="حذف">
                  <!-- Heroicon name: outline/trash -->
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">**** 1898</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center pe-4 pb-4 pt-5">
                <button type="button" title="حذف">
                  <!-- Heroicon name: outline/trash -->
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">**** 1898</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center pe-4 pb-4 pt-5">
                <button type="button" title="حذف">
                  <!-- Heroicon name: outline/trash -->
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">**** 1898</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center pe-4 pb-4 pt-5">
                <button type="button" title="حذف">
                  <!-- Heroicon name: outline/trash -->
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">**** 1898</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center pe-4 pb-4 pt-5">
                <button type="button" title="حذف">
                  <!-- Heroicon name: outline/trash -->
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">**** 1898</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center pe-4 pb-4 pt-5">
                <button type="button" title="حذف">
                  <!-- Heroicon name: outline/trash -->
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">**** 1898</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center pe-4 pb-4 pt-5">
                <button type="button" title="حذف">
                  <!-- Heroicon name: outline/trash -->
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">**** 1898</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center pe-4 pb-4 pt-5">
                <button type="button" title="حذف">
                  <!-- Heroicon name: outline/trash -->
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">**** 1898</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center pe-4 pb-4 pt-5">
                <button type="button" title="حذف">
                  <!-- Heroicon name: outline/trash -->
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>