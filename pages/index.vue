<template>
    <Head>
        <title>عبر - عالمك الخاص لتفسير الأحلام</title>

    </Head>

    <main class="min-h-screen outline-none">
        <Hero />
        <!-- <HowItWorks /> -->
        <Expressors v-if="data?.user_type != 'معبر'" /> 
        <Articles />
        <Testimonials />
        <Faq id="faqs"/>
        <SupportFloatingButton />
    </main>

    <SupportFloatingButton />

</template>

<script setup lang="ts">
definePageMeta({
  middleware : ['verified'], 
  auth : false,
});
const {data} = useAuth();

</script>

<style scoped></style>
