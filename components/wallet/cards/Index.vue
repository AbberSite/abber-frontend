<template>
    <div class="w-full pt-16">
        <form class="w-full sm:max-w-sm" method="GET">
            <div class="w-full space-y-3" x-id="['input']">
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
                        id="cards-search"
                        placeholder="إبحث عن بطاقة معيتة"
                        required="required" />
                </div>
            </div>
        </form>
        <WalletCardsTable />
        <div
            class="fixed bottom-4 flex flex-col space-y-3 ltr:right-4 rtl:left-4 xs:bottom-6 ltr:xs:right-6 rtl:xs:left-6 lg:bottom-8 ltr:lg:right-8 rtl:lg:left-8">
            <button
                class="rounded-full bg-gray-900 px-4 py-4 text-white hover:bg-gray-800 focus:outline-none"
                type="button"
                @click="showAddModal = true"
                aria-label="إضافة">
                <!-- Heroicon name: outline/plus -->
                <svg
                    class="mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                </svg>
            </button>
        </div>

        <WalletCardsAddModal :show="showAddModal" @close="showAddModal = false" />
    </div>
</template>

<script setup lang="ts">

const showAddModal = ref(false)
</script>

<style scoped></style>
