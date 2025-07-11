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
import { useAnalytics } from "~/composables/useAnalytics";
import { useRouter } from "vue-router";

useHead({
  bodyAttrs: {
    class: "antialiased",
  },
  htmlAttrs: {
    lang: "ar",
    dir: "rtl",
  },
  __dangerouslyDisableSanitizersByTagID: {
    "my-inline-gtm": ["innerHTML"],
    "my-inline-snap": ["innerHTML"],
    "my-inline-hotjar": ["innerHTML"],
  },
});

definePageMeta({
  middleware: ["verified"],
});
useSeoMeta({
  author: "عبر",
  robots: "index, follow",
  language: "Arabic",
  copyright: "Copyright 2023",
  ogSiteName: "عبر",
  ogType: "website",
  ogImage: "/assets/images/logo.png",
  ogImageAlt: "Og Image Alt",
  twitterImage: "/assets/images/logo.png",
  twitterCard: "summary_large_image",
  description: "عالمك الخاص لتفسير الأحلام",
  ogTitle: "عبر",
  ogDescription: "عالمك الخاص لتفسير الأحلام",
  ogUrl: "https://abber.netlify.app",
  twitterTitle: "عبر",
  twitterDescription: "عالمك الخاص لتفسير الأحلام",
  "twitter:url": "https://abber.netlify.app",
  canonical: "https://abber.netlify.app",
  "appleid-signin-client-id": "something",
  "appleid-signin-scope": "something",
  "appleid-signin-redirect-uri": "something",
  "appleid-signin-state": "something",
  "appleid-signin-nonce": "something",
  "appleid-signin-use-popup": "true",
  "google-site-verification": "U9_0pV8c8zwuJKf2kp5FNtHBjXo1bZRB3EimSZSdmzM",
});

const { getSession } = useAuth();
await getSession();
const { goOnline, connectWSNotifications } = useAccountStore();

onMounted(async () => {
  const { status } = useAuthState();

  let goOffline;
  let closeNotifications;
  watch(status, async (value) => {
    if (value == "loading") return;
    if (value == "authenticated") {
      goOffline = await goOnline();
      closeNotifications = await connectWSNotifications();
      return;
    }
    console.log("going offline...");
    closeNotifications();
    goOffline();
  });
  if (status.value === "unauthenticated") return;
  goOffline = await goOnline();
  closeNotifications = await connectWSNotifications();
  useFirebase();
});

onMounted(() => {
  useLoadResources(
    "https://fonts.googleapis.com/css2?family=Readex+Pro:wght@160..700&display=swap"
  );
  useLoadResources("/lazysizes.min.js", true);
});

const analytics = useAnalytics();
const router = useRouter();

onMounted(() => {
  analytics.trackPageView(); // Track initial page load
  router.afterEach((to) => {
    analytics.trackPageView(to.meta.title, to.fullPath);
  });
});
</script>

<style>
.nuxt-loading-indicator {
  transform-origin: right !important;
}
</style>
