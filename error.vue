<template>

  <Head>
    <title>عبر - خطأ</title>

  </Head>

  <Header dir="rtl" />
  <main class="min-h-screen outline-none" dir="rtl">
<HeroBackground/>


    <section
      class="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32 lg:px-8 xl:pb-44 content">
      <h1 class="inline-flex rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white"
      id="error-heading">خطأ {{ error.statusCode }}</h1>
      <div class="text-center" v-if="errorState[error.statusCode]">
        <p class="pt-6 text-lg font-medium leading-[1.75] xs:text-xl 2xl:text-2xl">{{ errorState[error.statusCode].title }}</p>
        <p class="pt-4 text-center text-sm text-gray-600 xs:text-base">{{ errorState[error.statusCode].description }}</p>
      </div>
      <p dir="ltr" class="my-3">
        {{ error }}
      </p>

      <div class="mx-auto w-full max-w-sm pt-10">
        <NuxtLink to="/" class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800"
          > <span>الصفحة الرئيسية</span></NuxtLink>
        <div class="pt-4">
          <NuxtLink to="/blog" class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-medium shadow-sm hover:bg-gray-50"
            > <span class="ms-3">المدونة</span> </NuxtLink>
        </div>
      </div>
    </section>

  </main>
  <Footer dir="rtl" />
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})
const errorState = {
  404:{title: 'الصفحة غبر موجودة', description: 'عذرا, الصفحة التي تبحث عنها غير موجودة.'},
  500:{title: 'حدثت مشكلة في الاتصال', description: 'عذرا, قم بإعادة تحميل الصفحة.'},
  403:{title: 'انت محظور من هذه الصحفة', description: 'عذرا, لا يمكنك الوصول لهذه الصفحة.'},
  400:{title: 'طلب سيء', description: 'عذرا, لقد أرسل متصفحك طلبًا لا يمكن لهذا الخادم فهمه.'},
}
</script>

<style></style>