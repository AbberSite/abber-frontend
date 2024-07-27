<template>

  <Head>
    <title>عبر - تعيين كلمة مرور جديدة</title>
  </Head>
  <main class="min-h-screen outline-none">
    <!-- Hero section -->
    <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
        </div>
      </div>
      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
        </div>
      </div>
    </section>
    <!-- Forget password form section -->
    <section class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-14 xs:px-6"
      aria-labelledby="forget-password-heading">
      <h1 class="sr-only" id="forget-password-heading">تعيين كلمة مرور جديدة</h1>
      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
        <!-- Heroicon name: outline/check-circle -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div class="pt-8 text-lg font-medium xs:text-xl 2xl:text-2xl">تم إعادة تعيين كلمة المرور</div>
      <div class="pt-4 text-center text-sm text-gray-600 xs:text-base">
        <p>لقد تم إعادة تعيين كلمة المرور الخاصة بك بنجاح.</p>
        <div>انقر أدناه لتسجيل الدخول</div>
      </div>
      <div class="mx-auto w-full max-w-sm pt-10">
        <NuxtLink :to="{ name: 'accounts-login' }"
          class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800">
          <span>تسجيل الدخول</span>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">

definePageMeta({
    layout: false
})

</script>

<style scoped></style>