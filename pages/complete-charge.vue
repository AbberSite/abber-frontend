<template>

    <Head>
        <title>عبر - شحن الرصيد</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <HeroBackground />
        <section
            class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="contact-types-heading">
            <section v-if="loading" class="flex justify-center">
                <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                    <Loading />
                </div>
            </section>
            <div v-else-if="paid?.paid && !loading" class="w-full flex flex-col justify-center items-center">
                <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                    <CheckCircleIcon class="w-6 h-6" />
                </div>
                <h1 class="pt-8 text-lg font-medium xs:text-xl 2xl:text-2xl">
                    لقد تمت إضافة {{ paid?.amount }} ر.س إلى رصيدك بنجاح!
                </h1>
            </div>
            <div v-else class="w-full flex flex-col justify-center items-center">
                <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                    <XCircleIcon class="w-6 h-6" />
                </div>
                <h1 class="pt-8 text-lg font-medium xs:text-xl 2xl:text-2xl">
                    لم تنجح عملية الشحن
                </h1>
            </div>
            
        </section>
    </main>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
const route = useRoute();
const id = route.query.id;
let transaction_id: string;
let loading = ref(true);
async function isPaid() {
    return new Promise(async (resolve, reject) => {
        const response = await useApi(`/api/payments/${transaction_id}`, {
            method: 'POST',
            body: {
                id
            }
        });

        resolve(response);
    });
}
async function verifyPayment(){
    return await useDirectApi(`/wallets/charge/`, {
            method: 'POST',
            body: {
                // type: 'VISA',
                amount: 120,
                // TODO: unncomment the above line when finishing from testing
                brand: "VISA"
                // brand: cardType.valuee
            }
        });
}
var paid = ref<{} | undefined>(undefined);
onMounted(async () => {
    transaction_id = localStorage.getItem('abber:current-transaction-id') as string;
    if (!transaction_id)
        navigateTo('/wallet')
    if (transaction_id && id) {
        paid.value = await isPaid();
        if(paid.value?.paid)
        await verifyPayment();
        loading.value = false;
        localStorage.removeItem('abber:current-transaction-id');
    } else {
        navigateTo({ name: 'wallet' })
    }
})
</script>
