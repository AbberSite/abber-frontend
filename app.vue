<template>
    <NuxtLoadingIndicator color="#000" />
    <NuxtLayout>
        <NuxtPage />
        <Alerts />
    </NuxtLayout>

    <meta name="appleid-signin-client-id" content="[CLIENT_ID]" />
    <meta name="appleid-signin-scope" content="[SCOPES]" />
    <meta name="appleid-signin-redirect-uri" content="[REDIRECT_URI]" />
    <meta name="appleid-signin-state" content="[STATE]" />
    <meta name="appleid-signin-nonce" content="[NONCE]" />
    <meta name="appleid-signin-use-popup" content="true" />
</template>

<script setup>
import { useWebSocket } from '@vueuse/core';
useHead({
    bodyAttrs: {
        class: 'antialiased'
    },
    htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
    }
});

definePageMeta({
    middleware: ['verified']
});
useSeoMeta({
    author: 'عبر',
    robots: 'index, follow',
    language: 'Arabic',
    copyright: 'Copyright 2023',
    ogSiteName: 'عبر',
    ogType: 'website',
    ogImage: '/assets/images/logo.png',
    ogImageAlt: 'Og Image Alt',
    twitterImage: '/assets/images/logo.png',
    twitterCard: 'summary_large_image',
    description: 'عالمك الخاص لتفسير الأحلام',
    ogTitle: 'عبر',
    ogDescription: 'عالمك الخاص لتفسير الأحلام',
    ogUrl: 'https://abber.netlify.app',
    twitterTitle: 'عبر',
    twitterDescription: 'عالمك الخاص لتفسير الأحلام',
    'twitter:url': 'https://abber.netlify.app',
    canonical: 'https://abber.netlify.app',
    'appleid-signin-client-id': 'something',
    'appleid-signin-scope': 'something',
    'appleid-signin-redirect-uri': 'something',
    'appleid-signin-state': 'something',
    'appleid-signin-nonce': 'something',
    'appleid-signin-use-popup': 'true'
});
//         const { getSession } = useAuth();

// await getSession();


// onUpdated(async()=> {
//     await refresh();
// })
</script>

<style>
.nuxt-loading-indicator {
    transform-origin: right !important;
}
</style>
