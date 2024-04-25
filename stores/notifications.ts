import { defineStore } from "pinia";
import type { Notification } from "~/types"

class Notifications {

	notifications = ref<Notification[]>([])
	all_notifications = ref<Notification[]>([]);
	pagination = ref<PaginationResponse<any>>();
	notification = (notification : Notification, duration : number, timeout : boolean = true) => {

		const existingNotification = this.notifications.value.find((_notification) => _notification.id == notification.id)

		if(existingNotification) return

		this.notifications.value.unshift(
			Object.assign(notification, { id: notification.id ?? Math.random() })
		);
		if(!timeout) return
		setTimeout(() => this.notifications.value.pop(), duration);
	};


	fetchAll = async (params?:any, update?: any): Promise<PaginationResponse<Notification>> => new Promise(async (resolve, reject)=> {
		try{
			const data = (await useProxy('/alerts/notifications', {params: {
				limit: 9,
				...params
			}, headers: {
				'X-Requested-With': process.client ? "XMLHttpRequest" : ''
			}})) as PaginationResponse<Notification>;
			this.all_notifications.value = data.results ?? [];
			this.pagination.value = data;
			update?.();
			resolve(data);
		} catch(e){
			reject(e)
		}
	})
}

export const useNotificationsStore = defineStore(
	"notifications",
	() => new Notifications()
);
