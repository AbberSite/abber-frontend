<template>
    <Head>
        <title>عبر - عالمك الخاص لتفسير الأحلام</title>

    </Head>

    <main class="min-h-screen outline-none">
        <Hero />
        <HowItWorks />
        <Articles />
        <Testimonials />
        <Faq />
        <SupportFloatingButton />
    </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware : ['verified']
})

</script>

<style scoped></style>