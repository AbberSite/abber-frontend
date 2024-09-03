<template>
  <Head>
    <title>عبر - عالمك الخاص لتفسير الأحلام</title>
  </Head>

  <main class="min-h-screen outline-none">
    <LazyHero />
    <!-- <HowItWorks /> -->
    <LazyExpressors v-if="data?.user_type != 'معبر'" />
    <LazyArticles />
    <LazyTestimonials />
    <LazyFaq id="faqs" />
    <LazySupportFloatingButton />
  </main>
  <CheckPIN />
  <LazySupportFloatingButton />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["verified"],
  auth: false,
});
const { data } = useAuth();
</script>

<style scoped></style>
