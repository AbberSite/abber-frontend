<template>
    <Head>
        <title>عبر - الملف الشخصي</title>
    </Head>
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
            <div
                class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div
                    class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
            <div
                class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div
                    class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
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
            class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="profile-heading"
            x-data="{ openProfileDropdown: false, activeTab: 1 }">
            <h1 class="sr-only" id="profile-heading">الملف الشخصي</h1>
            <div class="flex-shrink-0">
                <NuxtImg
                    class="lazyload h-24 w-24 rounded-full bg-gray-100 object-cover"
                    :src="data.image_url"
                    height="96"
                    width="96"
                    alt="صورة المستخدم" />
            </div>
            <div class="pt-8 text-lg font-semibold">عبدالله النعيمي</div>
            <div class="flex items-center space-x-3 pt-8 rtl:space-x-reverse">
                <a
                    class="flex items-center justify-center space-x-1 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse"
                    href="#">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
                    </svg>
                    <span class="mt-1.5">تعديل</span>
                </a>
                <div class="relative">
                    <button
                        class="flex items-center justify-center rounded-md border bg-white px-4 py-3 shadow-sm hover:bg-gray-50"
                        type="button"
                        @click="openProfileDropdown = !openProfileDropdown"
                        aria-expanded="false"
                        aria-haspopup="true">
                        <span class="sr-only">فتح قائمة المستخدم</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
                        </svg>
                    </button>

                    <transition
                        enter-active-class="transition-all"
                        leave-active-class="transition-all"
                        enter-from-class="translate-y-4 opacity-0"
                        leave-to-class="translate-y-4 opacity-0">
                        <div
                            class="absolute top-[calc(100%+15px)] w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0"
                            v-if="openProfileDropdown"
                            @click="openProfileDropdown = false"
                            role="menu"
                            v-on-click-outside="() => (openProfileDropdown = false)"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabindex="-1">
                            <a
                                class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                                href="#"
                                role="menuitem"
                                tabindex="-1"
                                >تغيير كلمة المرور</a
                            >
                            <a
                                class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                                href="#"
                                @click.prevent="logout"
                                role="menuitem"
                                tabindex="-1"
                                >تسجيل الخروج</a
                            >
                            <a
                                class="block px-4 pb-1.5 pt-3 text-sm font-medium text-red-600 hover:bg-gray-50"
                                href="#"
                                role="menuitem"
                                tabindex="-1"
                                >حذف الحساب</a
                            >
                        </div>
                    </transition>
                </div>
            </div>
            <div
                class="blog is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base"
                role="tablist"
                aria-labelledby="tablist-profile"
                aria-orientation="horizontal">
                <button
                    class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
                    id="tab-1"
                    type="button"
                    @click="activeTab = 'details'"
                    role="tab"
                    aria-labelledby="tabpanel-preview-1"
                    aria-controls="tabpanel-preview-1"
                    :class="[
                        activeTab === 'details'
                            ? 'border-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-900'
                    ]">
                    البيانات الشخصية
                </button>
                <button
                    class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
                    id="tab-2"
                    type="button"
                    @click="activeTab = 'posts'"
                    role="tab"
                    aria-labelledby="tabpanel-preview-2"
                    aria-controls="tabpanel-preview-2"
                    :class="[
                        activeTab === 'posts'
                            ? 'border-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-900'
                    ]">
                    <span>إشارات مرجعية</span
                    ><span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
                        {{ total }}
                    </span>
                </button>
            </div>

            <ProfileDetails v-if="activeTab == 'details'" />
            <Articles no-header v-if="activeTab == 'posts'" class="w-full" />
        </section>
    </main>
</template>

<script setup lang="ts">

const { data, signOut } = useAuth();
import { vOnClickOutside } from '@vueuse/components';

const { total } = storeToRefs(usePostsStore());

const { fetchAll } = usePostsStore();

const activeTab = ref<'details' | 'posts'>('details');
const openProfileDropdown = ref(false);

onMounted(async () => {
    await fetchAll();
    await fetchAll();
});

async function logout() {
    await signOut({ callbackUrl: '/accounts/login', redirect: true });
    useNotification({ type: 'success', content: 'تم تسجيل الخروج بنجاح' });
}

definePageMeta({
    middleware: 'auth'
});

</script>

<style scoped></style>
