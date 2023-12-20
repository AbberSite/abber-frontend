<template>
    <section
        class="fixed bottom-4 right-1/2 z-20 flex w-full translate-x-1/2 flex-col space-y-4 px-4 xs:bottom-6 xs:px-6 sm:max-w-sm md:right-auto md:translate-x-0 md:px-0 ltr:md:right-6 rtl:md:left-6 lg:bottom-8 ltr:lg:right-8 rtl:lg:left-8"
        aria-labelledby="alerts-heading">
        <h2 class="sr-only" id="alerts-heading">التنبيهات</h2>

        <!-- <Notification :type="notification.type" :id="(notification.id as number)">
            {{ notification.content }}
        </Notification> -->
        <TransitionGroup
            enter-active-class="transition-all"
            leave-active-class="transition-all"
            enter-from-class="translate-x-10 opacity-0"
            leave-to-class="translate-x-10 opacity-0">
            <template v-for="notification in notifications">
                <div>

                    <Alert :type="notification.type" :id="(notification.id as number)">
                        {{ notification.content }}
                    </Alert>
                    
                </div>
            </template>
        </TransitionGroup>
    </section>
</template>

<script setup lang="ts">
    import { useNotificationsStore } from '~/stores/notifications';
    import { storeToRefs } from 'pinia';

    const { notifications } = storeToRefs(useNotificationsStore());
</script>

<style scoped></style>
