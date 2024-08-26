<template>
    <Head>
        <title>عبر - استعادة كلمة المرور</title>
    </Head>
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <HeroBackground/>
        <!-- Forget password form section -->
        <section class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-14 xs:px-6"
            aria-labelledby="forget-password-heading">
            <h1 class="sr-only" id="forget-password-heading">إستعادة كلمة المرور</h1>
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/envelope -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" height="24" width="24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75">
                    </path>
                </svg>
            </div>
            <div class="pt-6 text-lg font-medium xs:text-xl 2xl:text-2xl">تحقق من بريدك الالكتروني</div>
            <div class="pt-4 text-sm text-gray-600 xs:text-base">لقد أرسلنا إليك رابط إعادة تعيين كلمة المرور</div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <NuxtLink class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800" 
                    :to=" `https://www.${route.query.email ?? 'gmail.com'}`" target="_blank"> <span>فتح تطبيق البريد
                        الإلكتروني</span></NuxtLink>
                <div class="pt-8 text-center text-sm xs:text-base"><NuxtLink class="font-medium text-blue-600"
                        to="/accounts/login">العودة لتسجيل الدخول <span aria-hidden="true">←</span></NuxtLink></div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">

definePageMeta({
    layout: false,
    auth: false
});
const route = useRoute();
</script>

<style scoped></style>