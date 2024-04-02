<template>

  <Head>
    <title>عبر - خطأ</title>

  </Head>

  <Header dir="rtl" />
  <main class="min-h-screen outline-none" dir="rtl">

    <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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


    <section
      class="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44 content">

      <h1 class="inline-flex rounded-full bg-gray-900 px-4 pb-1.5 pt-2 text-xs font-semibold text-white"
        id="error-heading">خطأ {{ error.statusCode }}</h1>
      <div class="text-center" v-if="error.statusCode == 404">
        <p class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">الصفحة غبر موجودة</p>
        <p class="pt-4 text-center text-sm text-gray-800 xs:text-base">عذرا, الصفحة التي تبحث عنها غير موجودة.</p>
      </div>

      <div class="text-center" v-if="error.statusCode == 500">
        <p class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">حدثت مشكلة في الاتصال</p>
        <p dir="ltr">{{ error }}</p>
        <p class="pt-4 text-center text-sm text-gray-800 xs:text-base">عذرا, قم بإعادة تحميل الصفحة.</p>
      </div>

      <div class="text-center" v-if="error.statusCode == 403">
        <p class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">انت محظور من هذه الصحفة</p>
        <p class="pt-4 text-center text-sm text-gray-800 xs:text-base">عذرا, لا يمكنك الوصول لهذه الصفحة.</p>
      </div>
      <div class="text-center" v-if="error.statusCode == 400">
        <p class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">طلب سيء</p>
        <p class="pt-4 text-center text-sm text-gray-800 xs:text-base">عذرا, لقد أرسل متصفحك طلبًا لا يمكن لهذا الخادم فهمه.</p>
      </div>

      <div class="mx-auto w-full max-w-sm pt-10">
        <NuxtLink to="/" class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          > <span class="mt-1.5">الصفحة الرئيسية</span></NuxtLink>
        <div class="pt-4">
          <NuxtLink to="/blog" class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50"
            > <span class="ms-3 mt-1.5">المدونة</span> </NuxtLink>
        </div>
      </div>
    </section>

  </main>
  <Footer dir="rtl" />
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<style></style>