<template>

    <Head>
        <title>عبر - تسجيل الدخول</title>
    </Head>
    <main class="min-h-screen outline-none">
        <HeroBackground />
        <section class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-14 xs:px-6"
            aria-labelledby="forget-password-heading">
            <h1 class="sr-only" id="forget-password-heading">تسجيل الدخول</h1>
            <div class="rounded-md border border-gray-300 px-2 py-2 shadow-sm">
                <svg v-if="sender === 'whatsapp'" class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" x="0px"
                    y="0px" width="32" height="32" viewBox="0 0 48 48">
                    <path fill="#40c351"
                        d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z">
                    </path>
                    <path fill="#fff" fill-rule="evenodd"
                        d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                        clip-rule="evenodd"></path>
                </svg>

                <svg v-else class="text-blue-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" height="22" with="22">
                    <path
                        d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z">
                    </path>
                    <path
                        d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z">
                    </path>
                </svg>
            </div>
            <div class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">تسجيل الدخول</div>
            <div class="pt-4 text-sm text-gray-800 xs:text-base" v-if="sender == 'whatsapp'">
                أدخل رمز التحقق الذي تم إرساله الى حسابك في الواتساب
            </div>
            <div class="pt-4 text-sm text-gray-800 xs:text-base" v-else>
                أدخل رمز التحقق الذي تم إرساله الى رقمك على SMS
            </div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <form method="POST" @submit.prevent="login">
                    <fieldset class="space-y-7">
                        <h1 class="font-bold" >رمز التأكد (OTP)</h1>
                        
                        <OtpInput v-model="my_opt" @done="login()"/>


                      

                        <div class="text-red-700 font-semibold" v-if="error">{{ error }}</div>
                        <div>
                            <PrimaryButton class="w-full" :loading="loading"> تسجيل الدخول </PrimaryButton>
                        </div>
                    </fieldset>
                </form>
                <div class="pt-8 text-center text-sm xs:text-base">
                    <NuxtLink class="font-medium text-blue-600"
                        :to="{ name: sender === 'whatsapp' ? 'accounts-whatsapp-login' : 'accounts-sms' }">
                        العودة للصفحة السابقة <span aria-hidden="true">←</span>
                    </NuxtLink>
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



const { rawRefreshToken, rawToken } = useAuthState();

const { refresh } = useAuth();
const { getSession } = useAuth();

const { currentPhone } = storeToRefs(useAuthStore());
const my_opt = ref([])
const loading = ref(false);

const sender = useRoute().query.sender;

const error = ref('');

onMounted(async () => {
    if (!currentPhone.value) {
        currentPhone.value = sessionStorage.getItem('abber:whatsapp-number') as string;
    }

    if (!currentPhone.value) {
        useRouter().push({ name: 'accounts-whatsapp-login' });
    }
});


async function login() {
    error.value = '';

    try {
        if (my_opt.value.length < 4) {
            error.value = 'يجب ملء كل الحقول';
            return;
        }

        loading.value = true;

        const { data } = (await useFetch('/api/auth/whatsapp/otp', {
            method: 'POST',

            body: {
                phone: currentPhone.value,
                key: `${my_opt.value[0]}${my_opt.value[1]}${my_opt.value[2]}${my_opt.value[3]}`
            },

            async onResponse({ response }) {
                if (response.status !== 200) return;

                rawRefreshToken.value = response._data.refreshToken;
                rawToken.value = response._data.token;

                await refresh();

                useRouter().push({ name: 'index' });

                useNotification({ type: 'success', content: 'تم تسجيل دخولك بنجاح' });
            },
            async onResponseError({ response }) {
                if (response?._data?.otp) {
                    error.value = response._data.otp;
                }
            }
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
</script>

<style scoped>


</style>
