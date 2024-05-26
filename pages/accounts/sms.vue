<template>

    <Head>
        <title>عبر - تسجيل الدخول</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <HeroBackground/>
        <AuthenticationLoginSMS/>
    </main>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/'
    },
    layout: false
});
// useHead({
//     script: [
//         {
//             src: "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
//             type: "text/javascript",
//         }
//     ]
// })

</script>

<style scoped></style>
