<template>
    <!-- Team section -->
    <section class="mx-auto max-w-7xl px-4 pb-20 xs:px-6 sm:pb-28 lg:px-8" aria-labelledby="team-heading">
        <div class="flex items-end justify-between">
            <div>
                <h2
                    class="inline-flex rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white"
                    id="team-heading">
                    معبرينا
                </h2>
                <div class="pt-6 text-lg font-medium leading-[1.75] xs:text-xl 2xl:text-2xl">
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
                <ExpressorCard v-for="expressor in expressors" :expressor="expressor"  />
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { PaginationResponse, Service } from '~/types';

const expressors = ref<Service[]>([]);
// const expressors = computed(() =>
//     _expressors.value.results
//         ? _expressors.value.results
//               .sort((a, b) => b.rate - a.rate)
//               .filter((expressor, index) => index < 6)
//               .sort((a, b) => b.ordered_count - a.ordered_count)
//         : []
// );
const loading = ref(false);


if(!process.client){
     fetchExpressors();
}

onMounted(async () => {

    if(expressors.value.length == 0){
         fetchExpressors();
    }

}) 

async function fetchExpressors() {
    loading.value = true;

    const data = (await useApi('/api/expressors')) as  PaginationResponse<Service>;


    expressors.value = data?.results
                    ? data.results
                          .sort((a, b) => b.rate - a.rate)
                          .sort((a, b) => b.ordered_count - a.ordered_count)
                    : [];


    // await useFetch('/api/expressors', {
    //     onResponse({ response }) {
    //         if (response.status === 200) {
    //             if (!response._data) return;

    //             const data: { results: Service[] } = response._data;
    //         }
    //     }
    // });

    loading.value = false;
}
</script>

<style scoped></style>
