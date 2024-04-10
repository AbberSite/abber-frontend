<template>

  <Head>
    <title>عبر - استعادة كلمة المرور</title>
  </Head>
  <main class="min-h-screen outline-none">
    <!-- Hero section -->
    <HeroBackground/>
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
        <form method="POST" @submit.prevent="submit">
          <fieldset class="space-y-7">
            
            <TextInput
            name="email"
            type="email"
            v-model="email"
            :error="errors.email"
            label="البريد الألكتروني"
            placeholder="ادخل عنوان بريدك الإلكتروني" />

            <div>
              <!-- <button
                class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                type="button" @click="submit" href="/accounts/password/reset/done"> <span >إستعادة كلمة
                  المرور</span></button> -->


                <PrimaryButton class="w-full" :loading="loading">إستعادة كلمة المرور</PrimaryButton>
            </div>
          </fieldset>
        </form>
        <div class="pt-8 text-center text-sm xs:text-base"><a class="font-medium text-blue-600"
            href="/accounts/login">العودة لتسجيل الدخول <span aria-hidden="true">←</span></a></div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

definePageMeta({
  layout: false,
  auth: false
})

const { defineField, errors, validate, setErrors } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email("هذا الحقل يجب أن يكون ايميل").required("هذا الحقل يجب أن لا يكون فارغ"),
    }),
  ),
});



const [email] = defineField("email")
const loading = ref(false)


async function submit() {

  const validation = await validate()

  if (!validation.valid) return

  try {

    loading.value = true


    const response = await useFetch("/api/auth/reset-password", {
      method: 'POST',
      body: {
        email: email.value
      },
    })

    if(response.error.value){

      setErrors(response.error.value.data)
      loading.value = false

      return

    }

    if(response.data.value.sent){

      useRouter().push({name : "accounts-reset-password-sent"})

    }

    loading.value = false

  } catch (error) {
    alert("something is wrong i can feel it")
  }


}

</script>

<style scoped></style>