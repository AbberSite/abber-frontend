<template>
  <Head>
    <title>عبر - المحفظة - طلبات السحب</title>
  </Head>
  <div class="min-h-screen outline-none">
    <HeroBackground />
    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="withdrawal-heading">
      <div class="rounded-md border border-gray-300 py-3 px-3 shadow-sm">
        <BanknotesIcon class="w-[24px] h-[24px]" />
      </div>
      <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="wallet-heading">طلبات السحب</h1>
      <div class="pt-4 text-sm text-gray-800 xs:text-base">تصفح جمبع طلبات السحب الخاص بك</div>
      <div class="w-full pt-16">
        <SkeletonsTable v-if="loading" />
        <WalletRequestsTable v-else :requests="requests ?? []" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { BanknotesIcon } from "@heroicons/vue/24/outline";
import type { withdrawalRequest } from "~/types";
let loading = ref<boolean>(true);
let requests = ref<withdrawalRequest[] | null>(null);
onMounted(async () => {
  const response = await useDirectApi("/wallets/balance-withdrawal/");
  requests.value = response.results;
  loading.value = false;
});
</script>
