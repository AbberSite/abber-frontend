type Status = 'initialized'|'paused'|'recording'|'finished'|'reseted'


class AudioRecorder {
    audioBlobs : Blob[] =  []

    mediaRecorder : undefined|MediaRecorder 
    element =  undefined 

    mimeType? : string


    streamBeingCaptured :  undefined|MediaStream 

    status =  ref<Status>('initialized')

    timer: ReturnType<typeof useTimer>

    constructor(timer : ReturnType<typeof useTimer>){

        this.timer = timer
    }

    init =  (options? : { timer? : { timeout?: number; onTimeout?: Function }}) : { status : Ref<Status>, timer : ReturnType<typeof useTimer>} => {

        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            throw new Error('audio recording is not supported in your browser');
        }


        if(options){

            const { timer } = options


            if(timer){

                const { timeout, onTimeout } = timer

                this.timer.init({ timeout, onTimeout})
    
            }

        }

        return { status: this.status, timer: this.timer};

    }
    play =  async () => {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        this.streamBeingCaptured = stream;

        this.mediaRecorder = new MediaRecorder(stream);
        
        this.mimeType = this.mediaRecorder.mimeType

        this.audioBlobs = [];

        this.mediaRecorder.addEventListener('dataavailable', (event) => {
            this.audioBlobs.push(event.data);
        });

        this.mediaRecorder.start();

        this.status.value = 'recording';
        this.timer.start();
    }

    pause =  async () => {

        this.mediaRecorder?.pause()
        this.timer.stop()
        this.status.value = 'paused';

    }

    resume  = async () => {

        this.mediaRecorder?.resume()
        this.timer.start()
        this.status.value = 'recording';

    }

    stop =  () : Promise<Blob> => {
        return new Promise((resolve) => {

            let mimeType = this.mediaRecorder?.mimeType;

            this.mediaRecorder?.addEventListener('stop', () => {
                let audioBlob = new Blob(this.audioBlobs, { type: mimeType });

                resolve(audioBlob);
            });

            this.mediaRecorder?.stop();

            this.stopStream();

            this.status.value = 'finished';

            this.timer.stop();
            this.timer.reset();

            this.resetRecordingProperties();

        });
    }

    cancel =  () =>  {

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
    stopStream =  () => {
        this.streamBeingCaptured?.getTracks().forEach((track) => track.stop());
    }
    resetRecordingProperties =  () => {

        this.mediaRecorder = undefined;
        this.streamBeingCaptured = undefined;

    }
};

export default () => new AudioRecorder(useTimer());
