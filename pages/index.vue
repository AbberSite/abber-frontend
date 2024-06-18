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
    <Faq id="faqs" />
    <SupportFloatingButton />
  </main>

  <SupportFloatingButton />
</template>

<script setup lang="ts">
import axios from "axios";

definePageMeta({
  middleware: ["verified"],
  auth: false,
});
const { data } = useAuth();
function getAllCookies() {
  const cookies = document.cookie.split("; ");
  const cookieObj = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieObj[name] = value;
  });

  return cookieObj;
}

try {
  const cookies = getAllCookies();
  const headers = {
    "api-key": "cggh",
  };
  const response = await useFetch("/api/auth/session/", {
    method: "GET",
    headers: headers,
  });
  console.log(response);
} catch (error) {
  console.error("Error fetching data:", error);
}
</script>

<style scoped></style>
