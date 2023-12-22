<template>


    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
          <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
          </div>
          <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
          </div>
        </section>
        <!-- Dream details form section -->
        <section class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32" aria-labelledby="dream-details-heading">
          <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
            <!-- Heroicon name: outline/identification  -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"></path>
            </svg>
          </div>
          <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="dream-details-heading">إدخال تفاصيل الحلم</h1>
          <div class="pt-4 text-sm text-gray-800 xs:text-base">أدخل معلوماتك و تفاصيل حلمك</div>
          <div class="mx-auto w-full max-w-sm pt-10">
            <form method="POST">
              <fieldset class="space-y-7">
                <div class="w-full space-y-3">
                  <label class="text-sm font-semibold xs:text-base" for="email">البريد الألكتروني</label>
                  <input class="form-control h-[50px] appearance-none" name="email" id="email" placeholder="اكتب عنوان بريدك الإلكتروني" autocomplete="email" required />
                </div>
                <div class="w-full space-y-3">
                  <label class="text-sm font-semibold xs:text-base" for="password">كلمة المرور</label>
                  <div class="relative" x-data="{ show: false }">
                    <input class="form-control h-[50px] appearance-none"  :type="show ? 'text' : 'password'" name="password" id="password" placeholder="اكتب كلمة المرور الخاصة بك" required/>
                    <button class="absolute h-[50px] items-center justify-center px-4 py-4 text-gray-600 hover:text-gray-900 ltr:right-0 rtl:left-0" type="button" @click="show = !show" title="اظهار/اخفاء كلمة المرور">
                      <svg :class="{ hidden: show }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <svg class="hidden" :class="{ hidden: !show }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <a class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800" href="/profile"> <span class="mt-1.5">متابعة</span></a>
                </div>
              </fieldset>
            </form>
            <nav class="pt-10" aria-label="Progress">
              <ol class="flex items-center justify-center space-x-5 rtl:space-x-reverse" role="list">
                <li>
                  <!-- Completed Step --><a class="block h-2.5 w-2.5 rounded-full bg-gray-900 hover:bg-indigo-900" href="#"><span class="sr-only">الخطوة الأولى</span></a>
                </li>
                <li>
                  <!-- Current Step --><a class="relative flex items-center justify-center" href="#" aria-current="step"
                    ><span class="absolute flex h-5 w-5 p-px" aria-hidden="true"><span class="h-full w-full rounded-full bg-gray-200"></span></span><span class="relative block h-2.5 w-2.5 rounded-full bg-gray-900" aria-hidden="true"></span><span class="sr-only">الخطوة الثانية</span></a
                  >
                </li>
                <li>
                  <!-- Upcoming Step --><a class="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400" href="#"><span class="sr-only">الخطوة الثالثة</span></a>
                </li>
                <li>
                  <!-- Upcoming Step --><a class="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400" href="#"><span class="sr-only">الخطوة الرابعة</span></a>
                </li>
              </ol>
            </nav>
          </div>
        </section>
      </main>
</template>

<script setup lang="ts">


const show = ref(false)

</script>

<style scoped>

</style>