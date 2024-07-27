<template>

  <Head>
    <title>عبر - من نحن</title>

  </Head>


  <main class="min-h-screen outline-none">
    <HeroBackground/>

    <section
      class="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44 content" id="about">

      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z">
          </path>
        </svg></div>
      <h1 class="pt-8 text-lg font-medium xs:text-xl 2xl:text-2xl">من نحن</h1>
      <div class="pt-16 prose prose-sm prose-gray lg:prose-base " v-html="settings.general_settings.about" />
    </section>

  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '~/stores/settings';

const { settings } = storeToRefs(useSettingsStore());
const { getSettings } = useSettingsStore();
if(settings.value == undefined){
  await getSettings();
}
definePageMeta({ auth: false });


</script>

<style>
#about .content h1 {
  @apply text-xl m-0 font-bold
}

#about .content img {
  @apply rounded-xl my-2
}


</style>