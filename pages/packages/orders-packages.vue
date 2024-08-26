<template>

  <Head>
    <Title>عبر - الباقات</Title>
  </Head>
  <section
    class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-16 xs:px-6 lg:px-8 xl:pb-44"
    aria-labelledby="prices-heading"
    x-data="{ alert: true, openFilterDropdown: false, firstLevelSelect: '', secondLevelSelect: '', thirdLevelSelect: '' }">
    <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
      <!-- Heroicon name: outline/rocket-launch -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        height="24" width="24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z">
        </path>
      </svg>
    </div>
    <h1 class="pt-6 text-lg font-medium xs:text-xl 2xl:text-2xl" id="prices-heading">الباقات</h1>
    <div class="pt-4 text-sm text-gray-600 xs:text-base">تواصل معنا في حالة احتجت الى المساعدة</div>


    <div class=" w-full">
      <transition enter-active-class="transition-all" leave-active-class="transition-all"
        enter-from-class="translate-x-5 opacity-0" leave-to-class="-translate-x-5 opacity-0" mode="out-in">
        <div :key="activeStepIndex">
          <component :is="activeStep" />
          <div class="pt-8 text-center text-sm xs:text-base" v-if="!first && !last">
            <button class="text-blue-600" @click="back();">
              <span aria-hidden="true">→</span> العودة للخطوة السابقة
            </button>
          </div>
        </div>

      </transition>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Packages from '~/components/packages/Packages.vue';
import AuthenticationMethod from '~/components/packages/AuthenticationMethod.vue';
import Authentication from '~/components/packages/Authentication.vue';
import ContinueLogin from '~/components/packages/ContinueLogin.vue';
import type { packagesFormSteps } from '~/types'; 
const LazyPackagesPayment = defineAsyncComponent(()=> import("~/components/packages/Payment.vue"))
const steps = [
  { id: 'packages', component: Packages },
  { id: 'authentication-method', component: AuthenticationMethod },
  { id: 'authentication', component: Authentication },
  { id: 'continueLogin', component: ContinueLogin },
  { id: 'payment', component: LazyPackagesPayment }
]
const { activeStep, activeStepIndex, emitNext, state, reset, previous, first, last } = useFormWizard<packagesFormSteps>("packages", steps);

definePageMeta({
  title: 'عبر - الباقات',
  auth: false
});

onUnmounted(async () => reset());
async function back(){
  previous();
  window.scrollTo({behavior: 'smooth', top: 0});
}
</script>

<style></style>
