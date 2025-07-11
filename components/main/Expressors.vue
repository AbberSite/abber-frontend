<template>
  <!-- Team section -->
  <section
    class="mx-auto max-w-7xl px-4 pb-20 xs:px-6 sm:pb-28 lg:px-8"
    aria-labelledby="team-heading"
  >
    <div class="flex items-end justify-between">
      <div>
        <h2
          class="inline-flex rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white"
          id="team-heading"
        >
          معبرينا
        </h2>
        <div
          class="pt-6 text-lg font-medium leading-[1.75] xs:text-xl 2xl:text-2xl"
        >
          نخبة من المعبرين مستعدين لتفسير أحلامك
        </div>
      </div>
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
</template>

<script setup lang="ts">
import type { PaginationResponse, Service } from "~/types";
import { useApiCache } from '~/composables/useApiCache';

const expressors = ref<Service[]>([]);
const loading = ref(false);

if (!process.client) {
  fetchExpressors();
}

onMounted(async () => {
  if (expressors.value.length == 0) {
    await fetchExpressors();
  }
});

async function fetchExpressors() {
  loading.value = true;
  try {
    const data = await useApiCache<PaginationResponse<Service>>("/api/expressors", {
      ttl: 600000, // 10 minutes cache
      tags: ['expressors'],
      key: 'expressors-list'
    });
    expressors.value = data?.results
      ? data.results
          .sort((a, b) => b.rate - a.rate)
          .sort((a, b) => b.ordered_count - a.ordered_count)
      : [];
  } catch (error) {
    expressors.value = [];
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
