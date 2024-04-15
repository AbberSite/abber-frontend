<template>
    <Head>
        <title>عبر - عالمك الخاص لتفسير الأحلام</title>

    </Head>

    <main class="min-h-screen outline-none">
        <Hero />
        <!-- <HowItWorks /> -->
        <Expressors /> 
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
})

</script>

<style scoped></style>