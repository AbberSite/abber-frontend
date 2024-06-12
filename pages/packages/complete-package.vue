<template>

    <main class="min-h-screen outline-none">
        <HeroBackground />
        <section
            class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
            aria-labelledby="contact-types-heading">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <Loading v-if="loading"/>
                <CheckCircleIcon class="w-6 h-6" v-else-if="!loading && successfull" />
                <XCircleIcon class="w-6 h-6" v-else/>
            </div>
            <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" v-if="!loading">
               {{successfull ? ' تم الاشتراك بنجاح!': 'لقد فشلت عملية الاشتراك'}}
            </h1>
        </section>
    </main>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
const route = useRoute();
const id = route.query.id;
const balance = route.query.balance;
let transaction_id: string;
let loading = ref(true);
let successfull = ref<number>(2);
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
        const checkout = await isPaid();
        console.log(checkout);
        if (checkout.paid){
        const data = await useFormWizard<any>("packages", [], true);
        console.log(data.packageId)

          await useApi(`/api/packages/orders-packages/subscribe/`, {
            method: 'POST',
            body: {
                package_id:data.packageId,
              brand: checkout.paymentBrand.toLowerCase()
            }
          });
          loading.value = false;
          successfull.value = 1;
        } else {
            successfull.value = 0;
            loading.value = false;
        }
        localStorage.removeItem('abber:current-transaction-id');
    } else if(transaction_id && !id && balance) {
        successfull.value = 1;
        loading.value = false;        
        localStorage.removeItem('abber:current-transaction-id');
    } else {
        navigateTo('/profile?tab=subscriptions')
    }
})
</script>