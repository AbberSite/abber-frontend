import { useEventBus } from "@vueuse/core";

class MeetingStore {
    meeting = ref<Meeting>({

        meeting_number : "",
        password : "",
        sessions_count : 4,
        signature : ""

    });


    client : unknown | undefined;

    bus = useEventBus<string>('meeting')
    
    getMeetingStatus  = async (orderId : string) => {
        console.log("getting meeting status ...");
        
        const meeting = await useProxy(`/orders/my-orders/${orderId}/meeting/`) as Meeting;
        this.meeting.value = meeting
    }


    getMeetingSignature = async (role : 0|1) => {
        const response = await useProxy("/zoom/auth/", {

            method : "POST", 
            body : {
                meeting_number : this.meeting.value.meeting_number,
                role
            }
        })
         
        this.meeting.value.signature = response.signature

    }

}

export const useMeetingStore = defineStore('meeting', () => new MeetingStore());
