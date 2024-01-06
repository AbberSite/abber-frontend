<template>
    <Head>
        <title>عبر - طلب تعبير حلم - إدخال تفاصيل الحلم</title>
    </Head>
    <div>
        <FormStepsTextContact @next="next" v-if="type === 'text_chat'" />
        <FormStepsVoiceContact @next="next" v-else />
    </div>
</template>

<script setup lang="ts">
defineProps(['type']);

const emits = defineEmits(['next']);

function next(data: any) {
    emits('next', data);
}
</script>

<style scoped></style>
