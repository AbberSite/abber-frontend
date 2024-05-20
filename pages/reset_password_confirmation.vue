<template>
    <Head>
        <title>عبر - تعيين كلمة مرور جديدة</title>
    </Head>
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <HeroBackground/>
        <!-- Forget password form section -->
        <section
            class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-14 xs:px-6"
            aria-labelledby="forget-password-heading">
            <h1 class="sr-only" id="forget-password-heading">تعيين كلمة مرور جديدة</h1>
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/lock -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    height="24"
                    width="24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                </svg>
            </div>
            <div class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">تعيين كلمة مرور جديدة</div>
            <div class="pt-4 text-sm text-gray-800 xs:text-base">ضع كلمة مرور يمكن تذكرها و قوية في نفس الوقت</div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <form method="POST" @submit.prevent="submit">
                    <fieldset class="space-y-7">
                        <TextInput
                            v-model="password"
                            :type="show ? 'text' : 'password'"
                            name="password"
                            :error="errors.password"
                            placeholder="كلمة المرور الجديدة"
                            label="كلمة المرور الجديدة">
                            <template #append>
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
                            </template>
                        </TextInput>

                        <TextInput
                            v-model="passwordConfirmation"
                            :type="show ? 'text' : 'password'"
                            name="password"
                            placeholder="كلمة المرور الجديدة (مرة أخرى)"
                            label="كلمة المرور الجديدة (مرة أخرى)"
                            :error="errors.passwordConfirmation">
                            <template #append>
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
                            </template>
                        </TextInput>

                        <div>
                            <!-- <a class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                                href="/accounts/password/reset/key/done"> <span class="mt-1.5">تعيين كلمة المرور</span></a> -->

                            <PrimaryButton class="w-full" :loading="loading"> تعيين كلمة المرور </PrimaryButton>
                        </div>
                    </fieldset>
                </form>
                <div class="pt-8 text-center text-sm xs:text-base">
                    <a class="font-medium text-blue-600" href="/accounts/login">العودة لتسجيل الدخول <span aria-hidden="true">←</span></a>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

const { defineField, errors, validate, setErrors } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            password: yup
                .string()
                .min(8, 'طول كلمة السر يجب أن يكون 8 حروف أو أكثر')
                .required(),
            passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'هذا الحقل يجب أن يطابق كلمة السر')
        })
    )
});

const loading = ref(false);
const [password] = defineField('password');
const [passwordConfirmation] = defineField('passwordConfirmation');

definePageMeta({
    layout: false,
    auth: false
});

const uid = useRoute().query.uid;
const token = useRoute().query.token;

const show = ref(false);

onMounted(() => {
    if (!uid || !token) {
        useNotification({ type: 'danger', content: 'لقد حدث خطأ في اعادة كلمة السر، تحقق من بريدك الالكتروني!' })
        useRouter().push({ name: 'accounts-login' });
    }
});

// ('?uid=e2&token=bzexzc-7b1b191a2eccd9d10bf371d7f82fddf9'); 

async function submit() {
    const validation = await validate();

    if (!validation.valid) return;

    loading.value = true;

    await useProxy(`/authentication/password/reset/confirm/${token}/`, {
        method: 'POST',
        body: {
            new_password1: password.value,
            new_password2: passwordConfirmation.value,
            uid,
            token
        }
    }).then(()=> {
        useNotification({type: 'success', content: 'تمت اعادة كملة المرور بنجاح!'});
        loading.value = false;
        useRouter().push({name: 'accounts-new-password-done'});
    }).catch((e)=> {
        useNotification({type: 'danger', content: 'لقد فشلت عملية إعادة تعيين كلمة السر!'});
        loading.value = false;
    });
}
</script>