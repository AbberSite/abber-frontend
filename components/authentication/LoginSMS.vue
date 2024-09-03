<template>
  <Head>
    <title v-if="props.isFormSteps">عبر - طلب تعبير حلم - تسجيل الدخول برقم الهاتف</title>
  </Head>
  <section :class="{ 'relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32 lg:px-8 xl:pb-44': !props.isFormSteps }" aria-labelledby="forget-password-heading">
    <AuthenticationHeading v-if="!props.isFormSteps" />
    <div class="mx-auto w-full max-w-sm pt-10">
      <form method="POST" @submit.prevent="send">
        <fieldset class="space-y-5">
          <div class="w-full space-y-3">
            <LazyPhoneInput v-model="phone" v-model:valid="valid" :sms="true" placeholder="5XXXXXXXX" :error="errors.phone" />
          </div>
          <div>
            <PrimaryButton class="w-full" :loading="loading"> متابعة </PrimaryButton>
          </div>
        </fieldset>
      </form>
      <LazyAuthenticationSocialLogin :isFormSteps="isFormSteps" :isFormPackage="isFormPackage" />

      <div class="space-x-1 pt-8 text-center text-sm rtl:space-x-reverse xs:text-base" v-if="!isFormSteps">
        <span>ليس لديك حساب؟</span>
        <NuxtLink class="text-blue-600" :to="{ name: 'accounts-signup' }">سجل الان </NuxtLink>
      </div>
    </div>
  </section>

</template>

<script setup lang="ts">
import type { packagesFormSteps } from "~/types";
const router = useRouter();
const props = defineProps<{ isFormSteps?: boolean; isFormPackage?: boolean }>();

const phone = ref("");
const loading = ref(false);

const errors = ref<{
  phone?: string;
}>({});
const valid = ref(false);

async function send() {
  if (!valid.value) {
    if (!errors.value.length) errors.value.phone = "هذا الحقل مطلوب";
    return;
  }
  try {
    loading.value = true;
    const { data } = (await useFetch("/api/auth/whatsapp/send?sender=sms", {
      method: "POST",

      body: {
        no_otp:(window.localStorage.getItem('setPIN')=="1"),
        phone: phone.value,
      },
    })) as {
      data: Ref<{
        phone?: string;
        registered?: boolean;
        message?: string;
        status?: string;
      }>;
    };

    if (!data.value.registered) {
      if (props.isFormSteps) errors.value.phone = "هذا الرقم غير مسجل ";
      else {
        useNotification({ type: "info", content: "الرقم غير مسجل، يمكنك انشاء حساب به." });
        navigateTo("/accounts/signup/");
      }
      loading.value = false;
      return;
    }

    const { currentPhone } = storeToRefs(useAuthStore());

    currentPhone.value = phone.value;

    sessionStorage.setItem("abber:whatsapp-number", phone.value);
    if (!props.isFormSteps) router.push({ name: "accounts-whatsapp-otp" });
    else {
      let next, state;
      if (props.isFormSteps && !props.isFormPackage) {
        next = useFormWizard<OrderForm>("order").next;
        state = useFormWizard<OrderForm>("order").state;
      } else {
        next = useFormWizard<packagesFormSteps>("packages").next;
        state = useFormWizard<packagesFormSteps>("packages").state;
      }
      next({
        nextStepId: "authentication",
        options: {
          ignore: true,
          previous: () => {
            state.value.data ? (state.value.data.authenticationMethod = "login-sms") : undefined;
          },
        },
        data: {
          authenticationMethod: "otp",
        },
      });
    }
  } catch (error) {
    alert("error");

    console.log(error.response);
  }

  loading.value = false;
}
</script>
