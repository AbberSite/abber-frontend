import { defineStore } from "pinia";
import type { Notification } from "~/types"

class Notifications {

	notifications = ref<Notification[]>([])

	notification = (notification : Notification, duration : number, timeout : boolean = true) => {

		const existingNotification = this.notifications.value.find((_notification) => _notification.id == notification.id)

		if(existingNotification) return

		this.notifications.value.unshift(
			Object.assign(notification, { id: notification.id ?? Math.random() })
		);
		if(!timeout) return
		setTimeout(() => this.notifications.value.pop(), duration);
	};

}

export const useNotificationsStore = defineStore(
	"notifications",
	() => new Notifications()
);
