<template>
    <section
        class="fixed bottom-4 right-1/2 z-20 flex w-full translate-x-1/2 flex-col space-y-4 px-4 xs:bottom-6 xs:px-6 sm:max-w-sm md:right-auto md:translate-x-0 md:px-0 ltr:md:right-6 rtl:md:left-6 lg:bottom-8 ltr:lg:right-8 rtl:lg:left-8"
        aria-labelledby="alerts-heading">
        <h2 class="sr-only" id="alerts-heading">التنبيهات</h2>

        <Notification v-for="notification in notifications" :type="notification.type" :id="notification.id">
            {{ notification.content }}
        </Notification>
    </section>
</template>

<script setup lang="ts">
    import { useNotificationsStore } from '~/stores/notifications';
    import { storeToRefs } from 'pinia';

    const { notifications } = storeToRefs(useNotificationsStore());
</script>

<style scoped></style>
