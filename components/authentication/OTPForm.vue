<template>
  <form method="POST" @submit.prevent="login">
    <fieldset class="space-y-5">
      <!-- <h1 class="font-bold" v-if="usePIN_">رمز التأكد (PIN)</h1> -->
      <!-- <h1 class="font-bold" v-else>رمز التأكد (OTP)</h1> -->
      <OtpInput v-model="OTP" @done="waitForLogin()" />
      <div class="text-red-700 font-medium" v-if="error">{{ error }}</div>
      <div class="flex justify-between space-x-2">
        <span class="text-center text-sm xs:text-base font-medium" @click="resendOTP" :class="[counter <= 0 && !loading ? 'text-blue-600 cursor-pointer' : 'text-gray-600 cursor-no-drop']" v-text="usePIN_?'إستعادة رمز PIN':'إعادة الإرسال بواسطة ' + (sender == 'whatsapp' ? 'الواتساب':'SMS')"></span>
        <span class="text-sm text-gray-600" v-text="counter" v-if="counter > 0"></span>
      </div>
      <div class="flex justify-start font-medium text-blue-600 cursor-pointer" v-if="currentPhone.startsWith('+966') && !loading && !usePIN_ && sender == 'whatsapp'" @click="sendViaSMS">
        إذا ما وصلك واتس، جرب SMS
      </div>
      <div>
        <PrimaryButton class="w-full" :loading="loading" :disabled="OTP.length < 4"> متابعة </PrimaryButton>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
const props=defineProps<{ sender?: string; }>();
const emit = defineEmits(["logged-in","use-PIN", "update:sender"]);
// let sender = ref(props.sender);

const { rawRefreshToken, rawToken } = useAuthState();

const { refresh } = useAuth();

const { currentPhone } = storeToRefs(useAuthStore());

const usePIN_ = ref(true)
const OTP = ref([]);
const error = ref("");

const loading = ref(false);
const counter = ref(usePIN_.value?0:30);

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
  if (usePIN_.value === true){
        useNotification({type: 'success', content: 'تم إرسال رمز التحقق'});
        usePIN_.value = false;
        emit('use-PIN')

  }
  await useApi("/api/auth/whatsapp/send?sender=" + (props.sender == 'whatsapp' ? "whatsapp":"sms"), {
    method: "POST",
    body: {
      phone: currentPhone.value,
    },
  });
  loading.value = false;
  setCounter();
};

// Add this method to your script
const sendViaSMS = async () => {
  try {
    loading.value = true;
    await useApi("/api/auth/whatsapp/send?sender=sms", {
      method: "POST",
      body: {
        phone: currentPhone.value,
      },
    });
    // Update the sender to SMS after successful request
    emit('update:sender', 'sms');
    useNotification({ type: 'success', content: 'تم إرسال رمز التحقق عبر SMS' });
    setCounter();
  } catch (error) {
    useNotification({ type: 'error', content: 'حدث خطأ أثناء الإرسال' });
  } finally {
    loading.value = false;
  }
};

async function login() {
  error.value = "";

  try {
    if (OTP.value.length < 4) {
      error.value = "يجب ملء كل الحقول";
      return;
    }

    loading.value = true;


    const { data } = (await useFetch((usePIN_.value?"/api/auth/whatsapp/pin":"/api/auth/whatsapp/otp"), {
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
  usePIN_.value = window.localStorage.getItem("setPIN") == "1"
  if(!usePIN_.value){
    
  setCounter();
  }
});
</script>

<style></style>
