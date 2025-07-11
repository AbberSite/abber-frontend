<template>
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
const { setHomepageMeta } = useSEO();
const { createOrganizationSchema, createWebsiteSchema, createServiceSchema } = useSchema();
const { trackPageView } = useAnalytics();

// إعداد SEO للصفحة الرئيسية
setHomepageMeta();

// إضافة Schema Markup
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createOrganizationSchema())
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(createWebsiteSchema())
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(createServiceSchema())
    }
  ]
});

// تتبع مشاهدة الصفحة الرئيسية
onMounted(() => {
  trackPageView('الصفحة الرئيسية - عبر', '/');
});
</script>

<style scoped></style>
