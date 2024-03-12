<template>
    <div id="meetingSDKElement" class="w-20 h-20" :class="{ 'ml-44 mt-7' : isMobile, 'absolute right-0 top-0' : !isMobile }"></div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

const { meeting } = storeToRefs(useMeetingStore());
const { data } = useAuthState();
const runtimeConfig = useRuntimeConfig();

// const id = useRoute().params.id;

// const { getSession } = useAuth();

// const { order } = storeToRefs(useOrdersStore());

// const { getOrder } = useOrdersStore();

const client  = ZoomMtgEmbedded.createClient();

const { getMeetingStatus, getMeetingSignature, bus } = useMeetingStore();


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
    await getMeetingSignature(0);

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

    client.join({
        sdkKey: runtimeConfig.public.zoomSdkKey,
        signature: meeting.value.signature, // role in SDK signature needs to be 1
        meetingNumber: meeting.value.meeting_number,
        password: meeting.value.password,
        userName: data.value.username
        // zak: zakToken // the host's zak token
    });
}

onUnmounted(() => {
    client.leaveMeeting();
});
</script>

<style scoped></style>
