import type { Timer } from './useTimer';

type AudioRecorder = {
    streamBeingCaptured?: MediaStream;
    mediaRecorder?: MediaRecorder;
    audioBlobs: Array<BlobPart>;
    init: Function;
    play: Function;
    pause: Function;
    resume: Function;
    timer: Timer;
    cancel : Function;
    status: Ref<'initialized'|'recording'|'finished'|'paused'>;
    stop: Function;
    element?: HTMLAudioElement|string;
    stopStream: Function;
    resetRecordingProperties: Function;
};

const audioRecorder: AudioRecorder = {
    audioBlobs: [],

    mediaRecorder: undefined,
    element : undefined,

    timer: useTimer(),

    streamBeingCaptured: undefined,

    status: ref('initialized'),

    init: () => {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            throw new Error('audio recording is not supported in your browser');
        }

        return { status: audioRecorder.status, timer: audioRecorder.timer};

    },
    play: async () => {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        audioRecorder.streamBeingCaptured = stream;

        audioRecorder.mediaRecorder = new MediaRecorder(stream);

        audioRecorder.audioBlobs = [];

        audioRecorder.mediaRecorder.addEventListener('dataavailable', (event) => {
            audioRecorder.audioBlobs.push(event.data);
        });

        audioRecorder.mediaRecorder.start();

        audioRecorder.status.value = 'recording';
        audioRecorder.timer.start();
    },

    pause : async () => {

        audioRecorder.mediaRecorder?.pause()
        audioRecorder.timer.stop()
        audioRecorder.status.value = 'paused';

    }, 

    resume : async () => {

        audioRecorder.mediaRecorder?.resume()
        audioRecorder.timer.start()
        audioRecorder.status.value = 'recording';

    }, 

    stop: function () {
        return new Promise((resolve) => {

            let mimeType = audioRecorder.mediaRecorder?.mimeType;

            audioRecorder.mediaRecorder?.addEventListener('stop', () => {
                let audioBlob = new Blob(audioRecorder.audioBlobs, { type: mimeType });

                resolve(audioBlob);
            });

            audioRecorder.mediaRecorder?.stop();

            audioRecorder.stopStream();

            audioRecorder.status.value = 'finished';

            audioRecorder.timer.stop();
            audioRecorder.timer.reset();

            audioRecorder.resetRecordingProperties();

        });
    },

    cancel: function () {

        audioRecorder.mediaRecorder?.stop();
 
        audioRecorder.stopStream();

        audioRecorder.status.value = 'initialized';
        audioRecorder.timer.reset()

        audioRecorder.resetRecordingProperties();

    },

    stopStream: function () {
        audioRecorder.streamBeingCaptured?.getTracks().forEach((track) => track.stop());
    },
    resetRecordingProperties: function () {

        audioRecorder.mediaRecorder = undefined;
        audioRecorder.streamBeingCaptured = undefined;

    }
};

export default () => audioRecorder;
