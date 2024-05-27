<template>

    <Head>
        <title>عبر - تسجيل الدخول</title>
    </Head>
    <main class="min-h-screen outline-none">
        <HeroBackground />
        <AuthenticationOTP is-home/>
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



</script>

<style scoped></style>
