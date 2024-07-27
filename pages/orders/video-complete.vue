<template>
    <Head>
        <title>عبر - طلب تعبير حلم</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <HeroBackground/>
        <section
            class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="contact-types-heading">
            <template v-if="loading || paid">
                <div class="w-full flex justify-center items-center h-full"><Loading /></div>
            </template>

            <template v-else>
                <!-- <template v-if="paid">
                    <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                        <CheckCircleIcon class="w-6 h-6" />
                    </div>
                    <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="contact-types-heading">
                        تم إرسال الطلب بنجاح
                    </h1>
                    <div class="pt-4 text-center text-sm text-gray-600 xs:text-base">
                        <p>تم إرسال طلب تعبير الحلم الخاصة بك بنجاح.</p>
                        <div>سيتواصل معك المعبر قريبا.</div>
                    </div>

                    <div class="mx-auto w-full max-w-sm">
                        <div>
                            <div class="mx-auto w-full max-w-sm pt-10">
                                <NuxtLink
                                    class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                                    :to="{ name: 'orders' }">
                                    <span>تصفح الطلبات</span>
                                </NuxtLink>
                                <div class="pt-4">
                                    <NuxtLink
                                        class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50"
                                        :to="{ name: 'index' }">
                                        <span class="ms-3 mt-1.5">الصفحة الرئيسية</span>
                                    </NuxtLink>
                                </div>
                                <div class="pt-4">
                                    <NuxtLink
                                        class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50"
                                        :to="{ name: 'blog' }">
                                        <span class="ms-3 mt-1.5">المدونة</span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </template> -->

                <template v-if="!paid && !isActive && !balance">
                    <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                        <XCircleIcon class="w-6 h-6" />
                    </div>
                    <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="contact-types-heading">
                        عذرا لم يتم إرسال الطلب
                    </h1>
                    <div class="pt-4 text-center text-sm text-gray-600 xs:text-base">
                        <p>لم يتم إرسال طلب تعبير الحلم الخاص بك يمكنك التواصل معنا</p>
                        <div>
                            {{ error }}
                        </div>
                    </div>

                    <div class="mx-auto w-full max-w-sm">
                        <div>
                            <div class="mx-auto w-full max-w-sm pt-10">
                                <div class="pt-4">
                                    <NuxtLink
                                        class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                                        :to="{ name: 'support' }">
                                        <span class="ms-3 mt-1.5"> مركز الدعم</span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-else-if="!paid && isActive">
                    <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                        <Loading class="w-6 h-6" />
                    </div>
                    <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="contact-types-heading">
                        جاري تأكيد الطلب
                    </h1>
                    <div class="pt-4 text-center text-sm text-gray-600 xs:text-base">
                        <p>سيتم تأكيد طلبك بعد لحظات</p>
                    </div>

                    <!-- <div class="mx-auto w-full max-w-sm">
                        <div>
                            <div class="mx-auto w-full max-w-sm pt-10">
                                <div class="pt-4">
                                    <NuxtLink
                                        class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                                        :to="{ name: 'index' }">
                                        <span class="ms-3 mt-1.5"> مركز الدعم</span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </template>
            </template>
        </section>
    </main>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import { useTimeoutPoll } from '@vueuse/core';
import type { OrderForm } from '~/types';

const route = useRoute();
const router = useRouter();
const { getSession } = useAuth();
const id = route.query.id;
let transaction_id: string;

let data;
const balance = route.query.balance;

const paid = ref(true);
const loading = ref(true);
const error = ref('');

const { isActive, pause, resume } = useTimeoutPoll(getStatus, 2000);

onMounted(async () => {
    transaction_id = localStorage.getItem('abber:current-transaction-id') as string;

    
    // await getSession();
    await getStatus();
    if(balance && transaction_id){
        localStorage.removeItem('abber:current-transaction-id');
        router.push(`/orders/video/${data.order_id}`)
    }
});

async function getStatus() {
    data = useFormWizard<OrderForm>('order', [], true) as OrderForm;

    const service_id = data.service_id;

    transaction_id = localStorage.getItem('abber:current-transaction-id') as string;

    if (!transaction_id) {
        router.push('/orders/make');
        return;
    }

    const { hasPaid, message } = await isPaid();

    if (!hasPaid) {
        loading.value = false;
        paid.value = false;

        if (message == 'transaction pending') {
            if (!isActive.value) {
                resume();
            }
            return;
        }
        if (isActive.value) pause();
        error.value = message;
        localStorage.removeItem('abber:current-transaction-id');

        return;
    }

    if (isActive) pause();

    // TODO : update this with real service id
    const result = await useApi(`/api/orders/${service_id}/buy`, {
        method: 'POST',
        body: {
            type: data.type,
            // TODO: unncomment the above line when finishing from testing
          brand: 'VISA'
            // brand: cardType.valuee
        }
    });

    if (!result.paid) {
        paid.value = false;
        loading.value = false;

        error.value = message;
        localStorage.removeItem('abber:current-transaction-id');

        return;
    }

    // await updateOrderInfo(data);

    localStorage.removeItem('abber:current-transaction-id');

    (data as any).clear();

    router.push(`/orders/video/${result.order_id}`)

    loading.value = false;
}
async function isPaid(): Promise<{ hasPaid: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
        const response = await useApi(`/api/payments/${transaction_id}`, {
            method: 'POST',
            body: {
                id
            }
        });

        if (!response.paid) {
            resolve({ hasPaid: false, message: response.messages?.[1] ?? response.messages?.[0] });
        }

        resolve({ hasPaid: true, message: '' });
    });
}

// async function updateOrderInfo(data: OrderForm) {
//     try {
//         const response = await useApi(`/api/orders/update/${data.order_id}`, {
//             method: 'POST',
//             body: data
//         });
//     } catch (error) {
//         alert('something went wrong');
//     }
// }

definePageMeta({
    layout: false
});
</script>

<style scoped></style>
