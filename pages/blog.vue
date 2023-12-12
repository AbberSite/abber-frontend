<template>
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                </div>
            </div>
            <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                </div>
            </div>
        </section>
        <!-- Blog section -->
        <section
            class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="blog-heading">
            <h1 class="inline-flex rounded-full bg-gray-900 px-4 pb-1.5 pt-2 text-xs font-semibold text-white">المدونة</h1>
            <div class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">اخر المقالات المقدمة إسبوعيا
            </div>
            <form class="w-full max-w-sm pt-10" method="GET">
                <div class="w-full space-y-3">
                    <div class="relative">
                        <input class="form-control h-[50px] appearance-none ps-12" type="search" name="q" id="search"
                            placeholder="البحث" required /><span
                            class="absolute h-[50px] items-center justify-center px-4 py-4 ltr:left-0 rtl:right-0 rtl:scale-x-flip">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" height="20" width="20">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                            </svg></span>
                    </div>
                </div>
            </form>

            <div
                class="is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base">
                <a class="flex items-center space-x-3 whitespace-nowrap border-b-2  px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
                    :class="[selectedCategory === '' ? 'border-gray-900': 'border-transparent']"
                    @click.prevent="selectedCategory = '' "
                    href="/blog">
                    <span>الكل</span>
                    <span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
                        {{ response.results?.length }}
                    </span>
                </a>
                <a v-for="category in categories.results" class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold text-gray-500 hover:text-gray-900 focus:outline-none rtl:space-x-reverse"

                        @click.prevent="selectedCategory = category?.name"
                    :class="[selectedCategory === category?.name ? 'border-gray-900': 'border-transparent']"


                    href="#">
                    <span>
                        {{ category?.name }}
                    </span>
                    <span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
                        {{ category?.id }}
                    </span>
                </a>
            </div>
            <div class="grid gap-x-8 gap-y-20 pt-16 sm:grid-cols-2 lg:grid-cols-3">

                <div v-if="pending">
                    جاري التحميل
                </div>
                <template v-else>
                    <BlogCard v-for="post in filteredPosts" :type="post.post_category.name" :title="post.title"
                        :duration="post.content.length / 200 + 'دقائق قراءة'" :resume="post.meta_content"
                        :image="post.image" />
                </template>

            </div>
            <nav class="flex items-center justify-between pt-28 sm:w-full" aria-label="Pagination">
                <div class="hidden sm:block">
                    <p class="space-x-2 rtl:space-x-reverse"><span>عرض</span><span
                            class="font-semibold">1</span><span>إلى</span><span
                            class="font-semibold">9</span><span>من</span><span
                            class="font-semibold">200</span><span>نتيجة</span></p>
                </div>
                <div class="flex flex-1 justify-between sm:justify-end"><button
                        class="relative rounded-md border border-transparent bg-gray-100 px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed"
                        type="button" disabled>السابق</button><a
                        class="relative ms-3 inline-flex items-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                        href="#">التالي</a></div>
            </nav>
        </section>
    </main>
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
    id : number, 
    name : string
}


type Response = {

    count?: number,
    next?: string,
    previous?: string,
    results?: Post[]
}



const  selectedCategory = ref("")


const { data: response, pending } = await useAsyncData('posts', async () => await fetchPosts()) as { data: Ref<Response>, pending: any }


const { data: categories, pending : categoriesPneding } = await useAsyncData('categories', async () => await fetchCategories()) as { data: any, pending: any }

async function fetchPosts() {
    const response = await useFetch("/api/blog/posts")

    return response.data
}

async function fetchCategories(){

  const response = await useFetch("/api/blog/categories")

    return response.data
}


onMounted(async () => await fetchPosts())


const filteredPosts = computed(() => {

    if(selectedCategory.value === "") {

        return response.value.results
    }

    return response.value.results?.filter(post => {
        return post.post_category.name == selectedCategory.value
    })
})

// const types = computed(() => {

//     const categories : any = {}; 

//     console.log(response?.value)

//     response.value.results?.map((post) => {

//         if(!categories[post.post_category.name]){ 
//             categories[post.post_category.name] = 0
//         }
//         categories[post.post_category.name]++

//     })

//     return categories; 

// })

</script>

<style scoped></style>