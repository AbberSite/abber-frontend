<template>
  <HeroBackground />
  <section
    class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-20 pt-20 xs:px-6 sm:pb-28 md:pt-32 lg:px-8"
    aria-labelledby="blog-heading">
    <div class="grid w-full gap-x-8 lg:grid-cols-3">
      <div class="sticky top-8 hidden h-fit space-y-4 rounded-lg border border-gray-100 py-6 lg:block">
        <SkeletonsSidebarPost v-if="loading" />

        <div class="px-6 text-lg font-medium" v-if="!loading">جدول المحتويات</div>
        <div class="js-toc leading-[1.75]"></div>
      </div>

      <div class="mx-auto max-w-prose lg:col-span-2 lg:max-w-full w-full">
        <SkeletonsBlogPost v-show="loading" />
        <div class="w-full" v-show="!loading">
          <div class="flex items-center justify-between text-gray-700">
            <a class="rounded-full bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800"
              href="#">
              {{ post?.post_category?.name }}
            </a>
            <span class="text-sm">{{ post.reading_time }} دقائق قراءة</span>
          </div>
          <div class="pt-8">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <a class="rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50 hover:text-blue-500"
                  :href="'https://www.facebook.com/sharer/sharer.php?href=' + currentUrl" target="_blank"
                  title="مشاركة عبر الفيسبوك">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="21"
                    width="21" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z">
                    </path>
                  </svg>
                </a>
                <a class="rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50 hover:text-sky-500"
                  :href="`https://twitter.com/share?text=عبر%20-%20المدونة%20-%20${post?.title}&url=${currentUrl}&hashtags=hashtag1,hashtag2,hashtag3`"
                  target="_blank" title="مشاركة عبر تويتر">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20"
                    width="20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z">
                    </path>
                  </svg>
                </a>
                <a class="rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50"
                  :href="`https://wa.me/?text=${currentUrl}`" target="_blank" title="مشاركة عبر الواتساب">
                  <svg class="fill-gray-900 hover:fill-[#40c351]" viewBox="0 0 24 24" height="20" width="20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z">
                    </path>
                  </svg>
                </a>
                <a class="rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50 cursor-pointer"
                  @click.prevent="copy()" title="نسخ رابط المقال">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244">
                    </path>
                  </svg>
                </a>
              </div>
              <div>
                <a class="block rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50 cursor-pointer"
                  @click.prevent="addToBookmarks" title="حفظ للقراءة لاحقا">
                  <Loading class="w-5 h-5" v-if="bookmarking" />
                  <svg v-else xmlns="http://www.w3.org/2000/svg" :class="[bookmarked ? 'fill-yellow-300' : 'fill-none']"
                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z">
                    </path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <h1 class="pt-6 text-xl font-medium leading-[1.75] lg:text-2xl lg:leading-[1.75]">
            {{ post?.title }}
          </h1>
          <img class="mt-8 w-full rounded-xl bg-gray-50 lazyload"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
            :data-src="post?.image" height="216" width="384" alt="صورة المقالة" />
          <div class="js-toc-content prose prose-sm prose-gray pt-8 lg:prose-base lg:max-w-full" ref="contentEl"
            v-html="post?.content" />
          <div class="mt-8 border-t border-gray-100 pt-8">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <a class="rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50 hover:text-blue-500"
                  :href="'https://www.facebook.com/sharer/sharer.php?href=' + currentUrl" target="_blank"
                  title="مشاركة عبر الفيسبوك">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="21"
                    width="21" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z">
                    </path>
                  </svg>
                </a>
                <a class="rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50 hover:text-sky-500"
                  :href="`https://twitter.com/share?text=عبر%20-%20المدونة%20-%20${post?.title}&url=${currentUrl}&hashtags=hashtag1,hashtag2,hashtag3`"
                  target="_blank" title="مشاركة عبر تويتر">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20"
                    width="20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z">
                    </path>
                  </svg>
                </a>
                <a class="rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50"
                  :href="`https://wa.me/?text=${currentUrl}`" target="_blank" title="مشاركة عبر الواتساب">
                  <svg class="fill-gray-900 hover:fill-[#40c351]" viewBox="0 0 24 24" height="20" width="20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z">
                    </path>
                  </svg>
                </a>
                <a class="rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50 cursor-pointer"
                  @click.prevent="copy()" title="نسخ رابط المقال">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244">
                    </path>
                  </svg>
                </a>
              </div>
              <div>
                <a class="block rounded-md border bg-white px-3 py-3 shadow-sm hover:bg-gray-50 cursor-pointer"
                  @click.prevent="addToBookmarks" title="حفظ للقراءة لاحقا">
                  <Loading class="w-5 h-5" v-if="bookmarking" />
                  <svg v-else xmlns="http://www.w3.org/2000/svg" :class="[bookmarked ? 'fill-yellow-300' : 'fill-none']"
                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z">
                    </path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <MakeDreamButtonFixed />
  <Articles :similar-posts="similarPosts" :similar="true" :current-post-slug="post?.slug" title="مقالات"
    description="إقرأ المزيد من المقالات" />
</template>

<script setup lang="ts">
import * as tocbot from "tocbot";
import "tocbot/src/scss/tocbot.scss";
import type { Post } from "~/types";

definePageMeta({
  auth: false,
});

const slug = useRoute().params.slug;

// إعداد SEO للمقال
const { setArticleMeta, setBreadcrumbSchema } = useSEO();
const { createArticleSchema } = useSchema();
const { trackPageView, trackContentView, trackShare } = useAnalytics();

const loading = ref(true);
const bookmarking = ref(false);
const { data } = useAuth();

const post = ref<Post>({ content: "" });
const similarPosts = ref<Post[]>([{ content: "" }]);

async function fetchPost() {
  const { data } = (await useFetch(`/api/blog/posts/${slug}`)) as { data: Ref<Post> };

  post.value = data.value;
}
async function fetchSimilarPosts() {
  const { data } = (await useFetch(`/api/blog/posts/${slug}/similar_posts/`)) as { data: Ref<Post[]> };

  similarPosts.value = data.value;
}

const currentUrl = computed<string>(() => (process.client ? window.location.href : ""));

async function copy() {
  await navigator.clipboard.writeText(currentUrl.value);
  useNotification({ type: "success", content: "تم نسخ رابط المقال" });
  
  // تتبع نسخ الرابط
  trackShare('article', post.value?.id, 'copy_link');
}

const bookmarked = computed(() => (post.value?.bookmark as any)?.includes?.(data.value?.id as any));
const contentEl = ref(null);

async function addToBookmarks() {
  const { rawToken, status } = useAuthState();

  if (status.value != "authenticated") {
    useRouter().push({ name: "login" });
  }

  bookmarking.value = true;

  await useFetch(`/api/blog/posts/${slug}/bookmark`, {
    headers: {
      Authorization: `JWT ${rawToken.value}`,
    },
    params: { del: (post.value?.bookmark as any)?.includes?.(data.value?.id as any) ? true : undefined },
  });

  await fetchPost();

  bookmarking.value = false;

  if (bookmarked.value) {
    useNotification({ type: "success", content: "تم حفظ المقال للقراءة لاحقا" });
    return;
  }

  useNotification({ type: "success", content: "تمت ازالة المقال من قائمة القراءة لاحقا" });
}

await fetchPost();
await fetchSimilarPosts();

// إعداد SEO بعد تحميل المقال
watch(post, (newPost) => {
  if (newPost && newPost.title) {
    setArticleMeta({
      title: newPost.title,
      description: newPost.meta_content || 'مقال من مدونة عبر لتفسير الأحلام',
      content: newPost.content,
      author: 'فريق عبر',
      publishedDate: new Date().toISOString(), // يفضل استخدام تاريخ النشر الفعلي
      image: newPost.image,
      url: `https://abber.co/blog/post/${slug}`,
      category: newPost.post_category?.name || 'تفسير الأحلام'
    });

    // إضافة Article Schema
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(createArticleSchema({
            title: newPost.title,
            description: newPost.meta_content || 'مقال من مدونة عبر لتفسير الأحلام',
            content: newPost.content,
            author: 'فريق عبر',
            publishedDate: new Date().toISOString(),
            image: newPost.image,
            url: `https://abber.co/blog/post/${slug}`,
            category: newPost.post_category?.name || 'تفسير الأحلام'
          }))
        }
      ]
    });

    // إعداد Breadcrumb
    setBreadcrumbSchema([
      { name: 'الرئيسية', url: 'https://abber.co' },
      { name: 'المدونة', url: 'https://abber.co/blog' },
      { name: newPost.title, url: `https://abber.co/blog/post/${slug}` }
    ]);
  }
}, { immediate: true });

onMounted(async () => {
  loading.value = true;

  // تتبع مشاهدة المقال
  trackPageView(`${post.value?.title} | مدونة عبر`, `/blog/post/${slug}`);
  trackContentView('article', post.value?.id, post.value?.title);

  if (contentEl.value) {
    clearStyles(contentEl.value);
  }

  tocbot.init({
    tocSelector: ".js-toc",
    contentSelector: ".js-toc-content",
    headingSelector: "h2,h3",
    hasInnerContainers: true,
  });

  const headingTitles = document.querySelectorAll("h2, h3");

  headingTitles.forEach((heading) => {
    const randomId = Math.random().toString(36).substring(7);
    heading.id = randomId;
  });

  tocbot.refresh();

  loading.value = false;
});

function clearStyles(node: HTMLElement) {
  node.removeAttribute("style");

  Array.prototype.forEach.call(node.children, (child) => {
    clearStyles(child);
  });
}
</script>

<style>
ol {
  list-style: decimal !important;
  padding: revert !important;
}

[dir="rtl"] .toc-list {
  padding-left: 0;
}

.toc-list-item {
  margin-top: 1rem;
}

.toc-list-item.is-active-li {
  position: relative;
}

.toc-link:hover {
  color: black;
}

.toc-link::before {
  background-color: white !important;
}

.is-active-link {
  font-weight: 600;
}

.is-active-link::before {
  background-color: black !important;
}

.js-toc-content img {
  @apply rounded-xl;
}
</style>
