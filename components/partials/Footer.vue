<template>
    <footer class="mx-auto w-full max-w-7xl divide-y-2 divide-gray-50 px-4 xs:px-6 lg:px-8">
        <div
            class="grid grid-cols-2 gap-y-14 pb-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:pb-16 xl:grid-cols-6 xl:gap-x-10">
            <div class="col-span-full border-b border-gray-100 pb-14 md:border-b-0 md:pb-0 xl:col-span-2">
                <div>
                    <h3 class="font-semibold xs:text-lg">اشترك في نشرتنا الإخبارية</h3>
                    <p class="pt-4 text-sm text-gray-800 xs:text-base">
                        يتم إرسال أحدث الأخبار والمقالات والموارد إلى بريدك الوارد أسبوعيًا.
                    </p>
                </div>
                <form class="pt-4 sm:flex sm:max-w-md" method="POST">
                    <label class="sr-only" for="email">البريد الإلكتروني</label>
                    <div class="w-full space-y-3">
                        <input
                            class="form-control h-[50px] appearance-none"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="اكتب عنوان بريدك الالكتروني"
                            autocomplete="email"
                            required />
                    </div>
                    <div class="pt-4 sm:ms-3 sm:pt-0">
                        <button
                            class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                            type="submit">
                            <span class="mt-1.5">إشتراك</span>
                        </button>
                    </div>
                </form>
            </div>
            <div class="xl:ms-4">
                <h3 class="text-sm font-semibold xs:text-base">معلومات عنا</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li>
                        <NuxtLink
                            class="text-sm text-gray-800 hover:text-gray-900 xs:text-base"
                            :to="{ name: 'about' }"
                            
                            >من نحن</NuxtLink
                        >
                    </li>
                    <li>
                        <NuxtLink
                            class="text-sm text-gray-800 hover:text-gray-900 xs:text-base"
                            :to="{ name: 'terms' }"
                            
                            >الشروط والأحكام</NuxtLink
                        >
                    </li>
                    <li>
                        <NuxtLink
                            class="text-sm text-gray-800 hover:text-gray-900 xs:text-base"
                            :to="{ name: 'user-agreement' }"
                            
                            >إتفاقية المستخدم</NuxtLink
                        >
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-sm font-semibold xs:text-base">تواصل معنا</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li>
                        <a
                            class="text-sm text-gray-800 hover:text-gray-900 xs:text-base"
                            :href="settings.social_settings?.twitter"
                            target="_blank"
                            
                            >تويتر</a
                        >
                    </li>
                    <li>
                        <a
                            class="text-sm text-gray-800 hover:text-gray-900 xs:text-base"
                            :href="settings.social_settings?.facebook"
                            target="_blank"
                            
                            >فيسبوك</a
                        >
                    </li>
                    <li>
                        <a
                            class="text-sm text-gray-800 hover:text-gray-900 xs:text-base"
                            :href="settings.social_settings?.instagram"
                            target="_blank"
                            
                            >إنستغرام</a
                        >
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-sm font-semibold xs:text-base">إتصل بنا</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li>
                        <a href="#" class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" >
                            {{ settings.general_settings?.address }}
                        </a>
                    </li>
                    <li dir="ltr">
                        <a
                            class="text-sm text-gray-800 hover:text-gray-900 xs:text-base"
                            :href="'tel:' + settings.general_settings?.phone"
                            >
                            {{ settings.general_settings?.phone }}
                        </a>
                    </li>
                    <li>
                        <a
                            class="text-sm text-gray-800 hover:text-gray-900 xs:text-base"
                            :href="'mailto:' + settings.general_settings?.email"
                            >
                            {{ settings.general_settings?.email }}
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-sm font-semibold xs:text-base">تنزيل التطبيق</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li class="w-full sm:w-auto">
                        <a
                            class="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                            href="#">
                            <span class="mt-1.5 whitespace-nowrap text-lg font-semibold">App Store</span>
                            <svg class="ms-3 flex-shrink-0" viewBox="0 0 384 512" width="20">
                                <path
                                    fill="currentColor"
                                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg
                        ></a>
                    </li>
                    <li class="w-full sm:w-auto">
                        <a
                            class="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                            href="#">
                            <span class="mt-1.5 whitespace-nowrap text-lg font-semibold">Google Play</span>
                            <svg class="ms-3 flex-shrink-0" viewBox="30 336.7 120.9 129.2" width="20">
                                <path
                                    fill="#FFD400"
                                    d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"></path>
                                <path
                                    fill="#FF3333"
                                    d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"></path>
                                <path
                                    fill="#48FF48"
                                    d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"></path>
                                <path
                                    fill="#3BCCFF"
                                    d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"></path></svg
                        ></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="py-8 md:flex md:items-center md:justify-between">
            <p class="text-center text-sm text-gray-800 xs:text-base">جميع الحقوق محفوظة &copy; عبر 2023.</p>
            <div class="flex justify-center space-x-6 pt-8 rtl:space-x-reverse md:pt-0">
                <a href="#" target="_blank">
                    <NuxtImg                         class="lazyload max-w-none"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        data-src="/images/payments/mastercard.webp"
                        height="21"
                        width="36"
                        alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <NuxtImg class="lazyload max-w-none"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        data-src="/images/payments/visa.webp"
                        height="18"
                        width="45"
                        alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <NuxtImg                      class="lazyload max-w-none"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        data-src="/images/payments/mada.png"
                        height="16"
                        width="48"
                        alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <NuxtImg 
                        class="lazyload max-w-none"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        data-src="/images/payments/stc_pay.webp"
                        height="15"
                        width="52"
                        alt="شعار وسيلة الدفع" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
type Settings = {
    general_settings?: { phone: string; email: string; address: string };
    social_settings?: {
        facebook: string;
        snapchat: string;
        twitter: string;
        instagram: string;
    };
};

const settings = ref<Settings>({});

async function fetchSettings() {
    const { data } = await useFetch('/api/settings');

    if (!data.value) return;
    settings.value = data.value;
}

onMounted(async () => {
    await fetchSettings();
    await fetchSettings();
});
</script>

<style scoped></style>
