<template>
    <div>
        تمت اضافة البطاقة بنجاح
    </div>
</template>

<script setup lang="ts">
await useApi(`/api/wallet/cards/`, {
        method: 'POST',
        body: {
            type: 'VISA',
            brand: 'visa'
        }
    });
</script>