<template>
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
        <!-- Forget password form section -->
        <section
            class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-14 xs:px-6"
            aria-labelledby="delete-profile-heading">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/trash -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    height="24"
                    width="24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                </svg>
            </div>
            <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="delete-profile-heading">حذف حسابي</h1>
            <div class="pt-4 text-center text-sm text-gray-800 xs:text-base">
                <p>سيتم حذف حسابك ولن تتمكن من الوصول إلى المعلومات المتعلقة به.</p>
            </div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <a
                    class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-sm font-semibold text-white hover:bg-red-500"
                    @click.prevent="deleteAccount"
                    href="/"
                >
                    <Loading v-if="loading" />

                    <span v-else class="mt-1.5">تأكيد الحذف</span></a
                >
                <div class="pt-4">
                    <NuxtLink
                        class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50"
                        :to="{ name: 'profile' }">
                        <span class="ms-3 mt-1.5">إلغاء</span>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

defineProps<{
    isOpen: boolean;
}>();

const emits = defineEmits(['close']);
const { data, getSession } = useAuth();
const { clearToken } = useAuthState();

const loading = ref(false);

const router = useRouter();
function closeModal() {
    emits('close');
}

async function deleteAccount() {
    if (loading.value) return;

    loading.value = true;

    await useApi(`/api/accounts/delete`, {
        method: 'POST',
        body: {
            username: data.value.username
        }
    });

    // clearToken();

    await getSession();

    loading.value = false;

    emits('close');

    router.push('/accounts/login');
    useNotification({ type: 'success', content: 'تم حذف الحساب بنجاح' });
}
</script>
