<template>
    <template v-if="posts.length === 0">
        <div class="flex flex-col items-center pt-16">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/bookmark -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    height="24"
                    width="24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"></path>
                </svg>
            </div>
            <div class="pt-8 font-semibold text-gray-700">لاتوجد عناصر مفضلة</div>
            <div class="mx-auto w-full max-w-sm pt-8">
                <NuxtLink class="block text-center text-sm font-semibold text-blue-600" to="/blog"
                    >عرض جميع المقالات ←
                    </NuxtLink>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="grid gap-x-8 gap-y-20 pt-16 sm:grid-cols-2 lg:grid-cols-3">
            <!-- {{ loading }} -->

            <!-- <template v-if="loading">
            <SkeletonsPostCard />
            <SkeletonsPostCard />
            <SkeletonsPostCard />
        </template>
-->

            <BlogCard
                v-for="post in posts"
                :type="post.post_category.name"
                :title="post.title"
                duration="5 دقائق قراءة"
                :image-alt="post.image_alt"
                :resume="post.meta_content"
                :image="post.image"
                :slug="post.slug" />
        </div>
    </template>
</template>

<script setup lang="ts" async>
import type { Post } from '~/types';

const posts = ref<Post[]>([]);

const { fetchBookmarked } = usePostsStore();

posts.value = await fetchBookmarked();
</script>

<style scoped></style>
