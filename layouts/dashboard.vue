<template>
  <DashboardHeader />
  <DashboardHeaderHeroBackground />
  <main class="min-h-screen outline-none relative">
    <section class="mx-auto max-w-7xl px-4 pb-36 xs:px-6 lg:px-8 xl:pb-44">
      <slot />
    </section>
  </main>
  <slot name="mobileSection" />
</template>

<script setup lang="ts"></script>
