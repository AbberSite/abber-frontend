<template>
    <FormStepsPayment deposit />
</template>
<script setup lang="ts">


// onMounted(async () => {
//     // await getSession()

//     error.value = '';
//     try {
//         Promise.all([getCountry(), loadHyper(), fetchBalance()]);
//         // await loadHyper();
//         // await fetchBalance();
//     } catch (error) {
//         console.log(error);
//     }
// });

const countryCode = ref('');

// async function loadHyper() {
//     const payment = await createCheckout();
//     console.log(payment);
//     if (!payment.id) {
//         error.value = 'حدث خطأ ما';
//         return;
//     }

//     await useScript(`${paymentWidgetURL}?checkoutId=${payment.id}/registration`);

//     // @ts-ignore
//     hyper = wpwl as any;
// }

</script>

<style>
.my_deposit {
    @apply max-w-[300px];
}
.my_deposit .wpwl-group-registration {
    overflow: hidden;
}
.my_deposit .wpwl-wrapper-registration-holder{
    display: none;
}
/*
.wpwl-group-cardNumber {
    @apply relative;
}

.wpwl-control-cardNumber,
.wpwl-control-mobilePhone {
    @apply form-control h-[50px] pl-12 w-full;
}

.wpwl-control-mobilePhone {
    @apply form-control h-[50px] block text-sm xs:text-base w-full;
    direction: rtl;
}

.wpwl-control-expiry {
    @apply form-control h-[50px] appearance-none w-full;
}

.wpwl-control-cvv {
    @apply form-control h-[50px] appearance-none;
}

.cvv-expiry-wrapper {
    @apply flex items-start justify-between gap-5 mb-2 w-full;
}

.wpwl-group {
    @apply w-full space-y-3;
}

.wpwl-wrapper {
    @apply w-full;
}

.wpwl-form {
    @apply space-y-7;
}

.wpwl-label-cvv,
.wpwl-label-expiry,
.wpwl-label-cardNumber,
.wpwl-label-mobilePhone {
    @apply block text-xs font-semibold xs:text-base w-full ml-5;
    direction: rtl;
}

.wpwl-group-cardHolder,
.wpwl-group-brand {
    @apply hidden;
}

.wpwl-button-pay {
    @apply hidden h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-button-error {
    @apply !cursor-not-allowed !bg-gray-100 !text-black !border-none;
}

.activeIframe {
    @apply border-gray-900 text-base outline-none ring-1 ring-gray-900 placeholder:opacity-0;
}
*/
</style>
