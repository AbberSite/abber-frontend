<template>
  <Head>
    <title v-if="props.isFormSteps">عبر - طلب تعبير حلم - الدخول بواتساب</title>
  </Head>
  <section :class="{ 'relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-36 pt-20 md:pt-32 xs:px-6': !props.isFormSteps }" aria-labelledby="forget-password-heading">
    <AuthenticationHeading whatsapp v-if="!props.isFormSteps" />
    <div class="mx-auto w-full max-w-sm pt-10">
      <form method="POST" @submit.prevent="send">
        <fieldset class="space-y-5">
          <div class="w-full space-y-3">
            <LazyPhoneInput v-model="phone" v-model:valid="valid" :error="errors.phone" />
          </div>
          <div>
            <PrimaryButton class="w-full" :loading="loading">
              متابعة
            </PrimaryButton>
          </div>
        </fieldset>
      </form>
      <LazyAuthenticationSocialLogin :isFormSteps="isFormSteps" :isFormPackage="isFormPackage" />
    </div>
  </section>
</template>

<script setup lang="ts">
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
    const { data } = (await useFetch("/api/auth/whatsapp/send?sender=whatsapp", {
      method: "POST",
      body: {
        no_otp: true,
        phone: phone.value,
      },
    })) as {
      data: Ref<{
        phone?: string;
        registered?: boolean;
        pin?: boolean;
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

    if (data.value.pin == true) {
      window.localStorage.setItem("setPIN", "1");
    } else {
      console.log("not pin");
      //             window.localStorage.setItem('setPIN', "0");
      //              await useApi("/api/auth/whatsapp/send?sender=whatsapp", {
      //     method: "POST",
      //     body: {
      //       phone: phone.value,
      //     },
      //   });
    }

    const { currentPhone } = storeToRefs(useAuthStore());

    currentPhone.value = phone.value;

    sessionStorage.setItem("abber:whatsapp-number", phone.value);

    if (!props.isFormSteps) router.push({ name: "accounts-whatsapp-otp", query: { sender: "whatsapp" } });
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
            state.value.data ? (state.value.data.authenticationMethod = "whatsapp") : undefined;
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
