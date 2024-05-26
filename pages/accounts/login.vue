<template>

  <Head>
    <title>عبر - تسجيل الدخول</title>
  </Head>
  <Header />
  <main class="min-h-screen outline-none">
    <!-- Hero section -->
    <HeroBackground />
    <!-- Login form section -->
    <LoginEmail/>
  </main>
</template>

<script setup lang="ts">
import LoginEmail from '~/components/authentication/LoginEmail.vue';
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
