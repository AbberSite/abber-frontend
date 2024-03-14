<template>
    <div id="meetingSDKElement" class="w-20 h-20" :class="{ 'ml-44 mt-7' : isMobile, 'absolute right-0 top-0' : !isMobile }"></div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

const { meeting } = storeToRefs(useMeetingStore());
const { data } = useAuthState();
const runtimeConfig = useRuntimeConfig();

const props = withDefaults(defineProps<{
    role : 0|1  
}>(), {
    role : 0
})

const client  = ZoomMtgEmbedded.createClient();

const { getMeetingSignature, bus } = useMeetingStore();


const isMobile = useMediaQuery('(max-width: 1023px)');


bus.on(event => {

    if(event == "leave"){
        client.leaveMeeting()
    }

})

onMounted(async () => {
    await joinMeeting();
});

async function joinMeeting() {
    await getMeetingSignature(props.role);

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
        zoomAppRoot: meetingSDKElement as HTMLElement,
        language: 'en-US',
        customize: {
            video: {
                isResizable: false,
                viewSizes: {
                    default: {
                        width: isMobile.value ? 250 :  800,
                        height: isMobile.value ? 150 : 300
                    },
                }
            }
        }
    });


    console.log(
        {
        sdkKey: runtimeConfig.public.zoomSdkKey,
        signature: meeting.value.signature, 
        meetingNumber: meeting.value.meeting_number,
        password: meeting.value.password,
        userName: data.value.username
    }
    );
    


    client.join({
        sdkKey: runtimeConfig.public.zoomSdkKey,
        signature: meeting.value.signature, 
        meetingNumber: meeting.value.meeting_number,
        password: meeting.value.password,
        userName: data.value.username
    });
}

onUnmounted(() => {
    client.leaveMeeting();
});
</script>

<style scoped></style>
