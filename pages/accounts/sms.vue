<template>

    <Head>
        <title>عبر - تسجيل الدخول</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
            <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
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
        <section
            class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="forget-password-heading">
            <h1 class="sr-only" id="login-heading">تسجيل الدخول</h1>
            <NuxtImg class="aspect-square" src="/images/logo.webp" height="70" width="70" alt="شعار منصة عبر" />
            <div class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">مرحبا بعودتك مجددا</div>
            <div class="pt-4 text-sm text-gray-800 xs:text-base">الرجاء تسجيل الدخول الى حسابك</div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <form method="POST" @submit.prevent="send">
                    <fieldset class="space-y-7">
                        <div class="w-full space-y-3">
                            <!-- <label class="text-sm font-semibold xs:text-base" for="tel">رقم الواتساب</label>
                            <input class="form-control h-[50px] appearance-none" type="tel" name="phone" id="tel"
                                placeholder="7835196169" autocomplete="tel" required /> -->

                            <PhoneInput v-model="phone" v-model:valid="valid" />
                            <div class="text-red-500 text-sm">
                                {{ errors.phone }}
                            </div>
                        </div>
                        <div>
                            <!-- <button
                                class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                                href="/accounts/whatsapp/opt"> <span class="mt-1.5">
                                    <Loading  v-if="loading"/>
                                    <span v-else>متابعة</span>
                                 </span></button>
 -->

                            <PrimaryButton class="w-full" :loading="loading"> متابعة </PrimaryButton>
                        </div>
                    </fieldset>
                </form>
                <SocialLogin />

                <div class="space-x-1 pt-8 text-center text-sm rtl:space-x-reverse xs:text-base">
                    <span>ليس لديك حساب؟</span>
                    <NuxtLink class="font-medium text-blue-600" :to="{ name: 'accounts-signup' }">سجل الان </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    },
    layout: false
});
useHead({
    script: [
        {
            src: "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
            type: "text/javascript",
        }
    ]
})
const router = useRouter();

const phone = ref('');
const loading = ref(false);

const errors = ref<{
    phone?: string;
}>({});
const valid = ref(false);

async function send() {
    if (!valid.value) return;

    try {
        loading.value = true;
        const { data } = (await useFetch('/api/auth/whatsapp/send?sender=sms', {
            method: 'POST',

            body: {
                phone: phone.value
            }
        })) as {
            data: Ref<{
                phone?: string;
                registered?: boolean;
                message?: string;
                status?: string;
            }>;
        };

        if (!data.value.registered) {
            errors.value.phone = 'هذا الرقم غير مسجل ';
            loading.value = false;

            return;
        }

        const { currentPhone } = storeToRefs(useAuthStore());

        currentPhone.value = phone.value;

        sessionStorage.setItem('abber:whatsapp-number', phone.value);

        router.push({ name: 'accounts-whatsapp-otp' });
    } catch (error: any) {
        alert('error');

        console.log(error.response);
    }

    loading.value = false;
}
</script>

<style scoped></style>
