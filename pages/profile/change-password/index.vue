<template>
    <Header />
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <HeroBackground/>
        <!-- Change password form section -->
        <section
            class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="change-password-heading">
            <h1 class="sr-only" id="change-password-heading">تغيير كلمة المرور</h1>
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
            <div class="pt-8 text-lg font-medium xs:text-xl 2xl:text-2xl">تغيير كلمة المرور</div>
            <div class="pt-4 text-sm text-gray-600 xs:text-base">ضع كلمة مرور يمكن تذكرها و قوية في نفس الوقت</div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <form @submit.prevent="submit">
                    <fieldset class="space-y-5">
                        <div class="w-full space-y-3">
                            <label class="block text-sm font-medium xs:text-base" for="password"
                                >كلمة المرور الحالية</label
                            >
                            <div class="relative" x-data="{ show: false }">
                                <input
                                    v-model="currentPassword"
                                    class="form-control h-[50px] pl-12"
                                    :type="show ? 'text' : 'password'"
                                    name="password"
                                    id="password"
                                    placeholder="كلمة المرور الحالية"
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
                        </div>
                        <div class="w-full space-y-3">
                            <label class="block text-sm font-medium xs:text-base" for="password"
                                >كلمة المرور الجديدة</label
                            >
                            <div class="relative">
                                <input
                                    v-model="newPassword"
                                    class="form-control h-[50px] pl-12"
                                    :type="show ? 'text' : 'password'"
                                    name="password"
                                    id="password"
                                    placeholder="كلمة المرور الجديدة"
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
                            <InputError v-for="message in errors.new_password1" :message="message" />
                        </div>
                        <div class="w-full space-y-3">
                            <label class="block text-sm font-medium xs:text-base" for="password"
                                >كلمة المرور الجديدة (مرة أخرى)</label
                            >
                            <div class="relative" x-data="{ show: false }">
                                <input
                                    v-model="newPasswordConfirmation"
                                    class="form-control h-[50px] pl-12"
                                    :type="show ? 'text' : 'password'"
                                    name="password"
                                    id="password"
                                    placeholder="كلمة المرور الجديدة (مرة أخرى)"
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
                            <InputError v-for="message in errors.new_password2" :message="message" />
                        </div>
                        <div>
                            <PrimaryButton :loading="loading" class="w-full">تغيير كلمة المرور</PrimaryButton>
                        </div>
                    </fieldset>
                </form>
                <div class="pt-8 text-center text-sm xs:text-base">
                    <NuxtLink class="font-medium text-blue-600" :to="{ name: 'profile' }"
                        ><span aria-hidden="true">→</span> العودة للصفحة الشخصية
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: false
});

const { signOut } = useAuth();
const currentPassword = ref('');
const newPassword = ref('');
const newPasswordConfirmation = ref('');
const errors = ref<{
    new_password1?: Array<string>;
    new_password2?: Array<string>;
}>({});
const loading = ref(false);
const router = useRouter();

async function submit() {
    try {
        loading.value = true;
        await useApi('/api/accounts/update/change-password', {
            method: 'POST',
            body: {
                new_password1: newPassword.value,
                new_password2: newPasswordConfirmation.value
            }
        });

        await signOut({ redirect: false });

        await router.push('/profile/change-password/done');
    } catch (error: any) {
        errors.value = error.response._data;
    }

    loading.value = false;
}

const show = ref(false);
</script>

<style scoped></style>
