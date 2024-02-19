import type { WalletStatementsPDFExport } from '~/.nuxt/components';
<template>
    <div class="w-full pt-16">
        <div class="flex items-center justify-between">
            <form class="w-full sm:max-w-sm" method="GET">
                <div class="w-full space-y-3">
                    <div class="relative">
                        <span
                            class="absolute h-[50px] items-center justify-center px-4 py-4 ltr:left-0 rtl:right-0 rtl:scale-x-flip">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                height="20"
                                width="20">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg
                        ></span>
                        <input
                            class="form-control h-[50px] px-12"
                            type="search"
                            name="q"
                            id="search"
                            placeholder="إبحث عن كشف حساب معين"
                            required />
                        <button
                            class="absolute h-[50px] items-center justify-center px-4 py-4 ltr:right-0 rtl:left-0 sm:hidden"
                            type="button"
                            @click="showModal = true">
                            <svg
                            class="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path></svg
                        >
                        </button>
                    </div>
                </div>
            </form>
            <div class="relative">
                <button
                    class="hidden h-[50px] items-center justify-center rounded-md border bg-white px-4 py-3 text-xs font-semibold shadow-sm hover:bg-gray-50 sm:flex"
                    type="button"
                    @click="pdfDropdown = true"
                    aria-expanded="false"
                    aria-haspopup="true">
                    <span class="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg
                            class="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path></svg
                        ><span class="mt-1.5">تصدير PDF</span></span
                    >
                </button>
                <transition
                    enter-active-class="transition-all"
                    leave-active-class="transition-all"
                    enter-from-class="translate-y-4 opacity-0"
                    leave-to-class="translate-y-4 opacity-0">
                    <WalletStatementsPDFExport
                        v-if="pdfDropdown"
                        v-on-click-outside="() => (pdfDropdown = false)" />
                </transition>
            </div>
        </div>
        <div class="is-scroll w-full overflow-x-auto pt-6">
            <WalletStatementsTable :transactions="transactions" />
            <Pagination
            class="pt-10"
            :results="(pagination as PaginationResponse<any>)"
            @change="fetchAll"
            per-page="9" />
        </div>

        <WalletStatementsMobilePDFExportModal :show="showModal" @close="showModal = false" /> 
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import type { PaginationResponse } from '~/types';

const { fetchAll } = useTransactionsStore();
const { transactions, pagination } = storeToRefs(useTransactionsStore());


const pdfDropdown = ref(false);
const showModal = ref(false);


if (!process.client) {
    await fetchAll();
}

onMounted(async () => {
    if (transactions.value.length === 0) {
        await fetchAll();
    }
});

</script>

<style scoped></style>
