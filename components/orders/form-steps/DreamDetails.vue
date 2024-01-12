<template>
    <Head>
        <title>عبر - طلب تعبير حلم - إدخال تفاصيل الحلم</title>
    </Head>
    <div>
        <FormStepsTextContact  v-if="state.data?.inputType === 'text_chat'" />
        <FormStepsVoiceContact v-else />
    </div>
</template>

<script setup lang="ts">
import type { OrderForm } from '~/types';


const { state } = useFormWizard<OrderForm>("order")
</script>

<style scoped></style>
