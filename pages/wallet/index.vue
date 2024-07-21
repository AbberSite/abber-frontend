<template>

    <Head>
        <title>عبر - المحفظة</title>
    </Head>
    <main class="min-h-screen outline-none">
        <HeroBackground />

        <section
            class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="wallet-heading" x-data="{ openFilterDropdown: false, activeTab: 1 }">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/wallet -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" height="24" width="24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3">
                    </path>
                </svg>
            </div>
            <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="wallet-heading">المحفظة</h1>
            <div class="pt-4 text-sm text-gray-800 xs:text-base">تصفح جمبع بيانات محفظتك الالكترونية</div>

            <WalletTabs v-model="activeTab" />

            <WalletFinancialSummary v-if="activeTab === 'summary'" />
            <WalletTransactions v-else-if="activeTab == 'operations'" />
            <WalletStatements v-else-if="activeTab == 'statement'" />
            <WalletCards v-else-if="activeTab == 'cards'" />
            <WalletRequests v-else-if="activeTab == 'withdrawalRequests'" />
        </section>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();

// const { fetchAll } = useTransactionsStore();
// const { transactions, loading } = storeToRefs(useTransactionsStore());

// const { getSession } = useAuth()


// await getSession()

const activeTab = ref<'summary' | 'operations' | 'statement' | 'cards' | 'withdrawalRequests'>(['summary', 'operations', 'statement', 'cards', 'withdrawalRequests'].includes(route.query?.activeRoute) ? route.query.activeRoute : 'summary');



// onMounted(async () => {
//     if (transactions.value.length === 0) {
//         loading.value = true
//         await fetchAll();
//         loading.value = false
//     }
// });
onMounted(async () => {
    if (['summary', 'operations', 'statement', 'cards', 'withdrawalRequests'].includes(route.query?.activeRoute)) {
        setTimeout(() => {
            let tab = document.getElementById((route.query?.activeRoute).toString());
            tab?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 3000)
    }
})
</script>

<style scoped></style>
