<template>
    <Head>
        <title>عبر - تسجيل الدخول</title>
    </Head>
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

</template>

<script setup lang="ts">
import type { OrderForm } from '~/types';

definePageMeta({
    layout: false
});

const { rawRefreshToken, rawToken } = useAuthState();

const { refresh } = useAuth();

const { currentPhone } = storeToRefs(useAuthStore());
const my_opt = ref([]);
const loading = ref(false);

const { next, state } = useFormWizard<OrderForm>('order');

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

                next({
                    nextStepId: 'payment',
                    options: {
                        ignore: true
                    }
                });
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

<style scoped></style>
