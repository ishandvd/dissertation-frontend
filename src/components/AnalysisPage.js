import React from 'react'
import colourScheme from './colourScheme';
import RecorderJSDemo from './RecorderJSDemo';
import SheetDisplay from './SheetDisplay';
import sampleDrumHits from './sampleDrumHits';
import axios from "axios";
import { useEffect, useState } from "react";

const AnalysisPage = () => {

    const [drumHits, setDrumHits] = useState({});

    const sendBackingTrack = (event) => {
        const file = event.target.files[0];
        console.log("Analysis Page: sending backing track");
        let data = new FormData();
        data.append('backing_track', file, "backing.wav");
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        // Send post request and receive response, then log it
        axios.post('http://localhost:5000/backing-track', data, config).then((response) => {
            console.log(response);
            setDrumHits(response.data.timings);
        }).catch((error) => {
            console.log(" ERROR: Analysis Page: ", error);
        });
    }

    useEffect(() => {}, [drumHits]);

  return (
    <div className="analysis">
        <h5><b>Analysis Page</b></h5>
        <button>Upload File</button>
        <input type="file" onChange={sendBackingTrack} />
        {drumHits === {} ? <p>Loading...</p> : (
            <>
                <RecorderJSDemo enabled={drumHits !== {}} />
                <SheetDisplay 
                drumHits={drumHits}
                enabled={drumHits !== {}}
                method="original"
                />
            </>
            )}
    </div>
  )
}

export default AnalysisPage