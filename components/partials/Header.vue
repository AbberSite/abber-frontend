<template>
    <header class="absolute inset-x-0 top-0 z-30 mx-auto max-w-7xl">
        <nav class="flex items-center justify-between px-4 py-6 xs:px-6 md:px-8" aria-label="Global">
            <div class="flex md:flex-1">
                <NuxtLink :to="{name : 'index'}"  class="-m-1.5 p-1.5" aria-label="home button" href="/">
                    <img class="h-14 w-auto" src="../../assets/images/logo.webp" height="56" width="56" alt="عبر" />
                </NuxtLink>
            </div>
            <div class="flex items-center md:hidden gap-3 ">
                <!-- Notification Button -->
                <HeaderNotificationsButton :has-unread="hasUnreadNotifications" @click="notificationDropdown = !notificationDropdown" />

                <!-- Menu Button -->
                <button
                    class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
                    type="button"
                    @click="openDropdown = true">
                    <span class="sr-only">فتح القائمة الرئيسية</span>
                    <Bars3Icon class="w-9 h-9" />
                </button>
            </div>
            <HeaderNavigation />

            <div v-if="status == 'authenticated' && !loading" class="hidden md:flex md:flex-1 md:justify-end">
                <div class="flex items-center">
                    <!-- Notification Button -->

                    <HeaderNotificationsButton :has-unread="hasUnreadNotifications" @click="notificationDropdown = !notificationDropdown" />
         
                    <!-- Profile dropdown -->
                    <div class="relative ms-3">
                        <button
                            ref="profileDropdownButton"
                            class="rounded-full bg-white focus:outline-none"
                            type="button"
                            @click="profileDropdown = !profileDropdown"
                            aria-expanded="false"
                            aria-haspopup="true">
                            <span class="sr-only">فتح قائمة المستخدم</span>
                            <img class="h-10 w-10 rounded-full" :src="data.image_url" height="40" width="40" alt="" />
                        </button>

                        <transition
                            enter-active-class="transition-all"
                            leave-active-class="transition-all"
                            enter-from-class="translate-y-4 opacity-0"
                            leave-to-class="translate-y-4 opacity-0">
                            <HeaderProfileDropdown
                                @logout="logout"
                                v-if="profileDropdown"
                                v-on-click-outside="(profileOnClickOutside as any)" />
                        </transition>
                    </div>
                </div>
            </div>
            <div v-else-if="status == 'loading' || loading" class="hidden md:flex md:flex-1 md:justify-end 2xl:text-lg">
                <Loading />

                <!-- <a class="font-semibold" href="/accounts/login"></a> -->
            </div>
            <div v-else class="hidden md:flex md:flex-1 md:justify-end 2xl:text-lg">
                <!-- Login Link -->
                <NuxtLink class="font-semibold" :to="{ name: 'accounts-login' }">
                    تسجيل الدخول<span aria-hidden="true">←</span>
                </NuxtLink>
            </div>

            <transition
                enter-active-class="transition-all"
                leave-active-class="transition-all"
                enter-from-class="translate-y-4 opacity-0"
                leave-to-class="translate-y-4 opacity-0">
                <HeaderNotifications
                    @close="notificationDropdown = false"
                    v-if="notificationDropdown"
                    v-on-click-outside="(notifictionsOnClickOutside as any)" />
            </transition>
        </nav>

        <!-- Mobile menu, show/hide based on menu open state. -->
        <div
            class="is-scroll fixed inset-0 divide-y-2 divide-gray-50 overflow-y-auto bg-white px-6 py-6 md:hidden"
            v-if="openDropdown">
            <HeaderMobileNavigation @close="openDropdown = false" @navigate="navigateAndClose" />
            <HeaderProfileCardMobile v-if="status == 'authenticated'" @logout="logout" @navigate="navigateAndClose" />
            <HeaderMobileNavigationFooter v-else @navigate="navigateAndClose" />
        </div>
    </header>
</template>

<script setup lang="ts">
    const { data, signOut, status } = useAuth();

    import { Bars3Icon } from '@heroicons/vue/24/outline';


    import { vOnClickOutside } from '@vueuse/components';

    const openDropdown = ref(false);
    const profileDropdown = ref(false);
    const notificationDropdown = ref(false);

    const notificationsButton = ref(null);
    const profileDropdownButton = ref(null);

    const loading = ref(false);

    const hasUnreadNotifications = computed(() => {
        if (status.value != 'authenticated') return false;

        for (const notification of data.value?.notifications.results) {
            if (notification.hasOwnProperty('read') && notification['read'] === false) {
                return true;
            }
        }

        return false;
    });

    async function logout() {
        loading.value = true;
        await signOut({ callbackUrl: '/accounts/login', redirect: true });
        loading.value = false;

        useNotification({ type: 'success', content: 'تم تسجيل الخروج بنجاح' });
    }

    const notifictionsOnClickOutside = [
        (ev: Event) => {
            notificationDropdown.value = false;
        },
        { ignore: [notificationsButton] },
    ];

    const profileOnClickOutside = [
        (ev: Event) => {
            profileDropdown.value = false;
        },
        { ignore: [profileDropdownButton] },
    ];

    async function navigateAndClose(url: string | { name: string; params?: Object }) {
        await useRouter().push(url);
        openDropdown.value = false;
    }
</script>

<style scoped></style>
