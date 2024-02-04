<template>
    <section class="mx-auto max-w-7xl px-4 pb-36 xs:px-6 lg:px-8 xl:pb-44" aria-labelledby="articles-heading">
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
    </section>
</template>

<script setup lang="ts" async>
import type { Post } from '~/types';

const posts = ref<Post[]>([]);

const { fetchBookmarked } = usePostsStore();

posts.value = await fetchBookmarked();
</script>

<style scoped></style>
