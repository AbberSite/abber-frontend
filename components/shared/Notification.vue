<template>
    <div
        class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-md ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
        role="alert">
        <div class="mt-1.5 flex">
            <span class="me-3 flex-shrink-0">
                <!-- Heroicon name: outline/check-circle -->
                <svg
                    v-if="type == 'success'"
                    class="text-green-400"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg
                    v-if="type == 'info'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    class="text-blue-500"
                    stroke-width="1.5"
                    stroke="currentColor"
                    data-slot="icon">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <svg
                    v-if="type == 'danger'"
                    class="text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    data-slot="icon">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <svg
                    v-if="type == 'warning'"
                    class="text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    data-slot="icon">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            </span>
            <div class="w-0 flex-1 text-sm font-medium leading-loose"><slot /></div>
            <div class="ms-4 flex-shrink-0">
                <button
                    class="hover:text-primary -m-2 rounded-full bg-white p-2 text-gray-500 hover:bg-gray-50 focus:outline-none"
                    type="button"
                    @click="remove(id)">
                    <span class="sr-only">Close</span>
                    <!-- Heroicon name: mini/x-mark -->
                    <svg
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useNotificationsStore } from '~/stores/notifications';
    import { storeToRefs } from 'pinia';

    const { notifications } = storeToRefs(useNotificationsStore());

    function remove(id: number) {
        notifications.value.map((notification, index) => {
            if (notification.id == id) {
                notifications.value.splice(index, 1);
            }
        });
    }

    const props = defineProps<{
        id: number;
        type: 'success' | 'warning' | 'info' | 'danger';
    }>();
</script>

<style scoped></style>
