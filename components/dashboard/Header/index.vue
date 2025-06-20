<template>
    <header class="relative z-20 mx-auto max-w-7xl">

        <nav class="flex items-center justify-between px-4 py-6 xs:px-6 md:px-8" aria-label="Global">
            <div class="flex md:flex-1">
                <NuxtLink :to="{ name: 'dashboardv2' }" class="-m-1.5 p-1.5" aria-label="home button" href="/">
                    <NuxtImg src="/images/logo.webp" class="h-14 w-auto md:h-12" height="56" width="56" alt="عبر" />
                </NuxtLink>
            </div>
            <div class="flex items-center md:hidden gap-3">
                
                <HeaderNotificationsButton
                    v-if="status == 'authenticated'"
                    @click="notificationDropdown = !notificationDropdown" />

                <button
                    class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
                    type="button"
                    @click="openDropdown = true">
                    <span class="sr-only">فتح القائمة الرئيسية</span>
                    <Bars3Icon class="w-9 h-9" />
                </button>

            </div>

            <div v-if="status == 'authenticated' || data?.id" class="hidden md:flex md:flex-1 md:justify-end">
                <div class="flex items-center">
                    <!-- Notification Button -->

                    <DashboardHeaderNotificationsButton
                        ref="notificationsButton"
                        @click="notificationDropdown = !notificationDropdown" />


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
                            <img class="lazyload h-9 w-9 rounded-full" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="data.image_url" height="36" width="36" alt="" />
                        </button>

                        <transition
                            enter-active-class="transition-all"
                            leave-active-class="transition-all"
                            enter-from-class="translate-y-4 opacity-0"
                            leave-to-class="translate-y-4 opacity-0">
                            <DashboardHeaderProfileDropdown
                                ref="profileDropdownRef"
                                @logout="logout"
                                @close="profileDropdown = false"
                                v-if="profileDropdown" />
                        </transition>
                    </div>
                </div>
            </div>
            <div v-else class="hidden md:flex md:flex-1 md:justify-end 2xl:text-lg">
                <!-- Login Link -->
                <NuxtLink class="font-medium" :to="{ name: 'accounts-sms' }">
                    تسجيل الدخول<span aria-hidden="true"><span aria-hidden="true">←</span></span>
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

        <DashboardHeaderHorizontalMenu />

        <!-- Mobile menu, show/hide based on menu open state. -->
        <transition
            enter-active-class="transition-all"
            leave-active-class="transition-all"
            enter-from-class="translate-y-4 opacity-0"
            leave-to-class="translate-y-4 opacity-0">
            <div
                class="is-scroll fixed inset-0 divide-y-2 divide-gray-50 overflow-y-auto bg-white px-6 py-6 md:hidden"
                v-if="openDropdown">
                <DashboardHeaderMobileNavigation @close="openDropdown = false" />
                <DashboardHeaderProfileCardMobile
                    v-if="status == 'authenticated'"
                    @logout="logout"
                    @navigate="navigateAndClose" @close="openDropdown = false" />
            </div>
        </transition>
    </header>
</template>

<script setup lang="ts">
    const { data, signOut, status } = useAuth();

    import { Bars3Icon } from '@heroicons/vue/24/outline';
    import { onClickOutside } from '@vueuse/core';
    import { vOnClickOutside } from '@vueuse/components';
    import useLogout from '~/composables/useLogout';

    const openDropdown = ref(false);
    const profileDropdown = ref(false);
    const notificationDropdown = ref(false);

    const notificationsButton = ref(null);
    const profileDropdownButton = ref(null);
    const profileDropdownRef = ref(null);

    const loading = ref(false);

    const router = useRouter();



    async function logout() {

        await useLogout()
    }

    // Set up the click outside detection when the dropdown appears
    watch(profileDropdown, (isOpen) => {
        if (isOpen) {
            // Wait for the DOM to update
            nextTick(() => {
                if (profileDropdownRef.value) {
                    // Stop existing listeners if any
                    stopProfileClickOutside?.();
                    
                    // Set up new listener
                    const { stop } = onClickOutside(profileDropdownRef, (event) => {
                        // Make sure we're not clicking the toggle button
                        if (!profileDropdownButton.value?.contains(event.target)) {
                            profileDropdown.value = false;
                        }
                    });
                    
                    stopProfileClickOutside = stop;
                }
            });
        }
    });
    
    // Variable to hold the stop function
    let stopProfileClickOutside = null;
    
    // Clean up on component unmount
    onUnmounted(() => {
        stopProfileClickOutside?.();
    });

    // Keep this for HeaderNotifications since it works for that component
    const notifictionsOnClickOutside = [
        (ev: Event) => {
            notificationDropdown.value = false;
        },
        { ignore: [notificationsButton] },
    ];

    async function navigateAndClose(url: string | { name: string; params?: Object }) {
        await useRouter().push(url);
        openDropdown.value = false;
    }
</script>

<style scoped></style>
