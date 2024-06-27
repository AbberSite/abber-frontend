<template>
  <main class="min-h-screen outline-none">
    <HeroBackground />

    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="settings-heading">
      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
        <!-- Heroicon name: outline/cog-6-tooth -->

        <svg v-if="selectedIndex === 3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24"> <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" /> </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24"> <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" ></path> <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path> </svg>
      </div>
      <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="settings-heading" v-text="selectedIndex === 3 ? 'رمز الإحالة' : 'إدارة الخدمة'"></h1>
      <div class="pt-4 text-sm text-gray-800 xs:text-base" v-text="selectedIndex === 3 ? 'احصل على رمز الإحالة الخاص بك' : 'قم بإدراة خدمة تعبير الأحلام الخاصة بك'"></div>

      <TabGroup as="template" @change="changeTab">
        <TabList class="blog is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base" role="tablist" aria-labelledby="tablist-profile" aria-orientation="horizontal" as="div">
          <Tab v-slot="{ selected }" as="template">
            <button class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse" type="button" role="tab" aria-labelledby="tabpanel-preview-1" aria-controls="tabpanel-preview-1" :class="[selected ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900']">
              إعدادات الخدمة
            </button>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <button class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse" type="button" role="tab" aria-labelledby="tabpanel-preview-1" aria-controls="tabpanel-preview-1" :class="[selected ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900']">
              الخصومات
            </button>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <button class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse" type="button" role="tab" aria-labelledby="tabpanel-preview-1" aria-controls="tabpanel-preview-1" :class="[selected ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900']">
              الكوبونات
            </button>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <button class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse" type="button" role="tab" aria-labelledby="tabpanel-preview-1" aria-controls="tabpanel-preview-1" :class="[selected ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900']">
              رمز الإحالة
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
          <TabPanel as="div" class="w-full pt-10">
            <ProfileServiceCoupons />
          </TabPanel>
          <TabPanel as="div" class="w-full">
            <ProfileServiceReferralCode />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  </main>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
const selectedIndex = ref(0);
const changeTab = (index) => {
  selectedIndex.value = index;
  console.log(selectedIndex.value);
};
</script>

<style scoped></style>
