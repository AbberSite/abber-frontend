<template>
</template>

<script lang="ts" setup>
const router = useRouter();
    const {  status } = useAuthState();

onMounted(() => {
  if ( status.value === "authenticated" && !(window.localStorage.getItem("setPIN") == "1")) {
    router.push({ name: "profile-pin" });
  }
});
</script>

<style></style>
