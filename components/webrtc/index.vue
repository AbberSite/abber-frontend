<template>
  <div v-if="!loading">
    <select id="availableCameras"></select>
    <!-- <video id="videoElement" autoplay></video> -->

    <!-- <video id="localVideo" autoplay playsinline controls="false" /> -->
    <video id="localVideo" autoplay playsinline muted controls="false" disabled />
    <!-- <audio id="localAudio" autoplay playsinline controls="false" /> -->
    <!-- <audio id="remoteAudio" autoplay playsinline controls="false" /> -->
    <div class="flex">
      <button class="p-2 bg-blue-600 border m-2" id="startButton" @click="initPeerConnection" v-if="isHost">start</button>
      <button class="p-2 bg-blue-600 border m-2" id="stopButton">Stop</button>
      <button class="p-2 bg-blue-600 border m-2" id="callButton" @click="makeCall" v-if="!isHost && !inCall">join</button>
      <button class="p-2 bg-blue-600 border m-2" id="callButton" @click="accept" v-if="signalData && isHost">accept</button>
      <button class="p-2  border m-2" :class="[mic?'bg-blue-600':'bg-red-600']" id="changeMicBtn" @click="changeMic">mic</button>
      <button class="p-2  border m-2" :class="[cam?'bg-blue-600':'bg-red-600']" id="changeCamBtn" @click="changeCam">cam</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useWebSocket } from "@vueuse/core";

const props = defineProps<{ isHost?: boolean; room?: boolean }>();

let stream: MediaStream | null = null;
let peerConnection: RTCPeerConnection | null = null;
let sender: RTCRtpSender | null = null;

const loading = ref(true);
const mic = ref(true);
const cam = ref(false);
const inCall = ref(false)

const signalData = ref<{ offer?: RTCSessionDescriptionInit; answer?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit; username?: string } | null>(null);

const { rawToken } = useAuthState();
const { data } = useAuth();

const configuration: RTCConfiguration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

const openMediaDevices = async (constraints: MediaStreamConstraints): Promise<MediaStream> => {
  return await navigator.mediaDevices.getUserMedia(constraints);
};

///////////////////////////////   User media devices   ///////////////////////////////

// Updates the select element with the provided set of cameras
function updateCameraList(cameras: MediaDeviceInfo[]): void {
  if (!cameras.length) return;
  const listElement = document.querySelector("select#availableCameras") as HTMLSelectElement;
  listElement.innerHTML = "";
  cameras
    .map((camera) => {
      const cameraOption = document.createElement("option");
      cameraOption.label = camera.label;
      cameraOption.value = camera.deviceId;
      return cameraOption;
    })
    .forEach((cameraOption) => listElement.add(cameraOption));
}

// Fetch an array of devices of a certain type
async function getConnectedDevices(type: MediaDeviceKind): Promise<MediaDeviceInfo[]> {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

// Get the initial set of cameras connected
const videoCameras = await getConnectedDevices("videoinput");

// Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener("devicechange", async () => {
  const newCameraList = await getConnectedDevices("videoinput");
  updateCameraList(newCameraList);
});

///////////////////////////////   Open media devices   ///////////////////////////////

// Open camera with at least minWidth and minHeight capabilities
async function openCamera(cameraId: string, minWidth: number, minHeight: number): Promise<MediaStream> {
  const constraints: MediaStreamConstraints = {
    audio: { echoCancellation: true },
    video: {
      deviceId: cameraId,
      width: { min: minWidth },
      height: { min: minHeight },
    },
  };

  return await openMediaDevices(constraints);
}

async function startStream(): Promise<void> {
  if (videoCameras && videoCameras.length > 0) {
    // Open first available video camera with a resolution of 1280x720 pixels
    // stream = await openCamera(videoCameras[0].deviceId, 1280, 720);
    try{
          stream = await openMediaDevices({ audio: true,video:true });
              // await playVideoFromCamera();


    }catch{
          stream = await openMediaDevices({ audio: true });

    }
  } else {
    stream = await openMediaDevices({ audio: true });
    // await playVideoFromCamera();
  }
 

  if (stream && peerConnection) {
    stream.getTracks().forEach((track) => {
      sender = peerConnection!.addTrack(track, stream!);
      console.log("track added");
    });
  } 
  
}

async function playVideoFromCamera(): Promise<void> {
  try {
    const videoElement = document.querySelector("video#localVideo") as HTMLVideoElement;
    if (stream) videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error opening video camera.", error);
  }
}

async function playAudioFromMic(): Promise<void> {
  try {
    const audioElement = document.querySelector("audio#localAudio") as HTMLAudioElement;
    if (stream) audioElement.srcObject = stream;
  } catch (error) {
    console.error("Error opening audio mic.", error);
  }
}

/////////////////////// Change media input ///////////////////////

function changeMic() {
  mic.value = !mic.value;
  stream?.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
}

function changeCam() {
  cam.value = !cam.value;
  stream?.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
}

///////////////////// start webrtc connection ///////////////////////

// Set up an asynchronous communication channel that will be
// used during the peer connection setup

const signalingChannel = await useWebSocket(useRuntimeConfig().public.WebsocketURL + `/ws/webrtc/${props.room}/` + `?authorization=JWT ${rawToken.value}`, {
  // autoReconnect: true, autoClose: true
});

watch(signalingChannel.data, async (value: any) => {
  const parsedData = JSON.parse(value);

  try {
    if (!(parsedData.username === data.value.username)) {
      if (parsedData.answer) {
        const remoteDesc = new RTCSessionDescription(parsedData.answer);
        await peerConnection?.setRemoteDescription(remoteDesc);
      } else if (parsedData.offer) {
        signalData.value = parsedData;
        // await accept()
      }
      // Listen for remote ICE candidates and add them to the local RTCPeerConnection
      else if (parsedData.candidate) {
        console.log("Message from remote client: ", parsedData);
        try {
          await peerConnection.addIceCandidate(parsedData.candidate);
        } catch (e) {
          console.error("Error adding received ice candidate", e);
        }
      }
    }
  } catch (error) {
    console.error("Error processing message: ", error);
  }
});

// Send an asynchronous message to the remote client
// signalingChannel.send(JSON.stringify({ message: "Hello!" }));

async function makeCall(): Promise<void> {
  if (!peerConnection || !signalingChannel) return;

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  signalingChannel.send(JSON.stringify({ offer: offer }));
  inCall.value=true
}

async function accept(): Promise<void> {
  if (!peerConnection || !signalData.value || !signalData.value.offer || !signalingChannel) return;

  await peerConnection.setRemoteDescription(new RTCSessionDescription(signalData.value.offer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  signalingChannel.send(JSON.stringify({ answer: answer }));
  signalData.value = null;
}

async function initPeerConnection(): Promise<void> {
  peerConnection = new RTCPeerConnection(configuration);
  await startStream();

  if (!peerConnection) return;

  // Listen for local ICE candidates on the local RTCPeerConnection
  peerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate && signalingChannel) {
      signalingChannel.send(JSON.stringify({ candidate: event.candidate }));
    }
  });

  // Listen for connectionstatechange on the local RTCPeerConnection
  peerConnection.addEventListener("connectionstatechange", () => {
    console.log("Connection state change: ", peerConnection?.connectionState);
    if (peerConnection?.connectionState === "connected") {
      console.log("Peers connected!");
      if (!cam.value) {
    stream?.getVideoTracks().forEach((track) => (track.enabled = false));
  }
    }
    if (peerConnection?.connectionState === "disconnected") {
      console.log("Peers disconnected!");
      if (peerConnection) {
        clearConnection();
        initPeerConnection();
      }
    }
  });

  peerConnection.addEventListener("track", async (event) => {
    // Dynamically create the audio element
    console.log('track')
    const audioElement = document.createElement("video");
    audioElement.controls = true; // Add controls to the audio element
    audioElement.autoplay = true; // Autoplay the audio when the stream is available

    // Append the audio element to the body or a specific container
    document.body.appendChild(audioElement);
    console.log(event.streams)

    audioElement.srcObject = event.streams[0];
  });
}

function clearConnection(): void {
  if (!peerConnection || !sender || !stream) return;
  peerConnection.getSenders().forEach((sender) => {
    if (sender.track) {
      sender.track.stop();
    }
  });
  peerConnection.removeTrack(sender);
  peerConnection.restartIce();
  const audioElement = document.querySelector("audio");
  if (audioElement) audioElement.remove();
  peerConnection.close();
  stream.getTracks().forEach((track) => track.stop());
  peerConnection = null;
}

function leave(): void {
  if (!signalingChannel || !peerConnection) return;

  signalingChannel.send(JSON.stringify({ leave: true }));
  signalingChannel.close();
  clearConnection();
}

onMounted(async () => {
  if (!props.isHost) {
    await initPeerConnection();
    // makeCall();
  }
  loading.value = false;
    // updateCameraList(videoCameras);

});

onUnmounted(() => {
  if (signalingChannel) {
    signalingChannel.send(JSON.stringify({ leave: true }));
    signalingChannel.close();
  }
});
</script>

<style></style>
