<template>
<div class="w-full space-y-4 pt-10">
            <div class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 sm:max-w-md" role="alert">
              <div class="mt-1.5 flex">
                <span class="me-3 flex-shrink-0">
                  <!-- Heroicon name: outline/information-circle -->
                  <svg class="text-blue-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
                  </svg>
                </span>
                <div class="w-full items-center justify-between sm:flex">
                  <div class="text-sm font-medium leading-loose" v-if="membership.results.length > 0">أنت الان مشترك بـ {{membership.results[0].package.name}}</div>
                  <div class="text-sm font-medium leading-loose" v-else >أنت غير مشترك الان بأي باقة</div>
                  <div class="mt-3 flex-shrink-0 text-sm font-medium sm:mt-0">
                    <NuxtLink class="text-blue-600" :to="{name:'packages-orders-packages'}"> عرض الباقات<span aria-hidden="true">←</span></NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="membership.results.length > 0" class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 sm:max-w-md" role="alert">
              <div class="mt-1.5 flex">
                <span class="me-3 flex-shrink-0">
                  <!-- Heroicon name: outline/exclamation-circle  -->
                  <svg class="text-yellow-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path>
                  </svg>
                </span>
                <div class="w-full items-center justify-between sm:flex">
                  <div class="text-sm font-medium leading-loose">متبقي لديك {{membership.results[0].num_orders}} خدمات لتقديمها</div>
                  <div class="mt-3 flex-shrink-0 text-sm font-medium sm:mt-0">
                    <button @click="navigateTo({name:'packages-orders-packages'})" class="hover:text-primary -m-2 rounded bg-white p-2 hover:bg-gray-50 focus:outline-none" type="button">تجديد الإشتراك</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>

<script lang="ts" setup>
const membership = ref({results: []});
onMounted(async () => {
  const data =  await useApi(`/api/packages/orders-packages/membership/`, { method: "GET" });
  membership.value = data;
});


</script>

<style>

</style>