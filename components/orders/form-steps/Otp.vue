<template>
    <Head>
        <title>عبر - تسجيل الدخول</title>
    </Head>

    <form method="POST" @submit.prevent="login">
        <fieldset class="space-y-7">
            <TextInput
                name="otp"
                type="number"
                id="otp"
                v-model="otp"
                :error="error"
                label="رمز التأكد (OPT)"
                placeholder="ادخل الرمز المكون من 4 ارقام" />

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

const otp = ref<any>(undefined);
const loading = ref(false);

watch(otp, async (value) => {
    


    if(!value) return

    // console.log(value.toString().length);
    
    // if (value?.toString().length > 4) {
    //     otp.value = value.toString().slice(0, 4); // Trim to 4 characters
    // }

    if (value?.toString().length == 4) {
        await login();
    }
});

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
        if (otp.value === '') {
            error.value = "هذا الحقل مطلوب";
            return;
        }

        loading.value = true;

        const { data } = (await useFetch('/api/auth/whatsapp/otp', {
            method: 'POST',

            body: {
                phone: currentPhone.value,
                key: otp.value
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
