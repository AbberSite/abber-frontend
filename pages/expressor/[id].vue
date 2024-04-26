<template>

    <Head>
        <title>عبر - المعبرون - {{ expressor?.seller.first_name + ' ' + expressor?.seller?.last_name }}</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <HeroBackground />
        <!-- Profile Section -->

        <section
            class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 sm:items-stretch md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="profile-heading">
            <template v-if="loading">
                <SkeletonsExpressorPage />
            </template>
            <template v-else>
                <h1 class="sr-only" id="profile-heading">{{ `${expressor?.seller.first_name}
                    ${expressor?.seller.last_name}` }}</h1>
                <div class="flex items-center justify-between">
                    <div class="flex-shrink-0">
                        <img class="lazyload h-24 w-24 rounded-full bg-gray-100 object-cover"
                            :src="expressor?.seller.image" height="96" width="96" alt="صورة المستخدم" />
                    </div>
                    <div class="hidden items-center space-x-3 rtl:space-x-reverse sm:flex">
                        <NuxtLink
                            class="flex items-center justify-center space-x-1 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse"
                            :to="{ name: 'orders-make' }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59">
                                </path>
                            </svg>
                            <span class="mt-1.5">طلب تفسير حلم</span>
                        </NuxtLink>
                    </div>
                </div>

                <div class="flex flex-col items-center pt-8 sm:block">
                    <span class="text-lg font-semibold">{{ `${expressor?.seller.first_name}
                        ${expressor?.seller.last_name}` }}</span>
                    <div class="flex items-center justify-start pt-2">
                        <svg v-for="i in Math.floor(expressor.rate) ?? 1" class="flex-shrink-0 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true" height="18" width="18">
                            <path fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <svg v-for="i in  Math.ceil(5 - expressor.rate)" class="flex-shrink-0 text-gray-200"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true" height="18" width="18">
                            <path fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="ms-1.5 mt-1.5 text-xs font-medium text-gray-800 xs:text-sm">({{ rate_count }})</span>
                    </div>
                    <p class="max-w-prose pt-8 text-justify text-sm text-gray-800 xs:text-base">{{
            expressor?.seller.about }}</p>
                    <ExpressorTabs v-model="tab" :count_rates="rate_count" />
                    <div v-if="tab == 'workTime'" class="w-full max-w-prose pt-10">
                        <p class="text-justify text-sm text-gray-800 xs:text-base">{{expressor?.work_hours}}</p>
                        
                    </div>

                    <template v-if="tab == 'workTime'" >
                        <div
                            class="fixed bottom-0 z-20 flex w-full items-center space-x-3 border-t border-gray-100 bg-white px-4 py-6 rtl:space-x-reverse xs:px-6 sm:hidden">
                            <NuxtLink :to="{ name: 'orders-make' }" class="flex h-[50px] w-full items-center justify-center space-x-2 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse"
                               >
                                <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59">
                                    </path>
                                </svg>
                                <span class="mt-1.5">طلب تفسير حلم</span>
                            </NuxtLink>
                        </div>
                    </template>
                    <template v-else class="w-full space-y-7 divide-y divide-gray-100 pt-8">
                        <RateCard v-for="rate of rates"  :my_rate="rate" />
                    </template>
                </div>
            </template>
        </section>
    </main>
</template>


<script lang="ts" setup>
import type { Service, Rate } from '~/types';
const route = useRoute();
let expressor = ref<Service | undefined>(undefined);
let loading = ref(true);
const tab = ref<'workTime' | 'rates'>('workTime');
let rates = ref<Rate[] | undefined>(undefined);
let rate_count = ref(0);
definePageMeta({
    auth: false
})
onMounted(async () => {
    const data = await useProxy(`/services/services/${route.params.id}`);
    const dataExpressor = await useProxy(`/expressors/expressors/${route.params.id}`);
    const ratesData = await useProxy(`/services/services/${route.params.id}/ratings`);
    expressor.value = data;
    expressor.value.work_hours = dataExpressor.work_hours;
    loading.value = false;
    rates.value = ratesData.results;
    rate_count.value = ratesData.count;
})
</script>