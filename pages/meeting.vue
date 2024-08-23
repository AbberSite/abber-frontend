<template>
  <div>
<client-only>
  <webrtc :is-host="data.user_type == 'معبر'" room="190b3815"></webrtc> 
  </client-only>
  </div>
</template>

<script setup>
setPageLayout('none');
const { data } = useAuth();

</script>

<style>

</style>