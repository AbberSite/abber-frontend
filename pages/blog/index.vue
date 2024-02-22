<template>
    <Head>
        <title>عبر - المدونة</title>
    </Head>
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
            <div
                class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div
                    class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "></div>
            </div>
            <div
                class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div
                    class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "></div>
            </div>
        </section>
        <!-- Blog section -->
        <section
            class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="blog-heading">
            <h1 class="inline-flex rounded-full bg-gray-900 px-4 pb-1.5 pt-2 text-xs font-semibold text-white">
                المدونة
            </h1>
            <div class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">
                اخر المقالات المقدمة إسبوعيا
            </div>
            <form class="w-full max-w-sm pt-10" method="GET">
                <div class="w-full space-y-3">
                    <div class="relative">
                        <input
                            v-model="search"
                            class="form-control h-[50px] appearance-none ps-12"
                            type="search"
                            name="q"
                            id="search"
                            placeholder="البحث"
                            required />
                        <span
                            class="absolute h-[50px] items-center justify-center px-4 py-4 ltr:left-0 rtl:right-0 rtl:scale-x-flip">
                            <MagnifyingGlassIcon class="w-5 h-5" />
                        </span>
                    </div>
                </div>
            </form>

            <BlogCategories :total="(total as number)" v-model="selectedCategory" />

            <div class="grid gap-x-8 gap-y-20 pt-16 sm:grid-cols-2 lg:grid-cols-3 w-full">
                <template v-if="loading">
                    <SkeletonsPostCard />
                    <SkeletonsPostCard />
                    <SkeletonsPostCard />
                    <SkeletonsPostCard />
                    <SkeletonsPostCard />
                    <SkeletonsPostCard />
                </template>

                <template v-else>
                    <BlogCard
                        v-for="post in filteredPosts"
                        :type="post.post_category.name"
                        :title="post.title"
                        duration="5 دقائق قراءة"
                        :image-alt="post.image_alt"
                        :resume="post.meta_content"
                        :image="post.image"
                        :slug="post.slug" />
                </template>
            </div>

            <nav class="flex w-full items-center justify-between pt-28" aria-label="Pagination">
                <div class="hidden sm:block">
                    <p class="space-x-2 rtl:space-x-reverse">
                        <span>عرض</span>
                        <span class="font-semibold">{{ from }}</span>
                        <span>إلى</span>
                        <span class="font-semibold">{{ to }}</span>
                        <span>من</span>
                        <span class="font-semibold">{{ posts.count }}</span>
                        <span>نتيجة</span>
                    </p>
                </div>
                <div class="flex w-full items-center justify-between sm:justify-end">
                    <button
                        @click="
                            async () => {
                                previousLoading = true;
                                await fetchPosts(getParams(posts?.previous)), (previousLoading = false);
                            }
                        "
                        :disabled="!posts?.previous?.length"
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
                            {{ posts.count }}
                        </span>
                    </p>
                    <button
                        type="button"
                        :disabled="!posts?.next?.length"
                        :loading="nextLoading"
                        @click="
                            async () => {
                                nextLoading = true;
                                await fetchPosts(getParams(posts?.next));
                                nextLoading = false;
                            }
                        "
                        class="relative ms-3 inline-flex items-center rounded-md border border-transparent bg-gray-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black"
                        href="#">
                        <Loading v-if="nextLoading" />
                        <span v-else class="mt-1.5">التالي</span>
                    </button>
                </div>
            </nav>
        </section>
    </main>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

definePageMeta({
    auth : false
})

type Post = {
    id: string;
    user: string;
    post_category: Category;
    title: string;
    content: string;
    meta_content: string;
    image: string;
    image_alt: string;
    slug: string;
    active: boolean;
    bookmark: [];
};

type Category = {
    id: number;
    name: string;
};

type Response = {
    count?: number;
    next?: string;
    previous?: string;
    results: Post[];
};

const selectedCategory = ref('');
const posts = ref<Response>({ results: [] });
const loading = ref(true);
const search = ref('');
const perPage = 9;

const nextLoading = ref(false);
const previousLoading = ref(false);

const filteredPosts = computed(() => {
    return posts.value?.results;
});

const debouncedSearch = useDebounceFn(async (value) => {
    await fetchPosts({ search: value, post_category: selectedCategory.value });
}, 500);

watch(search, debouncedSearch);

watch(selectedCategory, async (value: string) => {
    await fetchPosts({ post_category: value, search: search.value });
});

async function fetchPosts(params: any) {
    loading.value = true;

    params.active = true;
    params.accepted = true;
    params.limit = perPage;

    const { data } = (await useFetch(`/api/blog/posts`, {
        params
    })) as { data: Ref<Response> };

    if (!data.value) return;

    pagainationMeta.value = { offset: params.offset ?? 0, limit: params.limit ?? perPage } as {
        offset: number | string;
        limit: number | string;
    };

    posts.value = data.value;

    loading.value = false;
}

const total = ref<number | undefined>(0);
const pagainationMeta = ref<{ offset: number | string; limit: number | string }>({ offset: 0, limit: perPage });

onMounted(async () => {

    await fetchPosts({ offset: 0, limit: perPage });

    await fetchPosts({ offset: 0, limit: perPage });
    total.value = posts.value.count;
});

const from = computed(() => Number.parseInt(pagainationMeta.value.offset as string) + 1);
const to = computed(() =>
    posts.value?.next?.length
        ? Number.parseInt(pagainationMeta.value.offset as string) +
          Number.parseInt(pagainationMeta.value.limit as string)
        : ((Number.parseInt(pagainationMeta.value.offset as string) + posts.value.results?.length) as number)
);

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
