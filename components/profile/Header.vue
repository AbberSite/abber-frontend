<template>
    <h1 class="sr-only" id="profile-heading">الملف الشخصي</h1>
    <div class="flex items-center justify-between">
        <div class="relative flex-shrink-0" >
            <NuxtImg
                loading="lazy"
                class="lazyload h-24 w-24 rounded-full bg-gray-100 object-cover"
                :src="data?.image_url"
                height="96"
                v-if="!tempAccount.image"
                width="96"
                alt="صورة المستخدم" />

            <NuxtImg
                loading="lazy"
                class="lazyload h-24 w-24 rounded-full bg-gray-100 object-cover"
                v-if="tempAccount.image"
                :src="tempAccountImagePreview"
                height="96"
                width="96"
                alt="صورة المستخدم" />

            <label
                v-if="edit"
                class="absolute bottom-[5px] start-[8px] cursor-pointer rounded-full border-4 border-[#f5f5f5] bg-[#f5f5f5] shadow-sm"
                for="id_image">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path>
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path>
                </svg>
                <input @input="tempAccount.image = ($event as any).target.files[0]" id="id_image" type="file" hidden />
            </label>
        </div>
        <div class="hidden items-center space-x-3 rtl:space-x-reverse sm:flex">
            <template v-if="edit">
                <div class="hidden items-center space-x-3 rtl:space-x-reverse sm:flex">
                    <PrimaryButton @click.prevent="submitUpdate" :loading="loading">حفظ</PrimaryButton>
                    <a
                        @click.prevent="edit = false"
                        class="flex h-[50px] items-center rounded-md border bg-white px-6 py-3 text-xs font-semibold shadow-sm hover:bg-gray-50"
                        href="/profile/">
                        <span class="mt-1.5">إلغاء</span></a
                    >
                </div>
            </template>
            <template v-else>
                <a
                    @click.prevent="edit = true"
                    class="flex items-center justify-center cursor-pointer space-x-1 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse">
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
                            <NuxtLink
                                class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                                :to="{ name: 'profile-change-password' }"
                                role="menuitem"
                                tabindex="-1"
                                >تغيير كلمة المرور
                            </NuxtLink>
                            <a
                                class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                                href="#"
                                @click.prevent="logout"
                                role="menuitem"
                                tabindex="-1"
                                >تسجيل الخروج</a
                            >
                            <NuxtLink
                                class="block px-4 pb-1.5 pt-3 text-sm font-medium text-red-600 hover:bg-gray-50"
                                :to="{ name: 'profile-delete' }"
                                role="menuitem"
                                tabindex="-1"
                                >حذف الحساب
                            </NuxtLink>
                        </div>
                    </transition>
                </div>
            </template>
        </div>
    </div>

    <div v-if="edit" class="flex items-center space-x-1 pt-8 font-semibold rtl:space-x-reverse">
        <span class="text-lg">تعديل البيانات</span>
    </div>
    
    <div v-else class="flex items-center space-x-1 pt-8 font-semibold rtl:space-x-reverse">
        <span class="text-lg">{{ data?.first_name }}</span>
        <small class="mt-1.5 hidden sm:flex">({{ data?.user_type }})</small>
    </div>

    <small class="block pt-2 font-semibold sm:hidden" v-if="!edit">({{ data?.user_type }})</small>

    <InputError v-for="message in errors.image" :message="message" />

    <div
        v-if="edit"
        class="fixed bottom-0 z-20 flex w-full items-center space-x-3 border-t border-gray-100 bg-white px-4 xs:px-6 py-6 rtl:space-x-reverse sm:hidden">
        <PrimaryButton class="w-full" @click.prevent="submitUpdate" :loading="loading">حفظ التعديلات</PrimaryButton>
        <a
            class="flex h-[50px] w-[25%] items-center justify-center rounded-md border bg-white px-4 py-3 text-xs font-semibold shadow-sm hover:bg-gray-50"
            @click.prevent="edit = false"
            href="#"
            ><span class="mt-1.5">إلغاء</span></a
        >
    </div>
    <div
        v-else
        class="fixed bottom-0 z-20 flex w-full items-center space-x-3 border-t border-gray-100 bg-white px-4 xs:px-6 py-6 rtl:space-x-reverse sm:hidden">
        <a
            class="flex h-[50px] w-full items-center justify-center space-x-2 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse"
            href="#"
            @click.prevent="edit = true">
            <svg
                class="flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
            </svg>
            <span class="mt-1.5">تعديل الحساب</span>
        </a>
        <button
            class="flex h-[50px] w-[25%] items-center justify-center rounded-md border bg-white px-4 py-3 shadow-sm hover:bg-gray-50"
            type="button"
            @click="openModal = true"
            aria-expanded="false"
            aria-haspopup="true">
            <span class="sr-only">فتح قائمة المستخدم</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
    </div>

    <ProfileMobileModal :show="openModal" @close="openModal = false" @deleteAccount="isOpen = true" />
</template>

<script setup lang="ts">
const { data, signOut } = useAuth();

import { vOnClickOutside } from '@vueuse/components';

const isOpen = ref(false);
const emits = defineEmits(['update:modelValue']);

const openProfileDropdown = ref(false);
const edit = ref(false);
const openModal = ref(false);
const loading = ref(false);
const route = useRoute();

const { update } = useAccountStore();
const { tempAccount, tempAccountImagePreview, errors } = storeToRefs(useAccountStore());

onMounted(() => {
    edit.value = route.query.edit === 'true' ? true : false;
});

async function submitUpdate() {
    loading.value = true;

    const result = await update(data?.value.id);

    loading.value = false;

    if (!result) return;

    edit.value = false;
    useNotification({ type: 'success', content: 'تم تحديث الحساب بنجاح' });
}

async function logout() {
    await signOut({ callbackUrl: '/accounts/login', redirect: true });
    useNotification({ type: 'success', content: 'تم تسجيل الخروج بنجاح' });
}

watch(edit, (value) => emits('update:modelValue', value));

definePageMeta({
    middleware: 'auth'
});
</script>

<style scoped></style>
