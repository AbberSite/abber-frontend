<template>
    <Head>
        <title>عبر - الطلبات - الطلب #{{ order?.id }}</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <HeroBackground />

        <section
            class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="order-details-heading">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm sm:hidden">
                <!-- Heroicon name: outline/swatch -->
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
                        d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"></path>
                </svg>
            </div>

            <DetailsHeader :show-navigation="activeTab == 'details'" />
            <DetailsTabs v-model="activeTab" />
            <DetailsMobileCard v-if="activeTab == 'details'" />
            <div class="flex justify-center items-center relative" v-else-if="activeTab == 'chat' && isMobile">
                <ClientOnly v-if="canJoin">
                    <Meeting />
                </ClientOnly>
            </div>

            <div class="hidden w-full gap-x-8 pt-16 lg:grid lg:grid-cols-3">
                <div class="sticky top-8 h-fit rounded-lg border border-gray-100 py-6">
                    <div class="px-6 font-semibold xs:text-lg">تفاصيل الطلب</div>
                    <DetailsCard />
                </div>
                <div
                    class="flex flex-col items-center justify-center rounded-lg border border-gray-100 px-6 py-6 lg:col-span-2"
                    v-if="order?.status == 'complete' || order?.status == 'awaiting_delivery'">
                    <h2 class="text-xl font-semibold">هذا الطلب مكتمل</h2>
                    
                    <CheckCircleIcon class="h-8 w-8" />
                </div>

                <div
                class="flex flex-col items-center justify-center rounded-lg border border-gray-100 px-6 py-6 lg:col-span-2"
                v-if="order?.status == 'cancelled' || order?.status == 'waiting_for_cancellation'">
                <h2 class="text-xl font-semibold">هذا الطلب ملغى</h2>
                
                <CheckCircleIcon class="h-8 w-8" />
            </div>
                <div class="flex flex-col items-center justify-center rounded-lg border border-gray-100 px-6 py-6 lg:col-span-2" v-else-if="!canJoin && (order?.status == 'in_progress' || order?.status == 'new')">
                    <h2 class="text-xl font-semibold">يرجى الإنتظار حتى يحين دورك</h2>
                    <div class="flex items-center justify-center space-x-3 pt-16 rtl:space-x-reverse">
                      <div class="flex flex-col items-center justify-center px-4 py-2">
                        <p class="text-2xl font-bold">{{ meeting.sessions_count }}</p>
                        <p class="text-sm font-semibold text-gray-500 xs:text-base">أشخاص</p>
                      </div>
                    </div>
                </div>
                <ClientOnly  v-if="!isMobile && canJoin && (order?.status == 'in_progress' || order?.status == 'new')">
                    <div class="flex flex-col items-center justify-center rounded-lg border border-gray-100  lg:col-span-2 relative">
                        <Meeting />
                    </div>
                </ClientOnly>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { useWebSocket } from '@vueuse/core';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

definePageMeta({
    middleware: 'auth',
    layout: false
});

const isMobile = useMediaQuery('(max-width: 1023px)');
const id = useRoute().params.id;

const activeTab = ref<'details' | 'chat'>('details');

const { getSession } = useAuth();

const { order } = storeToRefs(useOrdersStore());

const { getOrder, subscribeToOrderStatus } = useOrdersStore();

const { getMeetingStatus, bus } = useMeetingStore();

const { meeting } = storeToRefs(useMeetingStore());

const canJoin = computed(() => meeting.value.sessions_count == 0);

const done = ref(false);

async function initChannel() {
    const { rawToken } = useAuthState();

    const { data } = useWebSocket(
        import.meta.env.VITE_WS_URL +
            `/ws/meeting/${order.value?.seller?.username}/` +
            `?authorization=JWT ${rawToken.value}`,
        {
            autoReconnect: true
        }
    );

    watch(data, async (value) => {
        await getMeetingStatus(order.value?.id as string);
    });
}

await getSession();

await getOrder(id as string);

const orderStatus = await subscribeToOrderStatus(order.value?.id as string);

if (order.value?.status == 'new' || order.value?.status == 'in_progress') {
    await getMeetingStatus(order.value?.id as string);
}

watch(orderStatus.data, async (value) => {
    if (!value) return;

    const data = JSON.parse(value) as { status: Order['status'] };

    if (order.value) {
        order.value.status = data.status;
    }

    if (data.status != 'awaiting_delivery' && data.status !='complete' ) return;


    if (data.status == 'awaiting_delivery') {
        useNotification({
            content: 'تم تسليم الطلب',
            type: 'info'
        });
    }

    bus.emit('leave');
});

onMounted(async () => {
    await getSession();

    if (!order.value) {
        await getOrder(id as string);
    }

    if (order.value?.status == 'new' || order.value?.status == 'in_progress') {
        await initChannel();
    }
    // await getMeetingStatus(order.value?.id as string);
    // await getMeetingSignature(0);
});

onUnmounted(() => {
    order.value = undefined;
});
</script>

<style scoped></style>
