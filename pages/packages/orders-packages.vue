<template>
  <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="prices-heading" x-data="{ alert: true, openFilterDropdown: false, firstLevelSelect: '', secondLevelSelect: '', thirdLevelSelect: '' }">
    <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
      <!-- Heroicon name: outline/rocket-launch -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>
      </svg>
    </div>
    <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="prices-heading">الباقات</h1>
    <div class="pt-4 text-sm text-gray-800 xs:text-base">تواصل معنا في حالة احتجت الى المساعدة</div>
    <!--     
    <div class="mt-8 flex items-center justify-center space-x-3 pt-10 rtl:space-x-reverse">
      <label class="text-sm font-semibold text-gray-800">شهري</label>
      <label>
        <input class="peer sr-only" type="checkbox" value="" checked="" />
        <div class="peer relative h-6 w-11 cursor-pointer rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full"></div>
      </label>
      <label class="relative text-sm font-semibold text-gray-800">
        سنوي
        <span class="absolute -end-[5.5rem] -top-10 start-auto">
          <span class="flex items-center">
            <svg class="-me-6 h-8 w-14 rtl:scale-x-flip" width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                class="fill-gray-300"
                d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                fill="currentColor"
              ></path></svg
            ><span class="mt-3 inline-block rounded-full bg-gray-900 px-2.5 pb-0.5 pt-1 text-xs font-semibold text-white">وفر حتى 10%</span></span
          ></span
        >
      </label>
    </div> -->

    <div class="grid w-full gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-3">
      <PackagesPackageCard v-for="(pkg, index) in packages" :package="pkg" :key="index" :primary="index===1" :subscribed="membership.results.length > 0" ></PackagesPackageCard>
    </div>
  </section>
</template>

<script lang="ts" setup>
const packages = ref<OrdersPackage[]>([]);

const data =  (await useApi(`/api/packages/orders-packages/`, {method: "GET",})) as PaginationResponse<OrdersPackage>;
packages.value = data.results;

const membership =  (await useApi(`/api/packages/orders-membership/`, {method: "GET",})) as PaginationResponse<any>;

</script>

<style></style>
