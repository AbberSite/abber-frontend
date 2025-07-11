<template>
    <section
        :class="{ 'relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32 lg:px-8 xl:pb-44': !isFormSteps && !isFormPackage }"
        aria-labelledby="login-heading">
        <h1 class="font-medium pt-5" v-show="!isFormPackage && !isFormSteps">إكمال تسجيل الدخول</h1>
        <div class="mx-auto w-full max-w-sm pt-5">
            <form method="POST" @submit.prevent="submit()">
                <fieldset class="space-y-5">

                    <TextInput v-model="email" :error="errors.email" label="البريد الألكتروني"
                        placeholder="ادخل عنوان بريدك الألكتروني" disabled />

                    <TextInput v-model="password" :type="show ? 'text' : 'password'" id="password"
                        :error="errors.password" placeholder="ادخل كلمة مرور سهلة التذكر و قوية" label="كلمة المرور"
                        for="password">
                        <template #append>
                            <button
                                class="absolute h-[50px] items-center justify-center px-4 py-4 text-gray-600 hover:text-gray-900 ltr:right-0 rtl:left-0"
                                type="button" @click="show = !show" title="اظهار/اخفاء كلمة المرور">
                                <svg :class="{ hidden: show }" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <svg :class="{ hidden: !show }" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88">
                                    </path>
                                </svg>
                            </button>
                        </template>
                    </TextInput>

                    <LazyPhoneInput v-model="phone" v-model:valid="phoneValid" :error="errors.phone" />

                    <div>
                        <PrimaryButton class="w-full" :loading="loading">استمرار</PrimaryButton>
                    </div>
                </fieldset>
            </form>
        </div>
    </section>

</template>

<script setup lang="ts">

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import type { packagesFormSteps } from '~/types';
const props = defineProps<{ isFormSteps?: boolean; isFormPackage?: boolean }>();
let next, state;
if (props.isFormSteps) {
    next = useFormWizard<OrderForm>('order').next;
    state = useFormWizard<OrderForm>('order').state;
} else if (props.isFormPackage) {
    next = useFormWizard<packagesFormSteps>('packages').next;
    state = useFormWizard<packagesFormSteps>('packages').state;
}
const route = useRoute();
const { defineField, errors, validate } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            email: yup.string().email('هذا الحقل يجب أن يكون ايميل').matches(/[^a-zA-z0-9._%+-]+[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/, 'يجب ادخال ايميل صحيح').required('هذا الحقل مطلوب'),
            password: yup
                .string()
                .min(8, 'طول كلمة المرور يجب أن يكون 8 حروف أو أكثر')
                .required("هذا الحقل مطلوب"),
            phone: yup.string().required("هذا الحقل مطلوب")
        })
    )
});

const loading = ref(false);
const [email] = defineField('email');
const [password] = defineField('password');
const [phone] = defineField('phone');
const phoneValid = ref(false);
const show = ref(false);
onBeforeMount(async () => {
    if (!props.isFormSteps && !props.isFormPackage)
        email.value = route.query?.email;
    else {
        email.value = state.value.data.email;
    }
})


async function submit() {
    const validation = await validate();

    if (!validation.valid || !phoneValid.value) {
        let first_element = document.getElementById(Object.keys(errors.value)[0]);
        first_element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        first_element?.focus();
        return;
    }
    loading.value = true;
    await useDirectApi('/authentication/complete-signup/', {
        method: 'POST',
        body: {
            phone: phone.value,
            password: password.value
        }
    }).catch((e)=> {
        console.log(e);
        loading.value = false; 
        useNotification({type: 'danger', content: 'لقد حدث خطأ ما'});
        return;
    });
    loading.value = false;
    useNotificationForLogin(!props.isFormSteps && !props.isFormPackage);
    if (props.isFormPackage || props.isFormSteps){
        next({
            nextStepId: 'payment',
            options: {
                ignore: true
            }
        })
    }
}
</script>