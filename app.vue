<template>
      <NuxtLayout>
        <NuxtPage />
        <Alerts /> 
      </NuxtLayout>
</template>

<script setup>

useHead({
  bodyAttrs : {
    dir : "rtl",
    class : 'antialiased'
  }
})

definePageMeta({
  middleware : ['verified']
})

useSeoMeta({
  author : "عبر",
  robots : "index, follow",
  language : "Arabic",
  copyright : "Copyright 2023",
  ogSiteName : "عبر",
  ogType : "website",
  ogImage : "/assets/images/logo.png",
  ogImageAlt : "Og Image Alt",
  twitterImage : "/assets/images/logo.png",
  twitterCard :   "summary_large_image", 
  description : "عالمك الخاص لتفسير الأحلام",
  ogTitle : "عبر", 
  ogDescription : "عالمك الخاص لتفسير الأحلام",
  ogUrl : "https://abber.netlify.app",
  twitterTitle : "عبر",
  twitterDescription : "عالمك الخاص لتفسير الأحلام",
  "twitter:url" :  "https://abber.netlify.app",
  canonical : "https://abber.netlify.app",
})

</script>