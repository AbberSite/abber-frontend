import { defineStore } from "pinia";
import type { Notification } from "~/types"

class Notifications {

	notifications = ref<Notification[]>([])

	notification = (notification : Notification, duration : number) => {
		this.notifications.value.unshift(
			Object.assign(notification, { id: Math.random() })
		);
		setTimeout(() => this.notifications.value.pop(), duration);
	};

}

export const useNotificationsStore = defineStore(
	"notifications",
	() => new Notifications()
);
