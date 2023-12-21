<template>
    <Head>
        <title>عبر - تسجيل الدخول</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
            <div
                class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div
                    class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "></div>
            </div>
            <div
                class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div
                    class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "></div>
            </div>
        </section>
        <!-- Login form section -->
        <section
            class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32"
            aria-labelledby="login-heading">
            <h1 class="sr-only" id="login-heading">تسجيل الدخول</h1>
            <img class="aspect-square" src="/assets/images/logo.webp" height="70" width="70" alt="شعار منصة عبر" />
            <div class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">مرحبا بعودتك مجددا</div>
            <div class="pt-4 text-sm text-gray-800 xs:text-base">الرجاء تسجيل الدخول الى حسابك</div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <form @submit.prevent="submit">
                    <fieldset class="space-y-7">
                        <div class="w-full space-y-3">
                            <label class="text-sm font-semibold xs:text-base" for="email">البريد الألكتروني</label>
                            <input
                                v-model="email"
                                class="form-control h-[50px] appearance-none"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="البريد الألكتروني"
                                autocomplete="email"
                                required />
                            <div class="text-red-500 text-sm">
                                {{ errors.email }}
                            </div>
                        </div>
                        <div class="w-full space-y-3">
                            <label class="text-sm font-semibold xs:text-base" for="password">كلمة المرور</label>
                            <div class="relative">
                                <input
                                    v-model="password"
                                    class="form-control h-[50px] appearance-none"
                                    :type="show ? 'text' : 'password'"
                                    name="password"
                                    id="password"
                                    placeholder="كلمة المرور"
                                    required />

                                <button
                                    class="absolute h-[50px] items-center justify-center px-4 py-4 text-gray-600 hover:text-gray-900 ltr:right-0 rtl:left-0"
                                    type="button"
                                    @click="show = !show"
                                    title="اظهار/اخفاء كلمة المرور">
                                    <svg
                                        :class="{ hidden: show }"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        height="20"
                                        width="20">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <svg
                                        :class="{ hidden: !show }"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        height="20"
                                        width="20">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="text-red-500 text-sm">
                                {{ errors.password }}
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-sm xs:text-base">
                            <div class="flex items-center">
                                <input
                                    class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
                                    type="checkbox"
                                    name="remember"
                                    id="id_remember" />
                                <label class="mt-1.5 ps-3 font-semibold" for="id_remember">تذكرني</label>
                            </div>
                            <NuxtLink class="mt-1.5 font-semibold" :to="{ name: 'accounts-reset-password' }">
                                نسيت كلمة المرور؟
                            </NuxtLink>
                        </div>
                        <div>
                            <div class="text-red-500 text-sm my-7">
                                {{ error }}
                            </div>

                            <PrimaryButton class="w-full" :loading="loading"> تسجيل الدخول </PrimaryButton>
                        </div>
                    </fieldset>
                </form>
                <div class="pt-4">
                    <button
                        class="flex h-[50px] w-full items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50"
                        @click="googleLogin"
                        >
                        <svg
                            class="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="24"
                            height="24"
                            viewBox="0 0 48 48">
                            <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        <span class="ms-3 mt-1.5">سجل دخولك بواسطة جوجل</span>
                    </button>
                </div>
                <div class="pt-4">
                    <NuxtLink
                        class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50"
                        :to="{ name: 'accounts-whatsapp-login' }">
                        <svg
                            class="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48">
                            <path
                                fill="#40c351"
                                d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
                            <path
                                fill="#fff"
                                fill-rule="evenodd"
                                d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="ms-3 mt-1.5">سجل دخولك بواسطة واتساب</span>
                    </NuxtLink>
                </div>
                <div class="pt-4">
                    <RouterLink
                        class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50"
                        to="#">
                        <svg
                            class="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="22"
                            height="22"
                            viewBox="0 0 48 48">
                            <path
                                d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                        </svg>
                        <span class="ms-3 mt-1.5">سجل دخولك بواسطة ابل ايدي</span>
                    </RouterLink>
                </div>
                <div class="space-x-1 pt-8 text-center text-sm rtl:space-x-reverse xs:text-base">
                    <span>ليس لديك حساب؟</span>
                    <a class="font-medium text-blue-600" href="/accounts/register">سجل الان</a>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    import { useForm } from 'vee-validate';
    import { toTypedSchema } from '@vee-validate/yup';
    import * as yup from 'yup';

    definePageMeta({
        middleware: 'auth',
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/',
        },
        layout: false,
    });

    const { signIn } = useAuth();

    const { defineField, errors, validate } = useForm({
        validationSchema: toTypedSchema(
            yup.object({
                email: yup.string().email('هذا الحقل يجب أن يكون ايميل').required('هذا الحقل يجب أن لا يكون فارغ'),
                password: yup.string().required('كلمة السر يجب أن لا تكون فارغة'),
            }),
        ),
    });

    const [email] = defineField('email');
    const [password] = defineField('password');
    const show = ref(false);
    const error = ref('');
    const loading = ref(false);

    let googleLogin = () => console.log("google not initialized yet");
    

    onMounted(async () => {
        const googleProvider : any = await useGoogleProvider();


         googleLogin = googleProvider.useGoogleLogin({
            flow: 'auth-code',
            onSuccess: (codeResponse : { code : string}) => {

                alert(JSON.stringify(codeResponse))
                
                useFetch("/api/auth/google", {
                    method: "POST", 
                    body : {
                        code : codeResponse.code
                    }
                })


            },
        });
    });

    async function submit() {
        const validation = await validate();

        if (!validation.valid) return;

        loading.value = true;

        signIn(
            { email: email.value, password: password.value },
            {
                callbackUrl: '/',
                redirect: true,
            },
        )
            .then(() => {
                useNotification({ type: 'success', content: 'تم تسجيل دخولك بنجاح' });
            })
            .catch((_error) => {
                if (_error.response._data.status !== 'error') return;

                error.value = _error.response._data.error;
            })
            .finally(() => (loading.value = false));
    }
</script>

<style scoped></style>
