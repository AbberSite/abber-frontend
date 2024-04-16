<template>

    <Head>
        <title v-if="!edit">عبر - الملف الشخصي</title>
        <title v-else>عبر - {{ data.first_name }}</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
            <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
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
        <!-- Profile section -->
        <section
            class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 sm:items-stretch md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="profile-heading">
            <ProfileHeader v-model="edit" />

            <template v-if="edit">
                <ClientOnly>
                    <ProfileEdit />
                </ClientOnly>
            </template>

            <template v-else>
                <ProfileTabs v-model="activeTab" />
                <ProfileDetails v-if="activeTab == 'details'" />

                <template v-if="activeTab == 'posts'">
                    <Suspense>
                        <template #fallback>
                            <div class="grid gap-x-8 gap-y-20 pt-16 sm:grid-cols-2 lg:grid-cols-3 w-full">
                                <SkeletonsPostCard />
                                <SkeletonsPostCard />
                                <SkeletonsPostCard />
                                <SkeletonsPostCard />
                                <SkeletonsPostCard />
                                <SkeletonsPostCard />
                            </div>
                        </template>

                        <template #default>
                            <ProfileBookmarkedPosts class="w-full" />
                        </template>
                    </Suspense>
                </template>
            </template>
        </section>
    </main>
    <Footer v-if="!edit" />
</template>

<script setup lang="ts">
const { fetchBookmarked } = usePostsStore();
const edit = ref(false);
const { data } = useAuth()
const route = useRoute();

const activeTab = ref<'details' | 'posts'>('details');
onBeforeMount(()=> {
    if (route.fullPath == '/profile?status=new') {
        if (data.value.user_type == 'معبر'){
            setTimeout(()=>{
                navigateTo('/orders/');
            }, 2000)
        }
        else {
            navigateTo('/');
        }
    }
})
onMounted(async () => {
    

    await fetchBookmarked()
    await fetchBookmarked()

});

definePageMeta({
    middleware: 'auth',
    layout: false
});
</script>

<style scoped></style>
