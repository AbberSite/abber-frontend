import type { Notification } from "~/types";

export default async ( _notification : Notification, timeout: boolean = true,duration : number = 3000) => {

    const { notification } = useNotificationsStore()

    notification(_notification, duration, timeout)

};

