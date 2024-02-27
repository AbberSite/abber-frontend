import { defineStore } from "pinia";
import type { Notification } from "~/types"

class Notifications {

	notifications = ref<Notification[]>([])

	notification = (notification : Notification, duration : number, timeout : boolean = true) => {
		this.notifications.value.unshift(
			Object.assign(notification, { id: Math.random() })
		);
		if(!timeout) return
		setTimeout(() => this.notifications.value.pop(), duration);
	};

}

export const useNotificationsStore = defineStore(
	"notifications",
	() => new Notifications()
);
