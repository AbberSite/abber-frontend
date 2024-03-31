<template>

    <Head>
        <title>عبر - الشروط و الأحكام</title>

    </Head>


    <main class="min-h-screen outline-none">

        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
            <div
                class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div
                    class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "></div>
            </div>
            <div
                class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div
                    class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "></div>
            </div>
        </section>


        <section class="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44 content" id="userAgreement">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
          <!-- Heroicon name: outline/identification -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"></path>
          </svg>
        </div>
        <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="agreement-heading">إتفاقية المستخدم</h1>
        <div class="prose prose-sm prose-gray lg:prose-base pt-16" v-html="settings?.policy_settings?.user_agreement"></div>
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
definePageMeta({auth: false})
</script>

<style>

#userAgreement .content p:first-child {
    @apply text-4xl my-8 font-bold
}

/* #userAgreement .content p {
    @apply text-right text-[1rem]
} */


#userAgreement .content h2 {
    @apply lg:text-2xl text-xl my-2 font-semibold
}

#userAgreement .content h3 {
    @apply lg:text-xl text-lg my-6 font-bold
}


#userAgreement .content img {
    @apply rounded-xl my-2
}

</style>