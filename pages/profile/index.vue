<template>

    <Head>
        <title v-if="!edit">عبر - الملف الشخصي</title>
        <title v-else>عبر - {{ data.first_name }}</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <HeroBackground />
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
                <template v-if="activeTab == 'informationsService'">
                    <ProfileServiceInformation />
                </template>
                <template v-if="activeTab == 'subscriptions'">
                    <PackagesSubscriptions/>
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

const activeTab = ref('details');
onBeforeMount(() => {
    if(route.fullPath == '/profile?status=new'){
            if(data.value.user_type == 'معبر'){
                navigateTo({name: 'orders'});
            } else {
                navigateTo('/');
            }
    }
})
onMounted(async () => {
    await fetchBookmarked()

});

definePageMeta({
    middleware: 'auth',
    layout: false
});
</script>

<style scoped></style>
