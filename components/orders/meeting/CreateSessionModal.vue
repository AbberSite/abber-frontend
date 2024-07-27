<template>
    <TransitionRoot as="template">
        <div class="fixed inset-0 z-50">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
            </TransitionChild>

            <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enter-from="translate-x-full "
                enter-to="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
                as="template">
                <div class="fixed inset-0 z-40 bg-white sm:w-[340px]">
                    <div class="flex h-full flex-col">
                        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-8">
                            <h2 class="text-lg font-semibold xs:text-xl">فتح جلسة صوتية</h2>
                            <button
                                class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
                                type="button"
                                @click="$emit('close')">
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
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <template v-if="!data.email_verified">
                            <MeetingVerifyEmail />
                        </template>
                        <template v-else>
                            <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
                                <fieldset class="space-y-7">

                                    <MeetingCreateZoomAccount v-if="!zoomAccount?.active" />
                                    
                                    <template v-if="zoomAccount && zoomAccount?.active">
                                        <div class="flex items-center mb-9">
                                            <input
                                                class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
                                                type="checkbox"
                                                v-model="currentSession.active_session"
                                                name="checkbox"
                                                id="video-available" />
                                            <label
                                                class="mt-1.5 ps-3 text-sm font-semibold xs:text-base"
                                                for="video-available"
                                                >متاح الان</label
                                            >
                                        </div>
                                        <div class="w-full space-y-3" v-if="currentSession.active_session">
                                            <label class="block text-sm font-semibold xs:text-base" for="orders-count"
                                                >عدد الطلبات</label
                                            >
                                            <input
                                                v-model.number="currentSession.capacity"
                                                class="form-control h-[50px] appearance-none"
                                                type="number"
                                                name="number"
                                                id="orders-count"
                                                placeholder="إدخل عدد الطلبات"
                                                dir="rtl"
                                                value=""
                                                required />
                                            <div class="text-[13px] leading-loose text-gray-500">
                                                إدخل عدد الطلبات المتاحة لهذه الجلسة
                                            </div>
                                        </div>
                                    </template>
                                </fieldset>
                            </div>
                            <template v-if="zoomAccount && zoomAccount?.active">
                                <div
                                    class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]">
                                    <PrimaryButton @click="submit" :loading="loading" class="w-full" type="submit">
                                        <span v-if="canJoin">فتح جلسة</span>
                                        <span v-else>حفظ</span>
                                    </PrimaryButton>
                                </div>
                            </template>
                        </template>
                    </div>
                </div>
            </TransitionChild>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['close', 'sessionCreated']);

const { openSession } = useMeetingStore();
const { meeting } = storeToRefs(useMeetingStore());
const { data } = useAuth();
const { getZoomAccounts } = useAccountStore();

const currentSession = ref<{
    capacity: number;
    id?: string;
    active_session?: boolean;
}>({
    capacity: 0,
    active_session: false
});

const canJoin = computed(() => currentSession.value.active_session && currentSession.value.capacity != 0);
const zoomAccount = await getZoomAccounts();

await fetchSessions();

const loading = ref(false);
const router = useRouter();

async function submit() {
    loading.value = true;

    try {
        await createSession();

        if (!canJoin.value) {
            loading.value = false;
            emit('close');

            useNotification({ type: 'success', content: 'تم تحديث بيانات الجلسة' });

            return;
        }

        await router.push('/orders/video/session');

        useNotification({ type: 'success', content: 'تم انشاء جلسة جديدة بنجاح' });

        // await openSession();

        // emit('sessionCreated');
    } catch (error) {
        useNotification({ type: 'danger', content: 'خدث خطأ عند اضافة جلسة .' });
    } finally {
        loading.value = false;
    }
}

async function fetchSessions() {
    const response = await useDirectApi(`/meetings/video-session/`);
    currentSession.value = response ?? { capacity: 0 };
}

async function createSession() {
    const url = `/meetings/video-session/`;
    const response = await useDirectApi(url, {
        method: 'PATCH',
        body: currentSession.value
    });
}
</script>

<style scoped></style>
