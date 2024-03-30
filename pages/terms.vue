<template>

    <Head>
        <title>عبر - الشروط و الأحكام</title>
        <!-- Meta tags -->
        <Meta charset="UTF-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- SEO tags -->
        <Meta name="author" content="عبر" />
        <Meta name="robots" content="index, follow" />
        <Meta name="copyright" content="Copyright 2023" />
        <Meta name="language" content="Arabic" />
        <Meta property="og:site_name" content="عبر" />
        <Meta property="og:type" content="website" />
        <Meta property="og:image:alt" content="Og Image Alt" />
        <Meta property="twitter:card" content="summary_large_image" />
        <Meta name="description" content="عالمك الخاص لتفسير الأحلام" />
        <Meta property="og:title" content="عبر - الشروط والأحكام" />
        <Meta property="og:description" content="عالمك الخاص لتفسير الأحلام" />
        <Meta property="og:url" content="https://abber.netlify.app/terms" />
        <Meta property="og:image" content="/assets/images/logo.png" />
        <Meta property="twitter:title" content="عبر - الشروط والأحكام" />
        <Meta property="twitter:description" content="عالمك الخاص لتفسير الأحلام" />
        <Meta property="twitter:url" content="https://abber.netlify.app/terms" />
        <Meta property="twitter:image" content="/assets/images/logo.png" />
        <link rel="canonical" href="https://abber.netlify.app/terms" />
    </Head>


    <main class="min-h-screen outline-none">

        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
            <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
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


        <section
            class="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44 content">
            
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/clipboard-document-list -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" height="24" width="24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z">
                    </path>
                </svg>
            </div>
            <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">الشروط والأحكام</h1>
            <div class="pt-16 prose prose-sm prose-gray lg:prose-base" v-html="settings.policy_settings.terms"/>
            
        </section>

    </main>
</template>

<script setup lang="ts">


const {settings} = storeToRefs(useSettingsStore()) ;
const {getSettings} = useSettingsStore()
await getSettings()
definePageMeta({ auth: false })
</script>

<style>
.content h1 {
  @apply text-xl m-0 font-bold
}

.content img {
  @apply rounded-xl my-2
}

.content p, .content p:first-child {
  @apply my-4 text-[1rem]
}
</style>


