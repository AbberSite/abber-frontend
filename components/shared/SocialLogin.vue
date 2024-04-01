<template>
  <div class="pt-4">
    <button class="flex h-[50px] w-full items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50" @click="googleLogin">
      <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
      <span class="ms-3 mt-1.5">سجل دخولك بواسطة جوجل</span>
    </button>
  </div>
  <div class="pt-4">
    <NuxtLink class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50" :to="{ name: 'accounts-whatsapp-login' }">
      <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
        <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
        <path
          fill="#fff"
          fill-rule="evenodd"
          d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="ms-3 mt-1.5">سجل دخولك بواسطة واتساب</span>
    </NuxtLink>
  </div>
  <div class="pt-4">
    <button @click="appleLogin" class="flex h-[50px] w-full items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50">
      <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 48 48">
        <path
          d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"
        ></path>
      </svg>
      <span class="ms-3 mt-1.5">سجل دخولك بواسطة ابل ايدي</span>
    </button>
  </div>

  <div class="pt-4">
    <NuxtLink class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50" :to="{ name: route.name == 'accounts-login' ? 'accounts-sms' : 'accounts-login' }">
      <svg v-if="route.name != 'accounts-login'" class="text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="22" with="22">
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"></path>
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"></path>
      </svg>

      <svg v-else class="text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="22" with="22">
        <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd"></path>
      </svg>
      <span class="ms-3 mt-1.5">سجل دخولك بواسطة {{ route.name == "accounts-login" ? "SMS" : "البريد" }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
let googleLogin = () => console.log("google not initialized yet");

const route = useRoute();
const redirectURI = window.location.origin + "/";

onMounted(async () => {
  const googleProvider: any = await useGoogleProvider();

  googleLogin = googleProvider.useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response: { access_token: string }) => {
      const { data } = await useFetch("/api/auth/google", {
        method: "POST",
        body: {
          access_token: response.access_token,
        },
      });

      await useAuthenticateUser(data.value);

      await useRouter().push({ name: "index" });

      useNotification({ type: "success", content: "تم تسجيل دخولك بنجاح" });
    },
  });
  const time = new Date();

  AppleID.auth.init({
    clientId: "co.abber.signin",
    scope: "name email",
    redirectURI: redirectURI,
    state: time.toString(),
    usePopup: true,
  });
});

async function appleLogin() {
  try {
    const data = await AppleID.auth.signIn();
    console.log("apple login", data);

    const loginData = await useProxy("/authentication/apple/connect/", {
      method: "POST",
      body: {
        id_token: data.authorization.id_token,
        code: data.authorization.code,
        callback_url: redirectURI
      }    });

    console.log("apple login data", loginData);

    await useAuthenticateUser(loginData.value);

    await useRouter().push({ name: "index" });

    useNotification({ type: "success", content: "تم تسجيل دخولك بنجاح" });

    // Handle successful response.
  } catch (error) {
    // Handle error.
    console.log("apple login error", error);
  }
}
</script>

<style scoped></style>
