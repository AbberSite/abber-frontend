<template>
  <div class="grid w-full gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-3">
    <SkeletonsPackages v-if="loading" />
    <PackagesPackageCard v-else-if="!loading" v-for="(pkg, index) in packages" :package="pkg" :key="index" :primary="index === 1"
      :subscribed="membership.results.length > 0" @buy="handleBuy"></PackagesPackageCard>
  </div>
</template>

<script lang="ts" setup>
const packages = ref<OrdersPackage[]>([]);
const { emitNext, bus, state, next } = useFormWizard<any>("packages");
let loading = ref(true);

let data;

let membership;
onMounted(async () => {
  data = (await useApi(`/api/packages/orders-packages/`, { method: "GET" })) as PaginationResponse<OrdersPackage>;
  packages.value = data.results;
  membership = (await useApi(`/api/packages/orders-packages/membership/`, { method: "GET" })) as PaginationResponse<any>;
  loading.value = false;

});
const handleBuy = (packageId: Number) => {
  state.value.data.packageId = packageId;
  next({ nextStepId: 'payment' });
  setTimeout(() => {
    let paymentSection = document.getElementById('payment') as Element;
    paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1000)
};




</script>

<style></style>