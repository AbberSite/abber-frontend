<template>
  <form method="POST" @submit.prevent="login">
    <fieldset class="space-y-5">
      <h1 class="font-bold">رمز التأكد (OTP)</h1>
      <OtpInput v-model="OTP" @done="waitForLogin()" />
      <div class="text-red-700 font-medium" v-if="error">{{ error }}</div>
      <div class="flex justify-between space-x-2">
        <span class="text-center text-sm xs:text-base font-medium" @click="resendOTP" :class="[counter <= 0 && !loading ? 'text-blue-600 cursor-pointer' : 'text-gray-600 cursor-no-drop']">إعادة ارسال</span>
        <span class="text-sm text-gray-600" v-text="counter" v-if="counter > 0"></span>
      </div>
      <div>
        <PrimaryButton class="w-full" :loading="loading"> تسجيل الدخول </PrimaryButton>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
defineProps<{ sender?: string }>();
const emit = defineEmits(["logged-in"]);

const { rawRefreshToken, rawToken } = useAuthState();

const { refresh } = useAuth();

const { currentPhone } = storeToRefs(useAuthStore());

const OTP = ref([]);
const error = ref("");

const loading = ref(false);
const counter = ref(30);

const setCounter = () => {
  counter.value = 30;
  const interval = setInterval(() => {
    counter.value--;
    if (counter.value <= 0) {
      clearInterval(interval);
    }
  }, 1000);
};

const resendOTP = async () => {
  loading.value = true;
  await useApi("/api/auth/whatsapp/send?sender=whatsapp", {
    method: "POST",
    body: {
      phone: currentPhone.value,
    },
  });
  loading.value = false;
  setCounter();
};

async function login() {
  error.value = "";

  try {
    if (OTP.value.length < 4) {
      error.value = "يجب ملء كل الحقول";
      return;
    }

    loading.value = true;

    const { data } = (await useFetch("/api/auth/whatsapp/otp", {
      method: "POST",

      body: {
        phone: currentPhone.value,
        key: `${OTP.value[0]}${OTP.value[1]}${OTP.value[2]}${OTP.value[3]}`,
      },

      async onResponse({ response }) {
        if (response.status !== 200) return;

        rawRefreshToken.value = response._data.refreshToken;
        rawToken.value = response._data.token;

        await refresh();
        emit("logged-in");
      },
      async onResponseError({ response }) {
        if (response?._data?.otp) {
          error.value = response._data.otp;
        }
      },
    })) as {
      data: Ref<{
        token?: string;
        refreshToken?: string;
        user: object;
      }>;
    };
  } catch (error) {
  } finally {
    loading.value = false;
  }
}

function waitForLogin() {
  setTimeout(() => {
    login();
  }, 200);
}

onMounted(() => {
  setCounter();
});
</script>

<style></style>
