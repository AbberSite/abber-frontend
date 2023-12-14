<template>
  <main class="min-h-screen outline-none">
    <!-- Hero section -->
    <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
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
      <h1 class="sr-only" id="forget-password-heading">إستعادة كلمة المرور</h1>
      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
        <!-- Heroicon name: outline/key -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z">
          </path>
        </svg>
      </div>
      <div class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">نسيت كلمة المرور؟</div>
      <div class="pt-4 text-sm text-gray-800 xs:text-base">لا تقلق، سوف نرسل لك تعليمات إعادة التعيين</div>
      <div class="mx-auto w-full max-w-sm pt-10">
        <form method="POST">
          <fieldset class="space-y-7">
            <div class="w-full space-y-3">
              <label class="text-sm font-semibold xs:text-base" for="email">البريد الألكتروني</label>
              <input v-model="email" class="form-control h-[50px] appearance-none" type="email" name="email" id="email"
                placeholder="البريد الألكتروني" autocomplete="email" required />
              <span class="text-red-500 text-sm ">
                {{ errors.email }}
              </span>
            </div>
            <div>
              <button
                class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                type="button" @click="submit" href="/accounts/password/reset/done"> <span class="mt-1.5">إستعادة كلمة
                  المرور</span></button>
            </div>
          </fieldset>
        </form>
        <div class="pt-8 text-center text-sm xs:text-base"><a class="font-medium text-blue-600"
            href="/accounts/login">العودة لتسجيل الدخول ←</a></div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

definePageMeta({
  layout: false
})

const { defineField, errors, validate } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email("هذا الحقل يجب أن يكون ايميل").required("هذا الحقل يجب أن لا يكون فارغ"),
    }),
  ),
});


const authStore = useAuthStore()


const [email] = defineField("email")


async function submit() {

  const validation = await validate()

  if (!validation.valid) return

  const { data } = await useFetch("/api/auth/reset-password", {
    method: 'POST',
    body: {
      email: email.value
    },
  })

}

</script>

<style scoped></style>