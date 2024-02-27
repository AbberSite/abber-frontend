//View
import {activateChatForm, deActivateChatForm} from './chat';
import {loadScript} from '../helpers';

up.compiler('.start-recording-button', () => {
    loadScript('/static/recorder/lib-minified/WebAudioRecorder.min.js').then(async () => {
        var microphoneButton = document.getElementsByClassName('start-recording-button')[0];
        var recordingControlButtonsContainer = document.getElementsByClassName(
            'recording-contorl-buttons-container',
        )[0];
        var stopRecordingButton = document.getElementsByClassName(
            'stop-recording-button',
        )[0];
        var cancelRecordingButton = document.getElementsByClassName(
            'cancel-recording-button',
        )[0];
        var elapsedTimeTag = document.getElementsByClassName('elapsed-time')[0];
        var closeBrowserNotSupportedBoxButton = document.getElementsByClassName(
            'close-browser-not-supported-box',
        )[0];
        var overlay = document.getElementsByClassName('overlay')[0];
        var audioElement = document.getElementsByClassName('audio-element')[0];
        var audioElementSource = document
            .getElementsByClassName('audio-element')[0]
            .getElementsByTagName('source')[0];
        var textIndicatorOfAudiPlaying = document.getElementsByClassName(
            'text-indication-of-audio-playing',
        )[0];
        var hiddenWhileRecording = document.querySelectorAll('.hidden-while-recording');
        var audioInputField = document.querySelector('.audio-input-field');
        var insertAudioPlayerContainer = document.querySelector('#discuss-section div');
        const maxElapsedTimeSeconds = JSON.parse(
            document.getElementById('json-max-elapsed-time-seconds').textContent,
        );
        var gumStream; //stream from getUserMedia()
        var recorder; //WebAudioRecorder object
        var input; //MediaStreamAudioSourceNode  we'll be recording
        var encodingType; //holds selected encoding for resulting audio (file)
        var encodeAfterRecord = true; // when to encode

        // shim for AudioContext when it's not avb.
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext; //new audio context to help us record

        //Listeners

        //Listen to start recording button
        microphoneButton.onclick = startAudioRecording;

        //Listen to stop recording button
        stopRecordingButton.onclick = stopAudioRecording;

        //Listen to cancel recording button
        cancelRecordingButton.onclick = cancelAudioRecording;

        //Listen to when the ok button is clicked in the browser not supporting audio recording box
        // closeBrowserNotSupportedBoxButton.onclick = hideBrowserNotSupportedOverlay;

        //Listen to when the audio being played ends
        audioElement.onended = hideTextIndicatorOfAudioPlaying;

        /** Displays recording control buttons */
        function handleDisplayingRecordingControlButtons() {
            //Hide the microphone button that starts audio recording
            microphoneButton.classList.add('hidden');

            //Display the recording control buttons
            recordingControlButtonsContainer.classList.remove('hidden');
            hiddenWhileRecording.forEach(function (element) {
                element.classList.add('hidden');
            });

            //Handle the displaying of the elapsed recording time
            handleElapsedRecordingTime();
        }

        /** Hide the displayed recording control buttons */
        function handleHidingRecordingControlButtons() {
            //Display the microphone button that starts audio recording
            microphoneButton.classList.remove('hidden');

            //Hide the recording control buttons
            recordingControlButtonsContainer.classList.add('hidden');
            hiddenWhileRecording.forEach(function (element) {
                element.classList.remove('hidden');
            });

            //stop interval that handles both time elapsed and the red dot
            clearInterval(elapsedTimeTimer);
        }

        /** Displays browser not supported info box for the user*/
        function displayBrowserNotSupportedOverlay() {
            overlay.classList.remove('hidden');
        }

        /** Displays browser not supported info box for the user*/
        function hideBrowserNotSupportedOverlay() {
            overlay.classList.add('hidden');
        }

        /** Creates a source element for the the audio element in the HTML document*/
        function createSourceForAudioElement() {
            let sourceElement = document.createElement('source');
            audioElement.appendChild(sourceElement);

            audioElementSource = sourceElement;
        }

        /** Display the text indicator of the audio being playing in the background */
        function displayTextIndicatorOfAudioPlaying() {
            try {
                textIndicatorOfAudiPlaying.classList.remove('hidden');
            } catch (e) {
            }
        }

        /** Hide the text indicator of the audio being playing in the background */
        function hideTextIndicatorOfAudioPlaying() {
            try {
                textIndicatorOfAudiPlaying.classList.add('hidden');
            } catch (e) {
            }
        }

        //Controller

        /** Stores the actual start time when an audio recording begins to take place to ensure elapsed time start time is accurate*/
        var audioRecordStartTime;

        /** Stores the maximum recording time in hours to stop recording once maximum recording hour has been reached */
        var maximumRecordingTimeInHours = 1;

        /** Stores the reference of the setInterval function that controls the timer in audio recording*/
        var elapsedTimeTimer;

        /** Starts the audio recording*/
        function startAudioRecording() {
            console.log('Recording Audio...');

            //If a previous audio recording is playing, pause it
            let recorderAudioIsPlaying = !audioElement.paused; // the paused property tells whether the media element is paused or not
            console.log('paused?', !recorderAudioIsPlaying);
            if (recorderAudioIsPlaying) {
                audioElement.pause();
                //also hide the audio playing indicator displayed on the screen
            }
            //start recording using the audio recording API
            startRecording();
        }

        /** Stop the currently started audio recording & sends it
         */
        function stopAudioRecording() {
            if (recorder.isRecording()) {
                deActivateChatForm();

                console.log('Stopping Audio Recording...');

                //stop the recording using the audio recording API
                gumStream.getAudioTracks()[0].stop();

                recorder.finishRecording();
                //hide recording control button & return record icon
                handleHidingRecordingControlButtons();
            }
        }

        /** Cancel the currently started audio recording */
        function cancelAudioRecording() {
            console.log('Canceling audio...');

            gumStream.getAudioTracks()[0].stop();

            //cancel the recording using the audio recording API
            recorder.cancelRecording();

            //hide recording control button & return record icon
            handleHidingRecordingControlButtons();
        }

        /** Plays recorded audio using the audio element in the HTML document
         * @param {Blob} recorderAudioAsBlob - recorded audio as a Blob Object
         */
        function playAudio(recorderAudioAsBlob) {
            //read content of files (Blobs) asynchronously
            let reader = new FileReader();

            //once content has been read
            reader.onload = (e) => {
                //store the base64 URL that represents the URL of the recording audio
                let base64URL = e.target.result;

                //If this is the first audio playing, create a source element
                //as pre populating the HTML with a source of empty src causes error
                if (!audioElementSource)
                    //if its not defined create it (happens first time only)
                    createSourceForAudioElement();

                //set the audio element's source using the base64 URL
                audioElementSource.src = base64URL;

                //set the type of the audio element based on the recorded audio's Blob type
                let BlobType = recorderAudioAsBlob.type.includes(';')
                    ? recorderAudioAsBlob.type.substr(0, recorderAudioAsBlob.type.indexOf(';'))
                    : recorderAudioAsBlob.type;
                audioElementSource.type = BlobType;

                //call the load method as it is used to update the audio element after changing the source or other settings
                audioElement.load();

                //play the audio after successfully setting new src and type that corresponds to the recorded audio
                console.log('Playing audio...');
                audioElement.play();

                //Display text indicator of having the audio play in the background
                displayTextIndicatorOfAudioPlaying();
            };

            //read content and convert it to a URL (base64)
            reader.readAsDataURL(recorderAudioAsBlob);
        }

        // only way to change input[type=file] value is with a other FileList instance
        // and this is currently the only way to construct a new FileList
        function createFileList(a) {
            a = [].slice.call(Array.isArray(a) ? a : arguments);
            for (var c, b = (c = a.length), d = !0; b-- && d;) d = a[b] instanceof File;
            if (!d)
                throw new TypeError(
                    'expected argument to FileList is File or array of File objects',
                );
            for (b = new ClipboardEvent('').clipboardData || new DataTransfer(); c--;)
                b.items.add(a[c]);
            return b.files;
        }

        /** Insert recorded audio using the audio element in the HTML document
         * @param {Blob} recorderAudioAsBlob - recorded audio as a Blob Object
         */
        function insertAudioElement(recorder, recorderAudioAsBlob) {
            if (audioInputField) {
                window.onbeforeunload = function () {
                };
                let BlobType = recorderAudioAsBlob.type.includes(';')
                    ? recorderAudioAsBlob.type.substr(0, recorderAudioAsBlob.type.indexOf(';'))
                    : recorderAudioAsBlob.type;

                // Create a file input element and assign the Blob as its value
                var file = new File(
                    [recorderAudioAsBlob],
                    `recording_${getRandomFileName()}.${recorder.encoding}`,
                    {type: BlobType},
                );
                audioInputField.files = createFileList(file);
                audioElement.classList.remove('hidden');
                document.querySelector('#chat-form').classList.add('hidden');
                playAudio(recorderAudioAsBlob);
            } else {
                var url = URL.createObjectURL(recorderAudioAsBlob);

                insertAudioPlayerContainer.innerHTML += `
   <div class="flex items-start space-x-3 space-x-reverse">
  <a href="#" class="flex items-center flex-shrink-0 w-10"></a>
  <div class="space-y-2 w-full">
    <div id="message-last-record" class="space-y-2 w-fit">
      <p class="bg-sky-100 leading-[1.75] px-4 py-3 rounded-xl rounded-tr-none shadow-sm text-gray-700 text-right break-words">
      <svg class="animate-spin absolute top-7 z-40 translate-x-1/2 left-7" height="20" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      <span></span>
      <audio src="${url}" controls="" controlslist="nodownload noplaybackrate" class="max-w-[100%] min-w-[10rem] disabled"></audio></p>
    </div>
  </div>
</div>
   `;
                insertAudioPlayerContainer.scrollTop = insertAudioPlayerContainer.scrollHeight;
            }
        }

        /** create and dispatch a custom event with the file ID when the voice recording is complete
         * @param {String} fileId - file id from API endpoint
         * */
        function dispatchVoiceRecordingCompleteEvent(fileId) {
            const event = new CustomEvent('voiceRecordingComplete', {
                detail: {fileId},
            });
            document.querySelector('#recorder').dispatchEvent(event);
        }

        /*** random filename almost unique */
        function getRandomFileName() {
            var timestamp = new Date().toISOString().replace(/[-:.]/g, '');
            var random = ('' + Math.random()).substring(2, 8);
            var random_number = timestamp + random;
            return random_number;
        }

        /** Send the recorded audio to an API endpoint
         * @param {Blob} recorderAudioAsBlob - recorded audio as a Blob Object
         */
        function sendAudioToAPI(recorder, recorderAudioAsBlob) {
            const formData = new FormData();

            formData.append(
                'file',
                recorderAudioAsBlob,
                `recording_${getRandomFileName()}.${recorder.encoding}`,
            );
            // Get CSRF token
            const CSRFToken = document.querySelector(
                'input[name="csrfmiddlewaretoken"]',
            ).value;
            window.onbeforeunload = function () {
                return 'لم ينتهي رفع التسجيل الصوتي للخادم, هل انت متأكد من الإلغاء';
            };
            // deActivateChatForm();
            fetch('/chat/save-file/', {
                method: 'POST',
                body: formData,
                headers: {'X-CSRFToken': CSRFToken},
            })
                .then(function (response) {
                    // Handle the response from the API endpoint
                    console.log('Audio sent to the API endpoint successfully!');
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    // Call the function when the voice recording is complete, passing the file ID
                    dispatchVoiceRecordingCompleteEvent(data.id);
                    activateChatForm();
                })
                .catch(function (error) {
                    console.error('Error sending audio to the API endpoint:', error);
                });
        }

        /** Computes the elapsed recording time since the moment the function is called in the format h:m:s*/
        function handleElapsedRecordingTime() {
            //display inital time when recording begins
            displayElapsedTimeDuringAudioRecording('00:00');

            //create an interval that compute & displays elapsed time, as well as, animate red dot - every second
            elapsedTimeTimer = setInterval(() => {
                //compute the elapsed time every second
                let elapsedTime = computeElapsedTime(audioRecordStartTime); //pass the actual record start time
                //display the elapsed time
                displayElapsedTimeDuringAudioRecording(elapsedTime);
            }, 1000); //every second
            setTimeout(stopAudioRecording, maxElapsedTimeSeconds * 1000 + 10);
        }

        /** Display elapsed time during audio recording
         * @param {String} elapsedTime - elapsed time in the format mm:ss or hh:mm:ss
         */
        function displayElapsedTimeDuringAudioRecording(elapsedTime) {
            //1. display the passed elapsed time as the elapsed time in the elapsedTime HTML element
            elapsedTimeTag.innerHTML = elapsedTime;

            //2. Stop the recording when the max number of hours is reached
            if (elapsedTimeReachedMaximumNumberOfHours(elapsedTime)) {
                stopAudioRecording();
            }
        }

        /**
         * @param {String} elapsedTime - elapsed time in the format mm:ss or hh:mm:ss
         * @returns {Boolean} whether the elapsed time reached the maximum number of hours or not
         */
        function elapsedTimeReachedMaximumNumberOfHours(elapsedTime) {
            //Split the elapsed time by the symbo :
            let elapsedTimeSplitted = elapsedTime.split(':');

            //Turn the maximum recording time in hours to a string and pad it with zero if less than 10
            let maximumRecordingTimeInHoursAsString =
                maximumRecordingTimeInHours < 10
                    ? '0' + maximumRecordingTimeInHours
                    : maximumRecordingTimeInHours.toString();

            //if it the elapsed time reach hours and also reach the maximum recording time in hours return true
            if (
                elapsedTimeSplitted.length === 3 &&
                elapsedTimeSplitted[0] === maximumRecordingTimeInHoursAsString
            )
                return true;
            //otherwise, return false
            else return false;
        }

        /** Computes the elapsedTime since the moment the function is called in the format mm:ss or hh:mm:ss
         * @param {String} startTime - start time to compute the elapsed time since
         * @returns {String} elapsed time in mm:ss format or hh:mm:ss format, if elapsed hours are 0.
         */
        function computeElapsedTime(startTime) {
            //record end time
            let endTime = new Date();

            //time difference in ms
            let timeDiff = endTime - startTime;

            //convert time difference from ms to seconds
            timeDiff = timeDiff / 1000;

            //extract integer seconds that dont form a minute using %
            let seconds = Math.floor(timeDiff % 60); //ignoring uncomplete seconds (floor)

            //pad seconds with a zero if neccessary
            seconds = seconds < 10 ? '0' + seconds : seconds;

            //convert time difference from seconds to minutes using %
            timeDiff = Math.floor(timeDiff / 60);

            //extract integer minutes that don't form an hour using %
            let minutes = timeDiff % 60; //no need to floor possible incomplete minutes, becase they've been handled as seconds
            minutes = minutes < 10 ? '0' + minutes : minutes;

            //convert time difference from minutes to hours
            timeDiff = Math.floor(timeDiff / 60);

            //extract integer hours that don't form a day using %
            let hours = timeDiff % 24; //no need to floor possible incomplete hours, becase they've been handled as seconds

            //convert time difference from hours to days
            timeDiff = Math.floor(timeDiff / 24);

            // the rest of timeDiff is number of days
            let days = timeDiff; //add days to hours

            let totalHours = hours + days * 24;
            totalHours = totalHours < 10 ? '0' + totalHours : totalHours;

            if (totalHours === '00') {
                return minutes + ':' + seconds;
            } else {
                return totalHours + ':' + minutes + ':' + seconds;
            }
        }

        // audio-recording.js ---------------
        //API to handle audio recording
        var AudioContext = window.AudioContext || window.webkitAudioContext;

        function createDownloadLink(blob) {
            var url = URL.createObjectURL(blob);

            console.log(url);
        }

        function startRecording() {
            console.log('startRecording() called');

            /*
              Simple constraints object, for more advanced features see
              https://addpipe.com/blog/audio-constraints-getusermedia/
            */

            var constraints = {audio: true, video: false};

            /*
              We're using the standard promise based getUserMedia()
              https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
          */

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(function (stream) {
                    console.log(
                        'getUserMedia() success, stream created, initializing WebAudioRecorder...',
                    );

                    /*
                    create an audio context after getUserMedia is called
                    sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
                    the sampleRate defaults to the one set in your OS for your playback device

                  */
                    audioContext = new AudioContext();
                    const analyser = audioContext.createAnalyser();
                    const canvas = document.getElementById('visualizationCanvas');
                    const canvasContext = canvas.getContext('2d');
                    const canvas2 = document.getElementById('visualizationCanvas2');
                    const canvasContext2 = canvas2.getContext('2d');
                    analyser.fftSize = 256 / 2;

                    //assign to gumStream for later use
                    gumStream = stream;

                    /* use the stream */
                    input = audioContext.createMediaStreamSource(stream);
                    input.connect(analyser);

                    // Visualization loop
                    function draw() {
                        const dataArray = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(dataArray);

                        // Clear canvas
                        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
                        canvasContext2.clearRect(0, 0, canvas.width, canvas.height);
                        canvasContext.fillStyle = '#030712';
                        canvasContext2.fillStyle = '#030712';

                        // Draw frequency bars
                        const barWidth = (canvas.width / analyser.frequencyBinCount);
                        for (let i = 0; i < analyser.frequencyBinCount / 3; i++) {
                            const barHeight = dataArray[i] / 10;
                            canvasContext.fillRect(i * barWidth * 4, canvas.height - barHeight, barWidth / 4, barHeight);
                            canvasContext2.fillRect(i * barWidth * 4, canvas.height - barHeight, barWidth / 4, barHeight);
                        }

                        if (recorder.isRecording()) {
                            // Continue drawing in real-time if recording is still in progress
                            requestAnimationFrame(draw);
                        }
                    }

                    //stop the input from playing back through the speakers
                    //input.connect(audioContext.destination)

                    //get the encoding
                    encodingType = 'mp3';

                    //disable the encoding selector

                    recorder = new WebAudioRecorder(input, {
                        workerDir: '/static/recorder/lib-minified/', // must end with slash
                        encoding: encodingType,
                        onEncoderLoaded: function (recorder, encoding) {
                            // hide "loading encoder..." display
                            console.log(encoding + ' encoder loaded');
                            //display control buttons to offer the functionality of stop and cancel
                            handleDisplayingRecordingControlButtons();
                        },
                    });

                    recorder.onComplete = function (recorder, blob) {
                        console.log('Encoding complete');
                        insertAudioElement(recorder, blob);
                        if (!audioInputField) {
                            //Send record to API
                            sendAudioToAPI(recorder, blob);
                        }
                    };

                    recorder.setOptions({
                        encodeAfterRecord: encodeAfterRecord,
                    });

                    //start the recording process
                    recorder.startRecording();
                    draw()
                    hideTextIndicatorOfAudioPlaying();

                    console.log('Recording started');
                })
                .catch(function (err) {
                    //enable the record button if getUSerMedia() fails
                    console.log(err);
                });
            //store the recording start time to display the elapsed time according to it
            audioRecordStartTime = new Date();
        }
    });
});
