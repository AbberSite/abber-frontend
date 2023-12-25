<template>
    <Head>
        <title>عبر - التسجيل</title>
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
            <h1 class="sr-only" id="login-heading">التسجيل</h1>
            <img class="aspect-square" src="/assets/images/logo.webp" height="70" width="70" alt="شعار منصة عبر" />
            <div class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">مرحبا بك في عبر</div>
            <div class="pt-4 text-sm text-gray-800 xs:text-base">هل تود إنشاء حساب جديد في عبر</div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <form method="POST" @submit.prevent="submit">
                    <fieldset class="space-y-7">
                        <TextInput
                            name="name"
                            type="text"
                            v-model="name"
                            :error="errors.name"
                            label="الإسم الكامل"
                            placeholder="اكتب إسمك الكامل">
                            <template #append>
                                <div class="text-[13px] leading-loose text-gray-500 mt-3">
                                    يفضل أن يكون إسمك الكامل باللعة العربية
                                </div>
                            </template>
                        </TextInput>

                        <TextInput
                            name="email"
                            type="email"
                            v-model="email"
                            :error="errors.email"
                            label="البريد الألكتروني"
                            placeholder="البريد الألكتروني" />

                        <TextInput
                            v-model="password"
                            :type="show ? 'text' : 'password'"
                            name="password"
                            :error="errors.password"
                            placeholder="كلمة المرور"
                            label="كلمة المرور">
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
                        
                        <PhoneInput v-model="phone" v-model:valid="phoneValid" />

                        <div class="flex items-center text-sm xs:text-base">
                            <input
                                class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
                                type="checkbox"
                                v-model="terms"
                                name="remember"
                                id="id_agreement" />
                            <label class="mt-1.5 space-x-1 ps-3 font-medium rtl:space-x-reverse" for="id_agreement">
                                <span>أوافق على</span>
                                <a class="text-blue-600" href="#">الشروط و الأحكام</a>
                                <span>و</span>
                                <a class="text-blue-600" href="#">إتفاقية المستخدم</a>
                            </label>
                        </div>

                        <InputError :message="errors.terms" />

                        <div>
                            <PrimaryButton class="w-full" :loading="loading">التسجيل</PrimaryButton>
                        </div>
                    </fieldset>
                </form>
                <SocialLogin />

                <div class="space-x-1 pt-8 text-center text-sm rtl:space-x-reverse xs:text-base">
                    <span>لديك حساب سابقا؟</span>

                    <RouterLink class="font-medium text-blue-600" :to="{ name: 'accounts-login' }">
                        سجل دخولك الان
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { useDebounceFn } from '@vueuse/core';

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    },
    layout: false
});

const { defineField, errors, validate, errorBag, setErrors } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            email: yup.string().email('هذا الحقل يجب أن يكون ايميل').required('هذا الحقل يجب أن لا يكون فارغ'),
            name: yup.string().required('هذا الحقل يجب أن لا يكون فارغ'),
            password: yup
                .string()
                .min(8, 'طول كلمة السر يجب أن يكون 8 حروف أو أكثر')
                .matches(
                    new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'),
                    'كلمة السر يجب أن تكون مزيج من أحرف كبيرة و صغيرة و أرقام'
                )
                .required(),
            phone: yup.string(),
            terms: yup
                .boolean()
                .isTrue('يجب الموافقة على الشروط و الأحكام')
                .required('يجب الموافقة على الشروط و الأحكام')
        })
    )
});

const { signUp } = useAuth();
const loading = ref(false);
const [email] = defineField('email');
const [name] = defineField('name');
const [password] = defineField('password');
const [phone] = defineField('phone');
const [terms] = defineField('terms');
const phoneValid = ref(false);

const checkEmailExistence = useDebounceFn(async (value) => {
    const response: any = await useApi('POST', '/api/auth/check-email', {
        email: value
    });

    if (!response.data.value.registered) {
        errorBag.value = {};
        return true;
    }

    setErrors({ email: 'تم أخذ هذا الايميل قم باختيار اخر' });

    return false;
}, 500);

watch(email, async (value) => {
    await checkEmailExistence(value);
});

async function submit() {
    errorBag.value = {};

    const validation = await validate();

    if (!validation.valid || !phoneValid.value) return;

    try {
        loading.value = true;

        await signUp(
            { name: name.value, email: email.value, password: password.value, phone: '+' + phone.value },
            {
                callbackUrl: '/',
                redirect: true
            }
        );
    } catch (error: any) {
        setErrors(error.response._data);
    } finally {
        loading.value = false;
    }
}

const show = ref(false);
</script>

<style scoped></style>
