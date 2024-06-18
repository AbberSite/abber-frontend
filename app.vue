<template>
  <NuxtLayout dir="rtl">
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup lang="ts">
const { getSession } = useAuth();
await getSession();
onMounted(async()=> {
  const { status } = useAuthState();
  console.log(status.value)
  // await getSession();
})
</script>