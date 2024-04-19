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

const { getSession, refresh } = useAuth();

onMounted(async () => {
    let sending = false;
    setInterval(async ()=> {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const authtokenCookie = cookies.find(cookie => cookie.startsWith('auth:token='));
        const authRefreshTokenCookie = cookies.find(cookie => cookie.startsWith('auth:refresh-token='));
        if(!sending && !authtokenCookie && authRefreshTokenCookie.split('=')[1]){
            sending = true;
            await refresh();
            sending = false;
        }
    }, 100)


    // await refresh();
    // setInterval(async () => {
    //     const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    //     const authTokenCookie = cookies.find(cookie => cookie.startsWith("auth:token="));
    //     const authRefreshTokenCookie = cookies.find(cookie => cookie.startsWith("auth:refresh-token="));
    //     // console.log(`refresh token is: ${authRefreshTokenCookie.split("=")[1]}`)
    //     if (!authTokenCookie && authRefreshTokenCookie.split("=")[1]) {
    //         await refresh();
    //     }
    // }, 3000);
    
    const { status, rawToken, data } = useAuthState();
    const { getSession } = useAuth();
    await getSession();

    const { goOnline } = useAccountStore();

    let goOffline

    watch(
        status,
        async (value) => {
            if (value == 'loading') return
            if (value == "authenticated") {
                console.log("going online...");
                goOffline = await goOnline()
                return
            }
            console.log("going offline...");
            goOffline()
        }
    );

    if (status.value === 'unauthenticated') return;

    goOffline = await goOnline();

    const { readNotifications } = storeToRefs(useUtilsStore());

    const chat = useWebSocket(
        useRuntimeConfig().public.WebsocketURL +
        // import.meta.env.VITE_WS_URL +
        `/ws/notifications/${data.value.username}/` +
        `?authorization=JWT ${rawToken.value}`,
        {
            autoReconnect: true
        }
    );

    watch(chat.data, (value) => {
        // console.log(data.value.notifications.results);
        const notification = JSON.parse(value).notification;
        data.value.notifications.results.unshift(notification);
        readNotifications.value = true;

        var audio = new Audio('/sounds/notification.wav');
        audio.play();
    });
});

// onUpdated(async()=> {
//     await refresh();
// })
</script>

<style>
.nuxt-loading-indicator {
    transform-origin: right !important;
}
</style>
