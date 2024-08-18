<template>
  <div>
    <select id="availableCameras"></select>
    <video id="videoElement" autoplay></video>

    <!-- <video id="localVideo" autoplay playsinline controls="false" /> -->
    <video id="remoteVideo" autoplay playsinline controls="false" />
    <!-- <audio id="localAudio" autoplay playsinline controls="false" /> -->
    <!-- <audio id="remoteAudio" autoplay playsinline controls="false" /> -->
    <div class="flex">
      <button class="p-2 bg-blue-600 border m-2" id="startButton">Start</button>
      <button class="p-2 bg-blue-600 border m-2" id="stopButton">Stop</button>
      <button class="p-2 bg-blue-600 border m-2" id="callButton" @click="makeCall()">join</button>
      <button class="p-2 bg-blue-600 border m-2" id="callButton" @click="accept" v-if="signalData">accept</button>
    </div>
  </div>
</template>

<script setup>
import { useWebSocket } from "@vueuse/core";

let stream;
let peerConnection;
let sender;
const signalData = ref(null);
const { rawToken } = useAuthState();
const { data } = useAuth();

const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

const openMediaDevices = async (constraints) => {
  return await navigator.mediaDevices.getUserMedia(constraints);
};

///////////////////////////////   User media devices   ///////////////////////////////

// Updates the select element with the provided set of cameras
function updateCameraList(cameras) {
  if (!cameras.length > 0) return;
  const listElement = document.querySelector("select#availableCameras");
  listElement.innerHTML = "";
  cameras
    .map((camera) => {
      const cameraOption = document.createElement("option");
      cameraOption.label = camera.label;
      cameraOption.value = camera.deviceId;
    })
    .forEach((cameraOption) => listElement.add(cameraOption));
}

// Fetch an array of devices of a certain type
async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

// Get the initial set of cameras connected
const videoCameras = getConnectedDevices("videoinput");

// Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener("devicechange", (event) => {
  const newCameraList = getConnectedDevices("video");
  updateCameraList(newCameraList);
});

///////////////////////////////   Open media devices   ///////////////////////////////

// Open camera with at least minWidth and minHeight capabilities
async function openCamera(cameraId, minWidth, minHeight) {
  const constraints = {
    audio: { echoCancellation: true },
    video: {
      deviceId: cameraId,
      width: { min: minWidth },
      height: { min: minHeight },
    },
  };

  return await openMediaDevices(constraints);
}

async function startStream() {
  if (videoCameras && videoCameras.length > 0) {
    // Open first available video camera with a resolution of 1280x720 pixels
    stream = await openCamera(cameras[0].deviceId, 1280, 720);
    playVideoFromCamera();
  } else {
    stream = await openMediaDevices({ audio: true });
    playVideoFromCamera();
  }

  stream.getTracks().forEach((track) => {
    sender = peerConnection.addTrack(track, stream);
    console.log("track added");
  });
}

async function playVideoFromCamera() {
  try {
    const videoElement = document.querySelector("video#localVideo");
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error opening video camera.", error);
  }
}

async function playAudioFromMic() {
  try {
    const audioElement = document.querySelector("audio#localAudio");
    console.log(stream);
    audioElement.srcObject = stream;
  } catch (error) {
    console.error("Error opening audio mic.", error);
  }
}

///////////////////// start webrtc connection ///////////////////////

// Set up an asynchronous communication channel that will be
// used during the peer connection setup
const signalingChannel = useWebSocket(useRuntimeConfig().public.WebsocketURL + `/ws/webrtc/0/` + `?authorization=JWT ${rawToken.value}`, {
  // autoReconnect: true, autoClose: true
});

watch(signalingChannel.data, async (value) => {
  const parsedData = JSON.parse(value);

  try {
    if (parsedData.answer && !(parsedData.username === data.value.username)) {
      const remoteDesc = new RTCSessionDescription(parsedData.answer);
      await peerConnection.setRemoteDescription(remoteDesc);
    }
    if (parsedData.offer && !(parsedData.username === data.value.username)) {
      signalData.value = parsedData;
      // await accept()
    }
  } catch (error) {
    console.error("Error processing message: ", error);
  }

  // Listen for remote ICE candidates and add them to the local RTCPeerConnection
  if (parsedData.candidate && !(parsedData.username == data.value.username)) {
    console.log("Message from remote client: ", parsedData);
    try {
      await peerConnection.addIceCandidate(parsedData.candidate);
    } catch (e) {
      console.error("Error adding received ice candidate", e);
    }
  }
});

// Send an asynchronous message to the remote client
// signalingChannel.send(JSON.stringify({ message: "Hello!" }));

async function makeCall() {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  signalingChannel.send(JSON.stringify({ offer: offer }));
}

async function accept() {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(signalData.value.offer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  signalingChannel.send(JSON.stringify({ answer: answer }));
  signalData.value = null;
}

async function initPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);
  await startStream();

  // Listen for local ICE candidates on the local RTCPeerConnection
  peerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      signalingChannel.send(JSON.stringify({ candidate: event.candidate }));
    }
  });

  // Listen for connectionstatechange on the local RTCPeerConnection
  peerConnection.addEventListener("connectionstatechange", (event) => {
    console.log("Connection state change: ", event);
    console.log(peerConnection.connectionState);
    if (peerConnection.connectionState === "connected") {
      console.log("Peers connected!");

      // Peers connected!
    }
    if (peerConnection.connectionState === "disconnected") {
      console.log("Peers disconnected!");
      // stream.stop();
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track) {
          sender.track.stop();
        }
      });

      // peerConnection.removeStream();
      peerConnection.removeTrack(sender);
      peerConnection.restartIce();
      const audioElement = document.querySelector("audio");
      audioElement.remove();
      peerConnection.close();
      stream.getTracks().forEach((track) => track.stop());
      peerConnection = null;
      initPeerConnection();
    }
  });

  peerConnection.addEventListener("track", async (event) => {
    // Dynamically create the audio element
    const audioElement = document.createElement("audio");
    audioElement.controls = true; // Add controls to the audio element
    audioElement.autoplay = true; // Autoplay the audio when the stream is available

    // Append the audio element to the body or a specific container
    document.body.appendChild(audioElement);

    audioElement.srcObject = event.streams[0];
  });
}
onMounted(async () => {
  updateCameraList(videoCameras);
  await initPeerConnection();
});
</script>

<style></style>
