import { useEventBus } from "@vueuse/core";

class MeetingStore {
    meeting = ref<Meeting>({

        meeting_number : "",
        password : "",
        sessions_count : 0,
        signature : "",
        order_item_id:undefined

    });


    client : unknown | undefined;

    bus = useEventBus<string>('meeting')
    
    getMeetingStatus  = async (orderId : string) => {

        const meeting = await useDirectApi(`/orders/my-orders/${orderId}/meeting/`) as Meeting;
        this.meeting.value = meeting

    }

    openSession = async () => {
        
        this.meeting.value = meeting

    }


}

export const useMeetingStore = defineStore('meeting', () => new MeetingStore());
