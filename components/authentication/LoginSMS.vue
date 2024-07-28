<template>

    <Head>

        <title v-if="props.isFormSteps">عبر - طلب تعبير حلم - تسجيل الدخول برقم الهاتف</title>

    </Head>
    <section
        :class="{ 'relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32 lg:px-8 xl:pb-44': !props.isFormSteps }"
        aria-labelledby="forget-password-heading">
        <AuthenticationHeading v-if="!props.isFormSteps" />
        <div class="mx-auto w-full max-w-sm pt-10">
            <form method="POST" @submit.prevent="send">
                <fieldset class="space-y-7">
                    <div class="w-full space-y-3">
                        <!-- <label class="text-sm font-medium xs:text-base" for="tel">رقم الواتساب</label>
                            <input class="form-control h-[50px] appearance-none" type="tel" name="phone" id="tel"
                                placeholder="7835196169" autocomplete="tel" required /> -->

                        <PhoneInput v-model="phone" v-model:valid="valid" :sms="true" placeholder="5XXXXXXXX" :error="errors.phone"/>
                    </div>
                    <div>
                        <!-- <button
                                class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800"
                                href="/accounts/whatsapp/opt"> <span>
                                    <Loading  v-if="loading"/>
                                    <span v-else>متابعة</span>
                                 </span></button>
 -->

                        <PrimaryButton class="w-full" :loading="loading"> متابعة </PrimaryButton>
                    </div>
                </fieldset>
            </form>
            <AuthenticationSocialLogin :isFormSteps="isFormSteps" :isFormPackage="isFormPackage"  />

            <div class="space-x-1 pt-8 text-center text-sm rtl:space-x-reverse xs:text-base" v-if="!isFormSteps">
                <span>ليس لديك حساب؟</span>
                <NuxtLink class="font-medium text-blue-600" :to="{ name: 'accounts-signup' }">سجل الان </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { packagesFormSteps } from '~/types';
const router = useRouter();
const props = defineProps<{ isFormSteps?: boolean; isFormPackage?: boolean }>();

const phone = ref('');
const loading = ref(false);

const errors = ref<{
    phone?: string;
}>({});
const valid = ref(false);

async function send() {
    if(!valid.value) {
        if(!errors.value.length)
            errors.value.phone = 'هذا الحقل مطلوب'
        return
    }
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
            if (props.isFormSteps)
                errors.value.phone = 'هذا الرقم غير مسجل ';
            else {
                useNotification({ type: 'info', content: 'الرقم غير مسجل، يمكنك انشاء حساب به.' })
                navigateTo('/accounts/signup/')
            }
            loading.value = false;
            return;
        }

        const { currentPhone } = storeToRefs(useAuthStore());

        currentPhone.value = phone.value;

        sessionStorage.setItem('abber:whatsapp-number', phone.value);
        if (!props.isFormSteps)
            router.push({ name: 'accounts-whatsapp-otp' });
        else {
            let next, state; 
            if(props.isFormSteps && !props.isFormPackage){
                next = useFormWizard<OrderForm>("order").next;
                state = useFormWizard<OrderForm>("order").state;
            } else {
                next = useFormWizard<packagesFormSteps>("packages").next;
                state = useFormWizard<packagesFormSteps>("packages").state;
            }
            next({
                nextStepId: 'authentication',
                options: {
                    ignore: true,
                    previous: () => {
                        state.value.data ? (state.value.data.authenticationMethod = 'login-sms') : undefined;
                    }
                },
                data: {
                    authenticationMethod: 'otp'
                }
            });
        }
    } catch (error: any) {
        alert('error');

        console.log(error.response);
    }

    loading.value = false;
}
</script>