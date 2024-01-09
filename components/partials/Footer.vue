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
                        <NuxtLink class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :to="{ name : 'about-us'}" up-target="body"
                            >من نحن</NuxtLink
                        >
                    </li>
                    <li>
                        <NuxtLink class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :to="{ name : 'terms-conditions'}" up-target="body"
                            >الشروط والأحكام</NuxtLink
                        >
                    </li>
                    <li>
                        <NuxtLink class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :to="{ name : 'user-agreement'}" up-target="body"
                            >إتفاقية المستخدم</NuxtLink
                        >
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-sm font-semibold xs:text-base">صفحات مهمة</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li>
                        <NuxtLink class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :to="{ name : 'index'}" up-target="body"
                            >الرئيسية</NuxtLink
                        >
                    </li>
                    <li>
                        <NuxtLink class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :to="{ name : 'blog'}" up-target="body"
                            >المدونة
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :to="{ name : 'index'}" up-target="body"
                            >مركز الدعم</NuxtLink
                        >
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-sm font-semibold xs:text-base">تواصل معنا</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li>
                        <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="settings.social_settings?.twitter" target="_blank" up-target="body"
                            >تويتر</a
                        >
                    </li>
                    <li>
                        <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="settings.social_settings?.facebook" target="_blank" up-target="body"
                            >فيسبوك</a
                        >
                    </li>
                    <li>
                        <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="settings.social_settings?.instagram" target="_blank" up-target="body"
                            >إنستغرام</a
                        >
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-sm font-semibold xs:text-base">إتصل بنا</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li>
                        <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base"  up-target="body"
                            >
                            {{ settings.general_settings?.address }}
                            </a
                        >
                    </li>
                    <li dir="ltr">
                        <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="'tel:' + settings.general_settings?.phone" up-target="body">
                            {{ settings.general_settings?.phone }}
                        </a>
                    </li>
                    <li>
                        <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="'mailto:' + settings.general_settings?.email" up-target="body"
                            >
                            {{ settings.general_settings?.email }}
                            </a
                        >
                    </li>
                </ul>
            </div>
        </div>
        <div class="py-8 md:flex md:items-center md:justify-between">
            <p class="text-center text-sm text-gray-800 xs:text-base">جميع الحقوق محفوظة &copy; عبر 2023.</p>
            <div class="flex justify-center space-x-6 pt-8 rtl:space-x-reverse md:pt-0">
                <a href="#" target="_blank">
                    <img
                        class="lazyload max-w-none"
                        src="/images/payments/mastercard.webp"
                        height="24"
                        width="36"
                        alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <img
                        class="lazyload max-w-none"
                        src="/images/payments/visa.webp"
                        height="24"
                        width="45"
                        alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <img
                        class="lazyload max-w-none"
                        src="/images/payments/mada.png"
                        height="24"
                        width="48"
                        alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <img
                        class="lazyload max-w-none"
                        src="/images/payments/stc_pay.webp"
                        height="24"
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
