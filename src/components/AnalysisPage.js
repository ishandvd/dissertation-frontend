import React from 'react'
import colourScheme from './colourScheme';
import RecorderJSDemo from './RecorderJSDemo';
import SheetDisplay from './SheetDisplay';
import sampleDrumHits from './sampleDrumHits';
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const AnalysisPage = () => {

    const [socketInstance, setSocketInstance] = useState("");
    const [loading, setLoading] = useState(true);
  
    const connectToServer = () => {
        const socket = io("localhost:5000/", {
        transports: ["websocket"],
        cors: {
            origin: "http://localhost:3000/",
        },
        });
    
        setSocketInstance(socket);
    
        socket.on("connect", (data) => {
        console.log("You have connected. Server : ", data);
        });
    
        setLoading(false);

        socket.on("disconnect", (data) => {
            console.log("You have disconnected. Server: ", data);
        });

        socket.on("backingtrack", (data) => {
            console.log("backing track received", data);
        });
    
    }

    useEffect(() => {
        if(socketInstance === "") {
            console.log("Analysis Page: connecting to server");
            connectToServer();
        }
    }, [socketInstance]);

    const sendBackingTrack = (event) => {
        const file = event.target.files[0];
        console.log("Analysis Page: backing track selected", file.name);
        const reader = new FileReader();
        reader.onload = () => {
            const buffer = reader.result;
            socketInstance.emit("backingtrack", buffer);
            console.log("Analysis Page: backing track sent")
        };
        reader.readAsArrayBuffer(file);
    }

    const handleFileUpload = (event) => {
        if(socketInstance === "") {
            connectToServer()
            sendBackingTrack(event);
        } else {
            sendBackingTrack(event);
        }
    };

  return (
    <div className="analysis">
        <h5><b>Analysis Page</b></h5>
        <button>Upload File</button>
        <input type="file" onChange={sendBackingTrack} />
        {loading ? <p>Loading...</p> : (
            <>
                <RecorderJSDemo enabled={false} />
                <SheetDisplay 
                drumHits={sampleDrumHits}
                enabled={false}
                method="original"
                />
            </>
            )}
    </div>
  )
}

export default AnalysisPage