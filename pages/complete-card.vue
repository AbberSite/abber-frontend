<template>

    <Head>
        <title>عبر - إضافة بطاقة</title>
    </Head>
    <Header />
    <main class="min-h-screen outline-none">
        <HeroBackground />
        <section
            class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="contact-types-heading">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <CheckCircleIcon class="w-6 h-6" />
            </div>
            <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">
                تم حفظ البطاقة بنجاح!
            </h1>
        </section>
    </main>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline';
const route = useRoute();
const id = route.query.id;
let transaction_id: string;

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
onMounted(async () => {
    transaction_id = localStorage.getItem('abber:current-transaction-id') as string;
    if (transaction_id && id) {
        const paid = await isPaid();
        console.log(paid);
        if (paid){

          await useApi(`/api/wallet/cards/`, {
            method: 'POST',
            body: {
              brand: 'CARD'
            }
          });
        }
        localStorage.removeItem('abber:current-transaction-id');
    } else {
        navigateTo({name: 'wallet'})
    }
})
</script>