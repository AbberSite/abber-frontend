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
    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-20 xs:px-6 sm:items-stretch sm:pt-28 lg:px-8 xl:pb-44" aria-labelledby="profile-heading">
      <ProfileHeader v-model="edit" />

      <template v-if="edit">
        <ClientOnly>
          <ProfileEdit />
        </ClientOnly>
      </template>

      <template v-else>
        <Tabs :tabs="[{name: 'البيانات الشخصية', value: 'details'}, {name: 'الإشتراكات', value: 'subscriptions', isNew: true}, {name: 'بيانات المعبر', value: 'informationsService', dontShowIt: data.user_type != 'معبر'}, {name: 'المفضلة', value: 'posts', count: bookmarkedTotal, showCounter: true}, {name: 'رمز الدعوة', value: 'referralCode'} ]" v-model="activeTab" class="pt-16"/>
        <ProfileDetails v-if="activeTab == 'details'" />

        <template v-if="activeTab == 'posts'">
          <Suspense>
            <template #fallback>
              <div class="grid gap-x-8 gap-y-20 pt-10 sm:grid-cols-2 lg:grid-cols-3 w-full">
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
          <PackagesSubscriptions />
        </template>
            <template v-if="activeTab == 'referralCode'">
          <ProfileReferralCode/>
        </template>
      </template>
    </section>
  </main>
  <Footer v-if="!edit" />
</template>

<script setup lang="ts">
const { fetchBookmarked, bookmarkedTotal } = usePostsStore();
const edit = ref(false);
const { data } = useAuth();
const route = useRoute();

const activeTab = ref("details");
onBeforeMount(() => {
  if (route.fullPath == "/profile?status=new") {
    if (data.value.user_type == "معبر") {
      navigateTo({ name: "orders" });
    } else {
      navigateTo("/");
    }
  }
});

onMounted(async () => {
  await fetchBookmarked();
  activeTab.value = getActiveTab.value;
});

const getActiveTab = computed(() => {
  if (process.client) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("tab") || "details"; // Fallback to 'default' if 'tab' is not present
  }
});

definePageMeta({
  middleware: "auth",
  layout: false,
});
</script>

<style scoped></style>
