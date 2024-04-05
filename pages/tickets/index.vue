<template>

    <Head>
        <Title>عبر - مركز الدعم</Title>
    </Head>

    <main class="min-h-screen outline-none">
        <!-- hero section -->
        <section class="relative px-4 isolate pt-14 xs:px-6 lg:px-8">
            <div class="absolute insert-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-80"
                aria-hidden="true">
                <div class="relative left-[calc(50% - 11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                </div>
            </div>
            <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                </div>
            </div>
        </section>

        <section
            class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="support-heading"
            x-data="{ alert: true, openFilterDropdown: false, firstLevelSelect: '', secondLevelSelect: '', thirdLevelSelect: '' }">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/lifebuoy -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" height="24" width="24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z">
                    </path>
                </svg>
            </div>
            <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="support-heading">مركز الدعم</h1>
            <div class="pt-4 text-sm text-gray-800 xs:text-base">تواصل معنا في حالة احتجت الى المساعدة</div>
            <!-- <SkeletonsOrdersTable v-if="loading" class="mt-16" /> -->
            <SkeletonsOrdersTable v-if="loading" class="mt-16" />

            <!-- support center -->
            <TicketsTable :tickets="tickets ?? []"/>
        </section>
    </main>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { PaginationResponse } from '~/types';
const onpenFiltersMobileModal = ref(false);
const openFiltersDropdown = ref(false);
const openCreateSessionModal = ref(false);
const openSessionModal = ref(false);
const {fetchAll} = useTicketsStore();

const { tickets, loading, pagination, filters } = storeToRefs(useTicketsStore());
const {data} = useAuth();
function handleSessionCreated() {
    openCreateSessionModal.value = false;
    openSessionModal.value = true;
}
onMounted(async () => {
    const persistedFilters = localStorage.getItem('abber:filters');
    if(persistedFilters) {
        filters.value = Object.assign(JSON.parse(persistedFilters), { ignore: true })
    }
    if(tickets?.value?.length != 0) return;
    loading.value = true;
    await fetchAll();
    loading.value = false; 
})
</script>