<template>
    <section
      class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
      aria-labelledby="login-heading">
      <AuthenticationHeading/>
      <div class="mx-auto w-full max-w-sm pt-10">
        <form @submit.prevent="submit">
          <fieldset class="space-y-7">

            <TextInput name="email" type="email" v-model="email" :error="errors.email" label="البريد الألكتروني"
              placeholder="ادخل عنوان بريدك الإلكتروني" />

            <TextInput v-model="password" :type="show ? 'text' : 'password'" name="password"
              placeholder="ادخل كلمة المرور الخاصة بك" label="كلمة المرور" :error="errors.password">

              <template #append>
                <button
                  class="absolute h-[50px] items-center justify-center px-4 py-4 text-gray-600 hover:text-gray-900 ltr:right-0 rtl:left-0"
                  type="button" @click="show = !show" title="اظهار/اخفاء كلمة المرور">
                  <svg :class="{ hidden: show }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                    </path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <svg :class="{ hidden: !show }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88">
                    </path>
                  </svg>
                </button>
              </template>
            </TextInput>

            <div class="flex items-center justify-between text-sm xs:text-base">
              <div class="flex items-center">
                <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="remember"
                  id="id_remember" />
                <label class="mt-1.5 ps-3 font-semibold" for="id_remember">تذكرني</label>
              </div>
              <NuxtLink class="mt-1.5 font-semibold" :to="{ name: 'accounts-reset-password' }">
                نسيت كلمة المرور؟
              </NuxtLink>
            </div>
            <div>
              <InputError :message="error" />

              <PrimaryButton class="w-full" :loading="loading"> تسجيل الدخول </PrimaryButton>
            </div>
          </fieldset>
        </form>

        <AuthenticationSocialLogin />

        <div class="space-x-1 pt-8 text-center text-sm rtl:space-x-reverse xs:text-base">
          <span>ليس لديك حساب؟</span>
          <NuxtLink class="font-medium text-blue-600" :to="{ name: 'accounts-signup' }">سجل الان</NuxtLink>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';



const { signIn } = useAuth();

const { defineField, errors, validate } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email('هذا الحقل يجب أن يكون بريد الكتروني صحيح').matches(/[^a-zA-z0-9._%+-]+[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/, 'يجب ادخال ايميل صحيح').required('هذا الحقل مطلوب'),
      password: yup.string().required("هذا الحقل مطلوب")
    })
  )
});

const [email] = defineField('email');
const [password] = defineField('password');
const show = ref(false);
const error = ref('');
const loading = ref(false);

async function submit() {
  const validation = await validate();

  if (!validation.valid) return;

  loading.value = true;

  signIn(
    { email: email.value, password: password.value },
    {
      callbackUrl: '/profile?status=new',
      redirect: true
    }
  )
    .then(() => {
      useNotification({ type: 'success', content: 'تم تسجيل دخولك بنجاح' });
    })
    .catch((_error) => {

      console.log(_error);

      if (_error.response._data.status !== 'error') return;

      error.value = _error.response._data.error;
    })
    .finally(() => (loading.value = false));

}
</script>