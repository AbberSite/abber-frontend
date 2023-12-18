<template>
    <section class="mx-auto max-w-7xl px-4 pb-36 xs:px-6 lg:px-8 xl:pb-44" aria-labelledby="articles-heading">
        <div class="flex items-end justify-between">
            <div>
                <h2 class="inline-flex rounded-full bg-gray-900 px-4 pb-1.5 pt-2 text-xs font-semibold text-white"
                    id="articles-heading">المدونة</h2>
                <div class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">اخر المقالات المقدمة إسبوعيا
                </div>
            </div>
            <NuxtLink class="hidden font-semibold text-gray-700 hover:text-gray-900 sm:flex"  :to="{name : 'blog'}">عرض جميع المقالات ←</NuxtLink>
        </div>
        <div class="flex w-full justify-center mt-10" v-if="loading">
            <Loading />
        </div>
        <div v-else class="grid gap-x-8 gap-y-20 pt-16 sm:grid-cols-2 lg:grid-cols-3">

            <BlogCard v-for="post in posts" :type="post.post_category.name" :title="post.title"
            duration="5 دقائق قراءة" :image-alt="post.image_alt" :resume="post.meta_content" :image="post.image" :slug="post.slug" />
            <!-- <article>
                <a href="#">

                    <img class="lazyload aspect-[3/2] w-full rounded-xl bg-gray-50"
                        src="../../assets/images/articles/1.webp" alt="صورة المقالة" />

                    <NuxtImg fit="outside" class="w-full rounded-xl bg-gray-50" src="../../images/articles/1.webp"
                        width="384" height="256" />
                </a>
                <div class="flex w-full flex-col space-y-4 pt-8 text-right">
                    <div class="flex items-center justify-between text-gray-700">
                        <a class="rounded-full bg-gray-50 px-4 pb-1.5 pt-2 text-[13px] font-semibold hover:bg-gray-100 hover:text-gray-900"
                            href="#">تفسير الأحلام</a>
                        <span class="text-[13px]">5 دقائق قراءة</span>
                    </div>
                    <h3 class="pt-2 font-semibold leading-[1.75] xs:text-lg xs:leading-[1.75]">
                        <a href="#">تفسير حلم العنكبوت تبعاً للحالة الاجتماعية للرائي</a>
                    </h3>
                    <p class="text-justify text-sm text-gray-800 xs:text-base">تعرف على تفسير حلم العنكبوت: 1- امرأة ناشز
                        تهجر فراش زوجها، 2- الحسد رمز العنكبوت الأصفر، 3- بشارة خير دلالة العنكبوت الأبيض، 4- السحر
                        والكراهية رمز للعنكبوت الأسود في المنام.</p>
                    <div class="text-sm font-semibold xs:text-base">
                        <a href="#">إقرأ المزيد ←</a>
                    </div>
                </div>
            </article> -->
            <NuxtLink :to="{name : 'blog'}" class="block text-center font-semibold xs:text-lg sm:hidden" >عرض جميع المقالات ←</NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">



type Post = {
    user: string,
    post_category: Category,
    title: string,
    content: string,
    meta_content: string,
    image: string,
    image_alt: string,
    slug: string,
    active: boolean,
    bookmark: []
}

type Category = {
    id: number,
    name: string
}


type Response = {

    count?: number,
    next?: string,
    previous?: string,
    results?: Post[]
}

const loading = ref(false)

const posts = ref<Post[]>()

async function fetchPosts(url: string = "https://test.abber.co/api/blog/posts/?active=true&accepted=true") {

    loading.value = true



    const { data } = await useFetch(`/api/blog/posts?url=${url}`) as { data: Ref<Response> }

    posts.value = data.value?.results?.filter((post, index) => index < 3)

    loading.value = false
}


onMounted(async () => {

    await fetchPosts()
    await fetchPosts()

})

</script>



<style scoped></style>