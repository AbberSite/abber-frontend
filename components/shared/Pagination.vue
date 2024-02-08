<template>
    <nav class="flex w-full items-center justify-between " v-if="results.next || results.previous" aria-label="Pagination">
        <div class="hidden sm:block">
            <p class="space-x-2 rtl:space-x-reverse">
                <span>عرض</span><span class="font-semibold"> {{ from }} </span><span>إلى</span
                ><span class="font-semibold"> {{ to }} </span><span>من</span
                ><span class="font-semibold">{{ results.count }} </span><span>نتيجة</span>
            </p>
        </div>
        <div class="flex w-full items-center justify-between sm:justify-end">
            <button
                @click="change(true)"
                :disabled="!results?.previous?.length"
                class="relative inline-flex items-center rounded-md border border-transparent bg-gray-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black"
                type="button">
                <Loading v-if="previousLoading" />

                <span v-else class="mt-1.5">السابق</span>
            </button>
            <p class="space-x-2 pt-2 rtl:space-x-reverse sm:hidden">
                <span class="font-semibold">
                    {{ to }}
                </span>
                <span>\</span>
                <span class="font-semibold">
                    {{ results.count }}
                </span>
            </p>
            <button
                type="button"
                :disabled="!results?.next?.length"
                :loading="nextLoading"
                @click="change()"
                class="relative ms-3 inline-flex items-center rounded-md border border-transparent bg-gray-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black"
                href="#">
                <Loading v-if="nextLoading" />
                <span v-else class="mt-1.5">التالي</span>
            </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import type { PaginationResponse } from '~/types';

const props = withDefaults(
    defineProps<{
        results: PaginationResponse<any>;
        perPage?: number | string;
    }>(),
    {
        perPage: 20
    }
);
const nextLoading = ref(false);
const previousLoading = ref(false);

const { results } = toRefs(props);

const offset = ref<number|string>(0);
const emits = defineEmits(['change']);

const from = computed(() => Number.parseInt(offset.value as string) + 1);
const to = computed(() =>
    results.value?.next?.length
        ? Number.parseInt(offset.value as string) +
          Number.parseInt(props.perPage as string)
        : ((Number.parseInt(offset.value as string) + results.value.results?.length) as number)
);

async function change(previous?: boolean) {
    if (previousLoading.value || nextLoading.value) return;

    if (previous) {
        previousLoading.value = true;
    } else {
        nextLoading.value = true;
    }

    const params = getParams(previous ? results.value.previous : results.value.next);

    emits(
        'change',
        {
            limit: props.perPage,
            ...params
        },
        () => {
            offset.value = params.offset ?? 0;

            if (previous) {
                previousLoading.value = false;
            } else {
                nextLoading.value = false;
            }
        }
    );
}

function getParams(url?: string) {
    if (!url) return {};

    const urlSearchParams = new URLSearchParams(new URL(url).search);

    const queryParams: any = {};
    for (const [key, value] of urlSearchParams) {
        queryParams[key] = value;
    }

    return queryParams;
}
</script>

<style scoped></style>
