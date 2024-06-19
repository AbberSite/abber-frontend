<template>

  <div class="grid w-full gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-3">
    <SkeletonsPackages v-if="loading" />
    <PackagesPackageCard v-else-if="!loading" v-for="(pkg, index) in packages" :package="pkg" :key="index"
      :primary="index === 1" :subscribed="membership?.results?.length > 0" @buy="handleBuy"
      :pkgid="membership?.count ? membership.results[0]?.package.id : undefined"></PackagesPackageCard>
    <DevOnly v-if="!loading">
      <PrimaryButton class="bg-red-700" v-if="membership?.results?.length > 0" @click="deleteSub()">حذف الاشتراك
      </PrimaryButton>
    </DevOnly>
  </div>
</template>

<script lang="ts" setup>
import type { packagesFormSteps } from '~/types';
const { status } = useAuth();
const packages = ref<OrdersPackage[]>([]);
const { emitNext, bus, state, next } = useFormWizard<packagesFormSteps>("packages");
const loading = ref(true);
const membership = ref<PaginationResponse<any> | null>(null);

onMounted(async () => {
  try {
    const data = await useApi(`/api/packages/orders-packages/`, { method: "GET" }) as PaginationResponse<OrdersPackage>;
    packages.value = data.results;
    const membershipData = await useApi(`/api/packages/orders-packages/membership/`, { method: "GET" }) as PaginationResponse<any>;
    membership.value = membershipData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    loading.value = false;
  }
});

const handleBuy = (packageId: Number) => {
  if (status.value == 'authenticated') {
    next({ nextStepId: 'payment', data: {packageId: packageId.toString()}});
    setTimeout(() => {
      let paymentSection = document.getElementById('payment') as Element;
      paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1000);
  } else {
    next({nextStepId:'authentication-method', data: {packageId: packageId.toString()}});
    window.scrollTo({behavior: 'smooth', top: 0});
  }
};


async function deleteSub() {
  const { data } = useProxy(`/packages/orders-membership/${membership.value?.results[0].id}/`, { method: 'DELETE' });
  useNotification({ type: 'success', content: 'تم حذف الاشتراك، اعد التحميل' });
}

</script>

<style></style>