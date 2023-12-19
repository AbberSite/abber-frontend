<template>
	<div
		class="fixed top-10 lg:right-10 inset-0 max-h-fit mx-auto flex flex-col gap-4 lg:max-w-fit w-10/12 z-[999999]"
	>
		<TransitionGroup
			enter-active-class="transition-all duration-300"
			leave-active-class="transition-all duration-300"
			leave-to-class=" opacity-0 translate-y-4"
			enter-from-class="-translate-y-4 opacity-0"
		>
			<Notification
				v-for="notification in notifications"
				:type="notification.type"
				:title="notification.title"
				@click="remove(notification.id)"
				:icon="notification.icon"
				:key="notification"
			>
				{{ notification.content }}
			</Notification>
		</TransitionGroup>
	</div>
</template>

<script setup>
	import { useNotificationsStore } from "~/stores/notifications";
	import { storeToRefs } from "pinia";
	import Notification from "./Notification.vue";

	const { notifications } = storeToRefs(useNotificationsStore());

	function remove(id) {
		notifications.value.map((notification, index) => {
			if (notification.id == id) {
				notifications.value.splice(index, 1);
			}
		});
	}
</script>

<style scoped></style>
