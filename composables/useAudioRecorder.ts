type Status = 'initialized' | 'paused' | 'recording' | 'finished' | 'reseted'


class AudioRecorder {
  audioBlobs: Blob[] = []

  mediaRecorder: undefined | MediaRecorder
  element = undefined

  mimeType?: string
  recorder: any


  streamBeingCaptured: undefined | MediaStream

  status = ref<Status>('initialized')

  timer: ReturnType<typeof useTimer>


  constructor(timer: ReturnType<typeof useTimer>) {

    this.timer = timer
  }

  init = (options?: { timer?: { timeout?: number; onTimeout?: Function, hours?: boolean } }): { status: Ref<Status>, timer: ReturnType<typeof useTimer>, audioBlobs: Blob[] } => {

    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      throw new Error('audio recording is not supported in your browser');
    }


    if (options) {

      const { timer } = options


      if (timer) {

        const { timeout, onTimeout, hours } = timer

        this.timer.init({ timeout, onTimeout, hours })

      }

    }

    return { status: this.status, timer: this.timer, audioBlobs: this.audioBlobs };

  }
  play = async () => {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext; //new audio context to help us record
    audioContext = new AudioContext();
    let input = audioContext.createMediaStreamSource(stream);
    let blobs = this.audioBlobs;
    let status = this.status;

    const recorder = new WebAudioRecorder(input, {
      workerDir: "/audio-recorder/",   // must end with slash
      encoding: 'mp3',

    })
    recorder.onComplete = function (recorder, blob) {
      var blobUrl = URL.createObjectURL(blob);
      blobs.push(blob);
      status.value = 'finished';


    }


    this.streamBeingCaptured = stream;

    this.recorder = recorder;
    recorder.setOptions({
      encodeAfterRecord: true,
    });

    //start the recording process
    recorder.startRecording();

    // this.mimeType = this.mediaRecorder.mimeType


    // this.mediaRecorder.addEventListener('dataavailable', (event) => {
      // this.audioBlobs.push(event.data);
    // });

    // this.mediaRecorder.start();

    this.status.value = 'recording';
    this.timer.start();
  }

  pause = async () => {

    this.mediaRecorder?.pause()
    this.timer.stop()
    this.status.value = 'paused';

  }

  resume = async () => {

    this.mediaRecorder?.resume()
    this.timer.start()
    this.status.value = 'recording';

  }

  stop = (): Promise<Blob> => {
    return new Promise((resolve) => {

      console.log('Stopping Audio Recording...');

      //stop the recording using the audio recording API

      this.recorder.finishRecording();
      this.stopStream();


      this.timer.stop();
      this.timer.reset();

      this.resetRecordingProperties();

    });
  }

  cancel = () => {

    this.mediaRecorder?.stop();

    this.stopStream();

    this.status.value = 'initialized';
    this.timer.reset()

    this.resetRecordingProperties();

  }


  reset = () => {

    this.resetRecordingProperties()
    this.status.value = 'initialized'

  }
  stopStream = () => {
    this.streamBeingCaptured?.getTracks().forEach((track) => track.stop());
  }
  resetRecordingProperties = () => {

    this.mediaRecorder = undefined;
    this.streamBeingCaptured = undefined;

  }
};

export default () => new AudioRecorder(useTimer());
