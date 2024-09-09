<template>
  <Head>
    <title>عبر - رمز الوصول السريع</title>
  </Head>
  <Header />
  <main class="min-h-screen outline-none">
    <!-- Hero section -->
    <HeroBackground />
    <!-- Change password form section -->
    <section class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="change-password-heading">
      <h1 class="sr-only" id="change-password-heading">تغيير كلمة المرور</h1>
      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
        <!-- Heroicon name: outline/lock -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
        </svg>
      </div>
      <!-- <span class="font-medium text-lg">* * * *</span> -->
      <template v-if="pin.length != 4">
        <div class="pt-8 text-lg font-medium xs:text-xl 2xl:text-2xl">رمز الوصول السريع</div>
        <div class="pt-4 text-sm text-gray-600 xs:text-base">قم بتعيين رمز من 4 أرقام للدخول السريع.</div>
      </template>
      <template v-else>
        <div class="pt-8 text-lg font-medium xs:text-xl 2xl:text-2xl">تأكيد رمز الوصول السريع</div>
        <div class="pt-4 text-sm text-gray-600 xs:text-base">قم بتأكيد رمز الوصول السريع مرة أخرى .</div>
      </template>
      <div class="mx-auto w-full max-w-sm pt-10">
        <form @submit.prevent="submit">
          <fieldset class="space-y-7">
            <div class="w-full space-y-3">
              <div class="relative">
                <OtpInput v-model="pin" />
              </div>
              <div class="relative">
                <OtpInput v-model="pinConfirmation" @done="allowConfirm = true" :disabled="pin.length != 4" />
              </div>
              <InputError v-for="message in errors.pin" :message="message" />
            </div>

            <div>
              <PrimaryButton :loading="loading" class="w-full" :disabled="!(allowConfirm && pin.length == 4 && pinConfirmation.length == 4)">تأكيد</PrimaryButton>
            </div>
          </fieldset>
        </form>
        <div class="pt-8 text-center text-sm xs:text-base">
          <NuxtLink v-if="pin.length != 4" class="font-medium text-blue-600" :to="{ name: 'profile' }"><span aria-hidden="true">→</span> العودة للصفحة الشخصية </NuxtLink>
          <button
            v-else
            @click="
              pin = [];
              pinConfirmation = [];
              errors.pin = [];
            "
            class="font-medium text-blue-600"
          >
            <span aria-hidden="true">→</span>رجوع
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: false,
});

const pin = ref("");
const pinConfirmation = ref("");
const errors = ref<{
  pin?: Array<string>;
}>({});
const loading = ref(false);
const router = useRouter();
const allowConfirm = ref(false);
async function submit() {
  const pin_ = pin.value.join("");
  const pinConfirmation_ = pinConfirmation.value.join("");

  console.log(pin.value, pinConfirmation.value);
  if (pin_ !== pinConfirmation_) {
    errors.value.pin = ["رمز الوصول السريع غير متطابق"];
    return;
  }
  try {
    loading.value = true;
    await useDirectApi("/authentication/pin/set/", {
      method: "POST",
      body: {
        pin: pin_,
      },
    });
    window.localStorage.setItem("setPIN", "1");

    // await signOut({ redirect: false });
    useNotification({ type: "success", content: `تم تعيين الرمز ${pin_} بنجاح. يرجى استخدامه عند تسجيل الدخول في المرة القادمة` });

    await router.push("/");
  } catch (error) {
    errors.value = error.response._data;
  }

  loading.value = false;
}
</script>

<style scoped></style>
