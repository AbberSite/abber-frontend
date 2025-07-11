<template>
  <main class="min-h-screen outline-none">
    <!-- Hero section -->
    <HeroBackground />
    <!-- Blog section -->
    <section
      class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-16 xs:px-6 lg:px-8 xl:pb-44"
      aria-labelledby="blog-heading">
      <h1 class="inline-flex rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white">
        المدونة
      </h1>
      <div class="pt-6 text-lg font-medium leading-[1.75] xs:text-xl 2xl:text-2xl">
        اخر المقالات المقدمة إسبوعيا
      </div>
      <div class="w-full max-w-sm pt-10" method="GET">
        <div class="w-full space-y-3">
          <div class="relative">
            <input v-model="search" class="form-control h-[50px] appearance-none ps-12" type="search" name="q"
              id="search" placeholder="البحث" required />
            <span
              class="absolute h-[50px] items-center justify-center px-4 py-4 ltr:left-0 rtl:right-0 rtl:scale-x-flip">
              <MagnifyingGlassIcon class="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>

      <LazyBlogCategories v-model="selectedCategory" />

      <div class="grid gap-x-8 gap-y-20 pt-16 sm:grid-cols-2 lg:grid-cols-3 w-full" ref="postsElement">
        <template v-if="loading">
          <LazySkeletonsPostCard />
          <LazySkeletonsPostCard />
          <LazySkeletonsPostCard />
          <LazySkeletonsPostCard />
          <LazySkeletonsPostCard />
          <LazySkeletonsPostCard />
        </template>

        <template v-else>
          <LazyBlogCard v-for="post in filteredPosts" :type="post.post_category.name" :title="post.title"
            :duration="post.reading_time" :image-alt="post.image_alt" :resume="post.meta_content" :image="post.image"
            :slug="post.slug" />
        </template>
      </div>

      <nav class="flex w-full items-center justify-between pt-28" aria-label="Pagination">
        <div class="hidden sm:block">
          <p class="space-x-2 rtl:space-x-reverse">
            <span>عرض</span>
            <span class="font-medium">{{ from }}</span>
            <span>إلى</span>
            <span class="font-medium">{{ to }}</span>
            <span>من</span>
            <span class="font-medium">{{ posts.count }}</span>
            <span>نتيجة</span>
          </p>
        </div>
        <div class="flex w-full items-center justify-between sm:justify-end">
          <button @click="previousButton()" :disabled="!posts?.previous?.length"
            class="relative inline-flex items-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black"
            type="button">
            <Loading v-if="previousLoading" />

            <span v-else>السابق</span>
          </button>
          <p class="space-x-2 rtl:space-x-reverse sm:hidden">
            <span class="font-medium">
              {{ to }}
            </span>
            <span>\</span>
            <span class="font-medium">
              {{ posts.count }}
            </span>
          </p>
          <button type="button" :disabled="!posts?.next?.length" :loading="nextLoading" @click="nextButton()"
            class="relative ms-3 inline-flex items-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black"
            href="#">
            <LazyLoading v-if="nextLoading" />
            <span v-else>التالي</span>
          </button>
        </div>
      </nav>
    </section>
    <LazyMakeDreamButtonFixed />
  </main>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import type { Post } from '~/types';

definePageMeta({
  auth: false,
});

// إعداد SEO للمدونة
const { setBasicMeta, setBreadcrumbSchema } = useSEO();
const { createBlogSchema } = useSchema();
const { trackPageView, trackSearch } = useAnalytics();

setBasicMeta({
  title: 'مدونة عبر - مقالات تفسير الأحلام والاستشارات الروحانية',
  description: 'اكتشف أحدث المقالات والنصائح حول تفسير الأحلام والاستشارات الروحانية من خبراء مدونة عبر',
  keywords: 'مدونة تفسير الأحلام,مقالات روحانية,نصائح الأحلام,تفسير الرؤى,مدونة عبر',
  url: 'https://abber.co/blog',
  type: 'website'
});

// إضافة Blog Schema
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createBlogSchema())
    }
  ]
});

// إعداد Breadcrumb
setBreadcrumbSchema([
  { name: 'الرئيسية', url: 'https://abber.co' },
  { name: 'المدونة', url: 'https://abber.co/blog' }
]);

const postsElement = ref(null);

type Response = {
  count?: number;
  next?: string;
  previous?: string;
  results: Post[];
};

const router = useRouter();
const route = useRoute();

const { posts, selectedCategory } = storeToRefs(usePostsStore());
const loading = ref(true);
const search = ref("");
const perPage = 9;

const nextLoading = ref(false);
const previousLoading = ref(false);

const filteredPosts = computed(() => {
  return posts.value?.results;
});
const debouncedSearch = useDebounceFn(async (value) => {
  await fetchPosts({ search: value, post_category: selectedCategory.value });
  
  // تتبع البحث
  if (value.trim()) {
    trackSearch(value, posts.value?.count || 0);
  }
}, 500);

watch(search, debouncedSearch);

watch(selectedCategory, async (value: string) => {
  loading.value = true;
  await fetchPosts({ post_category: value, search: search.value });

  router.push(`/blog/?category=${value}`);
  loading.value = false;
});

async function fetchPosts(params: any) {
  loading.value = true;
  params.active = true;
  params.accepted = true;
  params.limit = perPage;

  const { data } = (await useFetch(`/api/blog/posts/`, {
    params,
  })) as { data: Ref<Response> };

  loading.value = false;

  if (!data.value) return;

  pagainationMeta.value = { offset: params.offset ?? 0, limit: params.limit ?? perPage } as {
    offset: number | string;
    limit: number | string;
  };

  posts.value = data.value;

}

const pagainationMeta = ref<{ offset: number | string; limit: number | string }>({ offset: 0, limit: perPage });

onMounted(async () => {
  // تتبع مشاهدة صفحة المدونة
  trackPageView('مدونة عبر', '/blog');
  
  if (posts.value.results.length != 0) {
    loading.value = false;
    return;
  }
  await fetchPosts({ offset: 0, limit: perPage });
  await fetchPosts({ offset: 0, limit: perPage });
  loading.value = false;
});

const from = computed(() => Number.parseInt(pagainationMeta.value.offset as string) + 1);
const to = computed(() => (posts.value?.next?.length ? Number.parseInt(pagainationMeta.value.offset as string) + Number.parseInt(pagainationMeta.value.limit as string) : ((Number.parseInt(pagainationMeta.value.offset as string) + posts.value.results?.length) as number)));

function getParams(url?: string) {
  if (!url) return {};

  const urlSearchParams = new URLSearchParams(new URL(url).search);

  const queryParams: any = {};
  for (const [key, value] of urlSearchParams) {
    queryParams[key] = value;
  }

  return queryParams;
};

async function nextButton() {
  nextLoading.value = true;
  await fetchPosts(getParams(posts?.value.next));
  postsElement.value.scrollIntoView({behavoir: 'smooth', inline: 'start'});
  nextLoading.value = false;
};

async function previousButton(){
  previousLoading.value = true;
  await fetchPosts(getParams(posts?.value.previous)); 
  postsElement.value.scrollIntoView({behavoir: 'smooth', inline: 'start'});
  previousLoading.value = false;
};
</script>

<style scoped></style>
