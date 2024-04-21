<template>
    <main class="min-h-screen outline-none">
        <HeroBackground />

        <section
            class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="settings-heading"
            >
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/cog-6-tooth -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    height="24"
                    width="24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                </svg>
            </div>
            <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="settings-heading">إدارة الخدمة</h1>
            <div class="pt-4 text-sm text-gray-800 xs:text-base">قم بإدراة خدمة تعبير الأحلام الخاصة بك</div>

            
            <TabGroup as="template">
                <TabList
                    class="blog is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base"
                    role="tablist"
                    aria-labelledby="tablist-profile"
                    aria-orientation="horizontal"
                    as="div">
                    
                    <Tab v-slot="{ selected }" as="template">
                        <button
                            class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
                            
                            type="button"
                            role="tab"
                            aria-labelledby="tabpanel-preview-1"
                            aria-controls="tabpanel-preview-1"
                            :class="[
                                selected ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
                            ]">
                            إعدادات الخدمة
                        </button>
                    </Tab>
                    <Tab v-slot="{ selected }" as="template">
                        <button
                            class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
                            
                            type="button"
                            role="tab"
                            aria-labelledby="tabpanel-preview-1"
                            aria-controls="tabpanel-preview-1"
                            :class="[
                                selected ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
                            ]">
                            الخصومات
                        </button>
                    </Tab>
                    <Tab v-slot="{ selected }" as="template">
                        <button
                            class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
                            
                            type="button"
                            role="tab"
                            aria-labelledby="tabpanel-preview-1"
                            aria-controls="tabpanel-preview-1"
                            :class="[
                                selected ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
                            ]">
                            الكوبونات
                        </button>
                    </Tab>
                </TabList>
                <TabPanels as="div" class="w-full">
                    <TabPanel as="div" class="w-full">
                        <ProfileServiceSettings /> 
                    </TabPanel>
                    <TabPanel as="div" class="w-full">
                        <ProfileServiceDiscounts /> 
                    </TabPanel>
                    <TabPanel as="div" class="w-full pt-10" >
                        <ProfileServiceCoupons />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </section>
    </main>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel,  } from '@headlessui/vue';

</script>

<style scoped></style>
