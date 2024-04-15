<template>
    
    <Head>
        <title>عبر - طلب تعبير حلم - التسجيل</title>
    </Head>

    <div>
        <form>
            <fieldset class="space-y-7">
                
                <div
                    @click="submit('login')"
                    class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none">
                    <div class="flex pt-1.5">
                        <div class="flex-shrink-0">
                            <!-- Heroicon name: outline/user-plus -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.5">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
                            </svg>
                        </div>
                        <div class="space-y-3">
                            <div class="ms-3 pt-1 text-sm font-semibold">
                                <div>عميل حالي</div>
                            </div>
                            <div class="ms-3 text-justify text-[13px] leading-loose text-gray-700">
                                أنا عميل حالي و أود تسجيل الدخول قبل إتمام الطلب
                            </div>
                        </div>
                    </div>
                    <input
                        class="h-5 w-5 flex-shrink-0 appearance-none rounded-full"
                        id="login"
                        type="radio"
                        name="type"
                        v-model="authenticationMethod"
                        value="login" />
                </div>
                <div
                    @click="submit('register')"
                    class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none">
                    <div class="flex pt-1.5">
                        <div class="flex-shrink-0">
                            <!-- Heroicon name: outline/user-plus -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.5">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"></path>
                            </svg>
                        </div>
                        <div class="space-y-3">
                            <div class="ms-3 pt-1 text-sm font-semibold">
                                <div>عميل جديد</div>
                            </div>
                            <div class="ms-3 text-justify text-[13px] leading-loose text-gray-700">
                                أنا عميل جديد و أود التسجيل قبل إتمام الطلب
                            </div>
                        </div>
                    </div>
                    <input
                        class="h-5 w-5 flex-shrink-0 appearance-none rounded-full"
                        id="register"
                        type="radio"
                        name="type"
                        v-model="authenticationMethod"
                        value="register" />
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script setup lang="ts">
import type { OrderForm } from '~/types';

const authenticationMethod = ref<'register' | 'login' | 'guest' | 'otp'>();
const { status } = useAuthState();

const { next, previous } = useFormWizard<OrderForm>('order');

onMounted(async () => {
    if (status.value == 'authenticated') previous();
});

function submit(authenticationMethod: 'register' | 'login' | 'guest' | 'otp') {
    next({
        nextStepId: 'authentication',
        data: {
            authenticationMethod
        }
    });
}
</script>
<style scoped></style>
