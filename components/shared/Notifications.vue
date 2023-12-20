<template>
    <div
        class="fixed inset-0 divide-y-2 divide-gray-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 md:absolute md:inset-auto md:top-[84px] md:w-[340px] md:rounded-md ltr:md:right-20 rtl:md:left-20"
        x-show="openDropdown === 1"
        x-cloak>
        <div class="flex items-center justify-between px-6 py-8 md:hidden">
            <h2 class="text-lg font-semibold xs:text-xl">الإشعارات</h2>
            <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button">
                <span class="sr-only">إغلاق القائمة</span>
                <!-- Heroicon name: outline/x-mark -->
                <svg
                    height="26"
                    width="26"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>

        <!-- Show when founded notifications list -->

        <ul class="is-scroll max-h-[400px] divide-y divide-gray-100 overflow-y-auto">
            <li class="bg-gray-50" v-for="notification in data.notifications.results">
                <NuxtLink class="flex flex-col px-6 py-8 md:py-6">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <NuxtImg
                                    class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10"
                                    :src="notification.sender.image"
                                    height=""
                                    width=""
                                    alt="صورة المستخدم" />
                            </div>
                            <div class="ms-3 flex flex-col">
                                <div class="text-sm font-semibold">
                                    {{ notification.sender.first_name }}
                                </div>
                                <div class="text-xs font-medium text-gray-600">مدير</div>
                            </div>
                        </div>
                        <time class="text-xs text-gray-600" datetime="2023-11-07">
                            {{ 
                                getTimeDifference(notification.date)
                             }}
                        </time>
                    </div>
                    <p class="pt-6 text-justify text-sm text-gray-800 md:pt-4">
                        {{ notification.message }}
                    </p>
                </NuxtLink>
            </li>
            <!-- <li class="bg-gray-50">
                <a class="flex flex-col px-6 py-8 md:py-6" href="#">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <img
                                    class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10"
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                                    data-src="/assets/images/avatar.webp"
                                    height=""
                                    width=""
                                    alt="صورة المستخدم" />
                            </div>
                            <div class="ms-3 flex flex-col">
                                <div class="text-sm font-semibold">عبدالله النعيمي</div>
                                <div class="text-xs font-medium text-gray-600">مدير</div>
                            </div>
                        </div>
                        <time class="text-xs text-gray-600" datetime="2023-11-07">1 أسبوع، 5 أيام</time>
                    </div>
                    <p class="pt-6 text-justify text-sm text-gray-800 md:pt-4">
                        تم الموافقه علي طلب سلمان حسن واصبح معبر
                    </p>
                </a>
            </li>
            <li class="hover:bg-gray-50">
                <a class="flex flex-col px-6 py-8 md:py-6" href="#">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <img
                                    class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10"
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                                    data-src="/assets/images/avatar.webp"
                                    height=""
                                    width=""
                                    alt="صورة المستخدم" />
                            </div>
                            <div class="ms-3 flex flex-col">
                                <div class="text-sm font-semibold">عبدالله النعيمي</div>
                                <div class="text-xs font-medium text-gray-600">مدير</div>
                            </div>
                        </div>
                        <time class="text-xs text-gray-600" datetime="2023-11-07">1 أسبوع، 5 أيام</time>
                    </div>
                    <p class="pt-6 text-justify text-sm text-gray-800 md:pt-4">
                        تم الموافقه علي طلب سلمان حسن واصبح معبر
                    </p>
                </a>
            </li>
            <li class="hover:bg-gray-50">
                <a class="flex flex-col px-6 py-8 md:py-6" href="#">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <img
                                    class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10"
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                                    data-src="/assets/images/avatar.webp"
                                    height=""
                                    width=""
                                    alt="صورة المستخدم" />
                            </div>
                            <div class="ms-3 flex flex-col">
                                <div class="text-sm font-semibold">عبدالله النعيمي</div>
                                <div class="text-xs font-medium text-gray-600">مدير</div>
                            </div>
                        </div>
                        <time class="text-xs text-gray-600" datetime="2023-11-07">1 أسبوع، 5 أيام</time>
                    </div>
                    <p class="pt-6 text-justify text-sm text-gray-800 md:pt-4">
                        تم الموافقه علي طلب سلمان حسن واصبح معبر
                    </p>
                </a>
            </li> -->
        </ul>
        <div class="fixed bottom-0 z-40 w-full bg-white px-6 py-6 text-center md:relative">
            <a class="px-6 py-3 font-semibold md:text-sm" href="#">عرض جميع الإشعارات ←</a>
        </div>
        <!-- Show when empty notifications list 
        <div class="flex h-[75%] flex-col items-center justify-center p-6 text-center">
          <span class="flex-shrink-0">
            <svg class="text-gray-400" height="40" width="40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
            </svg>
          </span>
          <p class="pt-4 font-semibold text-gray-700 text-sm xs:text-[15px] md:text-sm">لا توجد إشعارات لعرضها حتى الان.</p>
        </div>
        -->
    </div>
</template>

<script setup lang="ts">
    const { data } = useAuth() as { data : Ref<{ notifications : { results : Notification[]}}>};

    type User = {
        username: string;
        first_name: string;
        last_name: string;
        image: string;
        is_online: boolean;
    };

    type Notification = {
        user: User;
        sender: User;
        message: string;
        read: boolean;
        date: string;
        url: string;
    };

    function getTimeDifference(_start: string) {

        const end = new Date(); 
        const start = new Date(_start);

        const timeDifference = end.getTime() - start.getTime();

        const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

        const rtf = new Intl.RelativeTimeFormat('ar', { numeric: 'auto', style: 'narrow' });

        if (daysDifference >= 7) {
            const weeks = Math.floor(daysDifference / 7);
            return rtf.format(-weeks, 'week');
        } else if (daysDifference >= 1) {
            return rtf.format(-daysDifference, 'day');
        } else {
            return rtf.format(0, 'day');
        }

    }
</script>

<style scoped></style>
