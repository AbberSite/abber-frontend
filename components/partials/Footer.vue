<template>
    <footer class="mx-auto w-full max-w-7xl divide-y-2 divide-gray-50 px-4 xs:px-6 lg:px-8">
        <template v-if="loading">
            <FooterSkeleton />
        </template>
        <div v-else class="grid grid-cols-2 gap-y-14 pb-14 sm:grid-cols-3 md:grid-cols-4 lg:pb-16 xl:gap-x-10">
            <div v-if="false" class="col-span-full border-b border-gray-100 pb-14 md:border-b-0 md:pb-0 xl:col-span-2">
                <div>
                    <h3 class="font-medium xs:text-lg">اشترك في نشرتنا الإخبارية</h3>
                    <p class="pt-4 text-sm text-gray-600 xs:text-base">
                        يتم إرسال أحدث الأخبار والمقالات والموارد إلى بريدك الوارد أسبوعيًا.
                    </p>
                </div>
                <form class="pt-4 sm:flex sm:max-w-md" method="POST">
                    <label class="sr-only" for="email">البريد الإلكتروني</label>
                    <div class="w-full space-y-3">
                        <input class="form-control h-[50px] appearance-none" type="email" name="email" id="email"
                            placeholder="اكتب عنوان بريدك الالكتروني" autocomplete="email" required />
                    </div>
                    <div class="pt-4 sm:ms-3 sm:pt-0">
                        <button
                            class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800"
                            type="submit">
                            <span>إشتراك</span>
                        </button>
                    </div>
                </form>
            </div>
            <div class="xl:ms-4">
                <h3 class="text-sm font-medium xs:text-base">معلومات عنا</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li>
                        <NuxtLink class="text-sm text-gray-600 hover:text-gray-900 xs:text-base"
                            :to="{ name: 'about' }">من نحن</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-sm text-gray-600 hover:text-gray-900 xs:text-base"
                            :to="{ name: 'terms' }">الشروط والأحكام</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-sm text-gray-600 hover:text-gray-900 xs:text-base"
                            :to="{ name: 'user-agreement' }">إتفاقية المستخدم</NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-sm font-medium xs:text-base">تواصل معنا</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li>
                        <a class="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 hover:text-gray-900 xs:text-base" :href="settings?.social_settings?.twitter" target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.55016 21.75C16.6045 21.75 21.5583 14.2467 21.5583 7.74186C21.5583 7.53092 21.5536 7.3153 21.5442 7.10436C22.5079 6.40746 23.3395 5.54425 24 4.5553C23.1025 4.9546 22.1496 5.21538 21.1739 5.32874C22.2013 4.71291 22.9705 3.74547 23.3391 2.60577C22.3726 3.17856 21.3156 3.58261 20.2134 3.80061C19.4708 3.01156 18.489 2.48912 17.4197 2.31405C16.3504 2.13899 15.2532 2.32105 14.2977 2.8321C13.3423 3.34314 12.5818 4.15471 12.1338 5.14131C11.6859 6.12792 11.5754 7.23462 11.8195 8.2903C9.86249 8.19209 7.94794 7.6837 6.19998 6.7981C4.45203 5.91249 2.90969 4.66944 1.67297 3.14952C1.0444 4.23324 0.852057 5.51565 1.13503 6.73609C1.418 7.95654 2.15506 9.02345 3.19641 9.71999C2.41463 9.69517 1.64998 9.48468 0.965625 9.10592V9.16686C0.964925 10.3041 1.3581 11.4066 2.07831 12.2868C2.79852 13.167 3.80132 13.7706 4.91625 13.995C4.19206 14.1931 3.43198 14.222 2.69484 14.0794C3.00945 15.0574 3.62157 15.9129 4.44577 16.5263C5.26997 17.1398 6.26512 17.4806 7.29234 17.5012C5.54842 18.8711 3.39417 19.6141 1.17656 19.6106C0.783287 19.61 0.390399 19.5859 0 19.5384C2.25286 20.9837 4.87353 21.7514 7.55016 21.75Z" fill="currentColor"></path>
                            </svg>
                            <span>تويتر</span>
                        </a>
                    </li>
                    <li>
                        <a class="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 hover:text-gray-900 xs:text-base" :href="settings?.social_settings?.facebook" target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="currentColor"></path>
                            </svg>
                            <span>فيسبوك</span>
                        </a>
                    </li>
                    <li>
                        <a class="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 hover:text-gray-900 xs:text-base" :href="settings?.social_settings?.instagram" target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8688 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8063 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8063 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z" fill="currentColor"></path>
                                <path d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z" fill="currentColor"></path>
                                <path d="M19.8469 5.59214C19.8469 6.38902 19.2 7.0312 18.4078 7.0312C17.6109 7.0312 16.9688 6.38433 16.9688 5.59214C16.9688 4.79526 17.6156 4.15308 18.4078 4.15308C19.2 4.15308 19.8469 4.79995 19.8469 5.59214Z" fill="currentColor"></path>
                            </svg>
                            <span>إنستغرام</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-sm font-medium xs:text-base">إتصل بنا</h3>
                <ul v-if="settings && settings.general_settings" class="space-y-5 pt-5" role="list">
                    <li>
                        <a href="#" class="text-sm text-gray-600 hover:text-gray-900 xs:text-base">
                            {{ settings.general_settings.address }}
                        </a>
                    </li>
                    <li dir="ltr">
                        <a class="text-sm text-gray-600 hover:text-gray-900 xs:text-base"
                            :href="'tel:' + settings.general_settings.phone">
                            {{ settings.general_settings.phone }}
                        </a>
                    </li>
                    <li >
                        <a class="text-sm text-gray-600 hover:text-gray-900 xs:text-base"
                            :href="'mailto:' + settings.general_settings.email">
                            {{ settings.general_settings.email }}
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-sm font-medium xs:text-base">تنزيل التطبيق</h3>
                <ul class="space-y-5 pt-5" role="list">
                    <li class="w-full sm:w-auto">
                        <a class="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
                            href="https://apps.apple.com/sa/app/%D8%B9%D8%A8%D8%B1-%D9%84%D8%AA%D9%81%D8%B3%D9%8A%D8%B1-%D8%A7%D9%84%D8%A3%D8%AD%D9%84%D8%A7%D9%85/id6461119454"
                            target="_blank">
                            <span class="whitespace-nowrap text-lg font-medium">App Store</span>
                            <svg class="ms-3 flex-shrink-0" viewBox="0 0 384 512" width="20">
                                <path fill="currentColor"
                                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                                </path>
                            </svg></a>
                    </li>
                    <li class="w-full sm:w-auto">
                        <a class="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
                            href="https://play.google.com/store/apps/details?id=co.abber_dev.abber_app" target="_blank">
                            <span class="whitespace-nowrap text-lg font-medium">Google Play</span>
                            <svg class="ms-3 flex-shrink-0" viewBox="30 336.7 120.9 129.2" width="20">
                                <path fill="#FFD400"
                                    d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z">
                                </path>
                                <path fill="#FF3333"
                                    d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z">
                                </path>
                                <path fill="#48FF48"
                                    d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z">
                                </path>
                                <path fill="#3BCCFF"
                                    d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z">
                                </path>
                            </svg></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="py-8 md:flex md:items-center md:justify-between">
            <p class="text-center text-sm text-gray-600 xs:text-base">جميع الحقوق محفوظة &copy; عبر {{ new
                Date().getFullYear() }}.</p>
            <div class="flex justify-center items-center space-x-6 pt-2 rtl:space-x-reverse md:pt-0">
                <a href="#" target="_blank" class="">
                    <img class="lazyload max-w-none"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        data-src="/images/payments/applepay.svg" height="21" width="46" alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <img class="lazyload max-w-none"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        data-src="/images/payments/mastercard.webp" height="21" width="36" alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <img class="lazyload max-w-none"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        data-src="/images/payments/visa.svg" height="18" width="45" alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <img class="lazyload max-w-none"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        data-src="/images/payments/mada.png" height="16" width="48" alt="شعار وسيلة الدفع" />
                </a>
                <a href="#" target="_blank">
                    <img class="lazyload max-w-none"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        data-src="/images/payments/stc_pay.webp" height="15" width="52" alt="شعار وسيلة الدفع" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useSettingsStore } from '~/stores/settings';
const {getSettings} = useSettingsStore();
const {settings} = storeToRefs(useSettingsStore());
const loading = ref(true);

onBeforeMount(async () => {
    await getSettings();
    loading.value = false;
});
</script>

<style scoped></style>
