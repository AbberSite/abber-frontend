<template s>
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
  <Script src="https://js.sentry-cdn.com/0cf3a44bad2c478ca45ec0bfcb1a0abd.min.js" crossorigin="anonymous"></Script>
  <!-- Google Tag Manager (noscript) -->
  <NoScript> <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5F7JTJM" height="0" width="0"
      style="display:none;visibility:hidden"></iframe>
  </NoScript>
  <!-- End Google Tag Manager (noscript) -->
  <Script type="module">

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
  const firebaseConfig={apiKey:"AIzaSyDG8xAilCpnz7ImatiCXlCFGTmN74q33j4",authDomain:"abber-328917.firebaseapp.com",projectId:"abber-328917",storageBucket:"abber-328917.appspot.com",messagingSenderId:"916666485232",appId:"1:916666485232:web:e87439d77d6cf1fc097535",measurementId:"G-XHTTF5BP7L"};
  const app=initializeApp(firebaseConfig);
  const analytics=getAnalytics(app);
</Script>
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
  },
  script: [
    {
      src: 'https://www.googleoptimize.com/optimize.js?id=OPT-ML3SB22',
      async: true
    },
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2434981739474696',
      async: true,
      crossorigin: 'anonymous'
    },
    {
      innerHTML: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l; j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5F7JTJM');
      `,
      type: 'text/javascript'
    },
    {
      innerHTML: `
        (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
        {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
        a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
        r.src=n;var u=t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r,u);})(window,document,
        'https://sc-static.net/scevent.min.js');

        snaptr('init', '15f7dafb-9f12-4805-803f-82d50fe2c8bd', {
        'user_email': 'admin@abber.co'
        });

        snaptr('track', 'PAGE_VIEW');
      `,
      type: 'text/javascript'
    },
    {
      innerHTML: `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:3622481,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
      type: 'text/javascript'
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'my-inline-gtm': ['innerHTML'],
    'my-inline-snap': ['innerHTML'],
    'my-inline-hotjar': ['innerHTML']
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
onMounted(async () => {
  
  const { status, rawToken, data } = useAuthState();
  // const { getSession } = useAuth();
  // await getSession();
  const { goOnline } = useAccountStore();
  let goOffline
  watch(
    status,
    async (value) => {
      if (value == 'loading') return
      if (value == "authenticated") {
        console.log("going online...");
        goOffline = await goOnline();
        return;
      };
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
    audio.play().then(()=> console.log('the sound runs'));
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
