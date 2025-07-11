<template>
  <section class="mx-auto max-w-7xl px-4 pb-20 xs:px-6 sm:pb-28 lg:px-8" aria-labelledby="articles-heading">
    <div class="flex items-end justify-between">
      <template v-if="!noHeader">
        <div>
          <h2 class="inline-flex rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white"
            id="articles-heading">
            <!-- المدونة -->
            {{ title }}
          </h2>
          <div class="pt-6 text-lg font-medium leading-[1.75] xs:text-xl 2xl:text-2xl">
            <!-- اخر المقالات المقدمة إسبوعيا -->
            {{ description }}
          </div>
        </div>
        <NuxtLink v-if="!currentPostSlug" class="hidden font-medium text-gray-700 hover:text-gray-900 sm:flex"
          :to="{ name: 'blog' }">عرض جميع المقالات <span aria-hidden="true">←</span></NuxtLink>
      </template>
    </div>
    <div class="grid gap-x-8 gap-y-20 pt-16 sm:grid-cols-2 lg:grid-cols-3">
      <template v-if="loading">
        <SkeletonsPostCard />
        <SkeletonsPostCard />
        <SkeletonsPostCard />
      </template>

      <template v-else>
        <BlogCard v-for="post in similarPosts ? similarPosts : firstThreePosts" :type="post.post_category.name"
          :title="post.title" :duration="post.reading_time" :image-alt="post.image_alt" :resume="post.meta_content"
          :image="post.image" :slug="post.slug" />
      </template>

      <NuxtLink v-if="!noHeader" :to="{ name: 'blog' }" class="block text-center font-medium xs:text-lg sm:hidden">عرض
        جميع المقالات <span aria-hidden="true">←</span></NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Post } from '~/types';



const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    currentPostSlug?: string;
    noHeader?: boolean;
    similar?: true;
    similarPosts?: Post[];
  }>(),
  {
    title: 'المدونة',
    description: 'اخر المقالات المقدمة إسبوعيا',
    currentPostSlug: undefined
  }
);
const loading = ref(true);

const posts = ref<Post[]>();
const { firstThreePosts } = storeToRefs(usePostsStore());

const { fetchAll } = usePostsStore();

if (firstThreePosts.value?.length !== 3 && !process.client && !props.similar) {
  await fetchAll();
}

if (props.currentPostSlug) {
  posts.value = props.similarPosts;
}

loading.value = false;

onMounted(async () => {
  if (firstThreePosts.value?.length === 3) {
    loading.value = false;

    return;
  }

  if (props.similar) {
    posts.value = props.similarPosts;
    loading.value = false;
    return;
  }
  await fetchAll();
  loading.value = false;
});
</script>

<style scoped></style>
