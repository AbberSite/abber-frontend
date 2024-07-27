<template>
  <Head>
    <title>عبر - المعبرون</title>
  </Head>
  <main class="min-h-screen outline-none">
    <!-- Hero section -->
    <HeroBackground />
    <!-- Blog section -->
    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="blog-heading">
      <h1 class="inline-flex rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white">
        المعبرون
      </h1>
      <div class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">
        نخبة من المعبرين مستعدين لتفسير أحلامك
      </div>

      <div class="gap-x-8 pt-8 sm:columns-2 lg:columns-3">
        <template v-if="loading">
          <SkeletonsExpressorCard />
          <SkeletonsExpressorCard />
          <SkeletonsExpressorCard />

          <SkeletonsExpressorCard />
          <SkeletonsExpressorCard />
          <SkeletonsExpressorCard />
        </template>

        <template v-else>
          <ExpressorCard v-for="expressor in expressors" :expressor="expressor" />
        </template>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { PaginationResponse, Service } from "~/types";
definePageMeta({
  auth: false,
});

const expressors = ref<Service[]>([]);
const loading = ref(false);

onMounted(async () => {
  if (expressors.value.length == 0) {
    fetchExpressors();
  }
});

async function fetchExpressors() {
  loading.value = true;
  const data = (await useApi("/api/expressors")) as PaginationResponse<Service>;
  expressors.value = data?.results;
  loading.value = false;
}
</script>

<style scoped></style>
