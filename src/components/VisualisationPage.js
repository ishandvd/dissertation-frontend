import React, { useEffect } from 'react'
import DrumRecorder from './DrumRecorder'
import SheetDisplay from './SheetDisplay'
import { useState } from 'react'
import { io } from "socket.io-client";

const VisualisationPage = () => {

  // State variables to pass comparison data to SheetDisplay
  // This is where the socketinstance stuff can go.
  // 


  const [comparisonData, setComparisonData] = useState([])
  const [recording, setRecording] = useState(false)
  const [socketInstance, setSocketInstance] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(loading === true) {
      const socket = io("localhost:5001/", {
        transports: ["websocket"],
        cors: {
          origin: "http://localhost:3000/",
        },
      });

      setSocketInstance(socket);
      setLoading(false);

      socket.on("connect", (data) => {
        console.log("You have connected. Server : ", data);
      });

      socket.on("connect_error", (error) => {
        console.log("WebSocket connection error:", error);
      });


      socket.on("disconnect", (data) => {
        console.log("You have disconnected. Server: ", data);
      });

      return function cleanup() {
        console.log("cleanup")
        socket.disconnect();
      }
    }
  }, [loading])

  return (
    <div>
        {!loading && <DrumRecorder props={{setComparisonData,  setRecording}} />}
        {!loading && <SheetDisplay props={{comparisonData, recording}}/>}
    </div>
  )
}

export default VisualisationPage