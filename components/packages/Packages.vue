<template>
     <div  class="grid w-full gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-3">
      <PackagesOrdersPackageCard v-for="(pkg, index) in packages" :package="pkg" :key="index" :primary="index === 1" :subscribed="membership.results.length > 0" @buy="handleBuy"></PackagesOrdersPackageCard>
    </div>
</template>

<script lang="ts" setup>
const packages = ref<OrdersPackage[]>([]);
const { emitNext, bus, state, next } = useFormWizard<any>("packages");


const data = (await useApi(`/api/packages/orders-packages/`, { method: "GET" })) as PaginationResponse<OrdersPackage>;
packages.value = data.results;

const membership = (await useApi(`/api/packages/orders-packages/membership/`, { method: "GET" })) as PaginationResponse<any>;

const handleBuy = (packageId: Number) => {
  state.value.data.packageId = packageId;
  next({nextStepId: 'payment'})  
};




</script>

<style>

</style>