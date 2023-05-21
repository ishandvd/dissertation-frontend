import axios from "axios";
import Recorder from 'recorder-js';
import React, { useState } from 'react';

let gumStream = null;
let recorder = null;
let audioContext = null;

function DrumRecorder({socket, setRecording, setComparisonData}) {


    const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
    console.log("sample rate: " + audioContext.sampleRate);
    // use state to store backing blob
    const [backingBlob, setBackingBlob] = useState(null);

    const recorder = new Recorder(audioContext, {
    })
    
    const constraints = {
        audio: true
    }

    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => recorder.init(stream))
    .catch(err => console.log('Uh oh... unable to get stream...', err));

    const startRecording = () => {
        console.log("startButton clicked");

        recorder.start().then(() => {
            console.log("Recording started");
        }).catch((e) => {
            console.error(e);
        });

    }

    const stopRecording = () => {
        console.log("stopButton clicked");

        recorder.stop()
            .then(({blob, buffer}) => {
                console.log("Recording stopped");
                Recorder.download(blob, 'testt');
                onStop(blob);
            }).catch((e) => {
                console.error(e);
            })
    }

    const sendToServer = () => {
        socket.emit("backing-track", "");
    }

    const onStop = (blob) => {
        console.log("uploading...");

        let data = new FormData();

        data.append('text', "this is the transcription of the audio file");
        data.append('backing-track', blob, "recording.wav");

        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        axios.post('http://localhost:5000/get-comparison', data, config);
    }

    return (
        <div>
            <button onClick={startRecording} type="button">Start</button>
            <button onClick={stopRecording} type="button">Stop</button>
            <button onClick={sendToServer} type="button">Send to server</button>
        </div>
    );
}

export default DrumRecorder;