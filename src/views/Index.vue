<template>

    <Header />
    <main class="min-h-screen outline-none">
        <Hero /> 
        <HowItWorks />
        <Articles />
        <Testimonials />
        <Faq />
        <SupportFloatingButton />
    </main>
    <Footer />
    
</template>

<script setup lang="ts">
import Header from '@/components/partials/Header.vue';
import Footer from '@/components/partials/Footer.vue';
import Hero from '@/components/main/Hero.vue';
import HowItWorks from '@/components/main/HowItWorks.vue';
import Articles from '@/components/main/Articles.vue';
import Testimonials from '@/components/main/Testimonials.vue';
import Faq from '@/components/main/Faq.vue';
import SupportFloatingButton from '@/components/main/SupportFloatingButton.vue';



</script>

<style scoped>

</style>