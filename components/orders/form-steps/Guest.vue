<template>
    <Head>
    <title>عبر - طلب تعبير حلم - متابعة كزائر</title>

    </Head>

    <form method="POST" @submit.prevent="send">
        <fieldset class="space-y-7">
            <div class="w-full space-y-3">
                <PhoneInput v-model="phone" v-model:valid="valid" />
                <div class="text-red-500 text-sm">
                    {{ errors.phone }}
                </div>
            </div>
            <div class="space-y-2">
                <PrimaryButton class="w-full" :loading="loading"> متابعة </PrimaryButton>
            </div>
        </fieldset>
        <FormStepsSocialLogin/>

    </form>
</template>

<script setup lang="ts">
import type { OrderForm } from '~/types';


const phone = ref('');
const loading = ref(false);

const errors = ref<{
    phone?: string;
}>({});

const valid = ref(false);

const { next, state } = useFormWizard<OrderForm>('order');

async function send() {
    if (!valid.value) return;

    try {
        loading.value = true;
        const { data } = (await useFetch('/api/auth/whatsapp/send?sender=whatsapp', {
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

        next({
            nextStepId: 'authentication',
            options: {
                ignore: true, 
                previous: () => {
                    state.value.data ? (state.value.data.authenticationMethod = 'guest') : undefined;
                }
            },
            data: {
                authenticationMethod: 'otp'
            }
        });
    } catch (error: any) {
        alert('something went wrong');
    }

    loading.value = false;
}
</script>

<style scoped></style>
