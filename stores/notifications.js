import { defineStore } from "pinia";

class Notifications {
	notifications = ref([]);

	notification = (notification, duration) => {
		this.notifications.value.unshift(
			Object.assign({ id: Math.random() }, notification)
		);
		setTimeout(() => this.notifications.value.pop(), duration);
	};

	errorNotification = (content, duration = 2000) => {
		const notification = Object.assign(
			{ id: Math.random() },
			{
				type: "danger",
				title: "Error",
				icon: "material-symbols:error-outline",
				content,
			}
		);

		this.notifications.value.unshift(notification);
		setTimeout(() => this.notifications.value.pop(), duration);
	};
	successNotification = (content, duration = 2000) => {
		const notification = Object.assign(
			{ id: Math.random() },
			{
				type: "success",
				title: "Success",
				content,
				icon: "fluent:checkmark-12-filled",
			}
		);

		this.notifications.value.unshift(notification);
		setTimeout(() => this.notifications.value.pop(), duration);
	};
}

export const useNotificationsStore = defineStore(
	"notifications",
	() => new Notifications()
);
