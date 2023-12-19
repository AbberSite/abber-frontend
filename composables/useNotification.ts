import type { Notification } from "~/types";

export default async ( _notification : Notification, duration : number = 5000) => {

    const { notification } = useNotificationsStore()

    notification(_notification, duration)

};

