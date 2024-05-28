<template>
    <Head>
        <title>عبر - التسجيل</title>
    </Head>

    <Header />

    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <HeroBackground/>
        <!-- register form section -->
        <AuthenticationRegister/>
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
