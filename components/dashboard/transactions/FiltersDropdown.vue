<template>
    <div
        class="absolute top-[calc(100%+15px)] flex w-[280px] justify-between rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0 z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
        v-cloak
        >
        <div>
            <DashboardTransactionsFiltersTransactionSuccess/>
        </div>
        <div>
            <h3 class="text-sm font-semibold">نوع العملية</h3>
            <DashboardTransactionsFiltersTransactionType /> 
            <!-- <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <input
                        class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="checkbox"
                        name="checkbox"
                        id="checkbox" />
                    <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">محادثة صوتية</label>
                </div>
                <div class="flex items-center">
                    <input
                        class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="checkbox"
                        name="checkbox"
                        id="checkbox" />
                    <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">محادثة نصية</label>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
