<template>
  <Head>
    <title>عبر - عالمك الخاص لتفسير الأحلام</title>
  </Head>
  <main class="min-h-screen outline-none">
    <Hero isMarkting />
  </main>

  <div class="fixed bottom-4 flex flex-col space-y-3 ltr:right-4 rtl:left-4 xs:bottom-6 ltr:xs:right-6 rtl:xs:left-6 lg:bottom-8 ltr:lg:right-8 rtl:lg:left-8">
    <transition enter-active-class="transition-all" leave-active-class="transition-all" enter-from-class="translate-y-4 opacity-0" leave-to-class="translate-y-4 opacity-0">
      <div class="mx-auto w-fit space-y-3" v-if="open">
        <a class="block rounded-full bg-[#40c351] px-2 py-2 hover:bg-green-500 focus:outline-none" :href="`https://wa.me/${settings?.general_settings.phone}`" title="واتساب">
          <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#fff" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
            <path
              fill="#16a34a"
              fill-rule="evenodd"
              d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </transition>
    <button class="rounded-full bg-gray-900 px-4 py-4 text-white hover:bg-gray-800 focus:outline-none" type="button" @click="open = !open" aria-label="مركز الخدمة">
      <!-- Heroicon name: outline/question-mark-circle -->
      <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" v-if="!open" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"></path>
      </svg>

      <!-- Heroicon name: outline/x-mark -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" v-else viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
  <footer class="mx-auto w-full max-w-7xl divide-y-2 divide-gray-50 px-4 xs:px-6 lg:px-8">
    <div class="grid grid-cols-2 gap-y-14 pb-14 sm:grid-cols-3 md:grid-cols-4 lg:pb-16 xl:gap-x-10">
      <div v-if="false" class="col-span-full border-b border-gray-100 pb-14 md:border-b-0 md:pb-0 xl:col-span-2">
        <div>
          <h3 class="font-semibold xs:text-lg">اشترك في نشرتنا الإخبارية</h3>
          <p class="pt-4 text-sm text-gray-800 xs:text-base">
            يتم إرسال أحدث الأخبار والمقالات والموارد إلى بريدك الوارد أسبوعيًا.
          </p>
        </div>
        <form class="pt-4 sm:flex sm:max-w-md" method="POST">
          <label class="sr-only" for="email">البريد الإلكتروني</label>
          <div class="w-full space-y-3">
            <input class="form-control h-[50px] appearance-none" type="email" name="email" id="email" placeholder="اكتب عنوان بريدك الالكتروني" autocomplete="email" required />
          </div>
          <div class="pt-4 sm:ms-3 sm:pt-0">
            <button class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800" type="submit">
              <span class="mt-1.5">إشتراك</span>
            </button>
          </div>
        </form>
      </div>
      <div class="xl:ms-4">
        <h3 class="text-sm font-semibold xs:text-base">معلومات عنا</h3>
        <ul class="space-y-5 pt-5" role="list">
          <li>
            <NuxtLink class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :to="{ name: 'about' }">من نحن</NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold xs:text-base">تواصل معنا</h3>
        <ul class="space-y-5 pt-5" role="list">
          <li>
            <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="settings.social_settings?.twitter" target="_blank">تويتر</a>
          </li>
          <li>
            <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="settings.social_settings?.facebook" target="_blank">فيسبوك</a>
          </li>
          <li>
            <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="settings.social_settings?.instagram" target="_blank">إنستغرام</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold xs:text-base">إتصل بنا</h3>
        <ul class="space-y-5 pt-5" role="list">
          <li>
            <a href="#" class="text-sm text-gray-800 hover:text-gray-900 xs:text-base">
              {{ settings.general_settings?.address }}
            </a>
          </li>
          <li dir="ltr">
            <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="'tel:' + settings.general_settings?.phone">
              {{ settings.general_settings?.phone }}
            </a>
          </li>
          <li>
            <a class="text-sm text-gray-800 hover:text-gray-900 xs:text-base" :href="'mailto:' + settings.general_settings?.email">
              {{ settings.general_settings?.email }}
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold xs:text-base">تنزيل التطبيق</h3>
        <ul class="space-y-5 pt-5" role="list">
          <li class="w-full sm:w-auto">
            <a class="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800" href="https://apps.apple.com/sa/app/%D8%B9%D8%A8%D8%B1-%D9%84%D8%AA%D9%81%D8%B3%D9%8A%D8%B1-%D8%A7%D9%84%D8%A3%D8%AD%D9%84%D8%A7%D9%85/id6461119454" target="_blank">
              <span class="mt-1.5 whitespace-nowrap text-lg font-semibold">App Store</span>
              <svg class="ms-3 flex-shrink-0" viewBox="0 0 384 512" width="20">
                <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg
            ></a>
          </li>
          <li class="w-full sm:w-auto">
            <a class="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800" href="https://play.google.com/store/apps/details?id=co.abber_dev.abber_app" target="_blank">
              <span class="mt-1.5 whitespace-nowrap text-lg font-semibold">Google Play</span>
              <svg class="ms-3 flex-shrink-0" viewBox="30 336.7 120.9 129.2" width="20">
                <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"></path>
                <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"></path>
                <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"></path>
                <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"></path></svg
            ></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="py-8 md:flex md:items-center md:justify-between">
      <p class="text-center text-sm text-gray-800 xs:text-base">جميع الحقوق محفوظة &copy; عبر {{ new Date().getFullYear() }}.</p>
      <div class="flex justify-center items-center space-x-6 pt-2 rtl:space-x-reverse md:pt-0">
        <a href="#" target="_blank" class="">
          <NuxtImg src="/images/payments/applepay.svg" height="21" width="36" alt="شعار وسيلة الدفع" loading="lazy" class="max-w-none" />
        </a>
        <a href="#" target="_blank">
          <NuxtImg src="/images/payments/mastercard.webp" height="21" width="36" alt="شعار وسيلة الدفع" loading="lazy" class="max-w-none" />
        </a>
        <a href="#" target="_blank">
          <NuxtImg src="/images/payments/visa.svg" height="18" width="45" alt="شعار وسيلة الدفع" loading="lazy" class="max-w-none" />
        </a>
        <a href="#" target="_blank">
          <NuxtImg src="/images/payments/mada.png" height="16" width="48" alt="شعار وسيلة الدفع" loading="lazy" class="max-w-none" />
        </a>
        <a href="#" target="_blank">
          <NuxtImg src="/images/payments/stc_pay.webp" height="15" width="52" alt="شعار وسيلة الدفع" loading="lazy" class="max-w-none" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["verified"],
  auth: false,
  layout: "",
});
const { data } = useAuth();
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
  const { data } = await useFetch("/api/settings");

  if (!data.value) return;
  settings.value = data.value;
}
const open = ref(false);

onMounted(async () => {
  await fetchSettings();
  await fetchSettings();
});
</script>

<style scoped></style>
