
import OriginalPieceHit from './OriginalPieceHit';
import Staffs from './Staffs';
import UserPieceHit from './UserPieceHit';
import React, { useState, useEffect } from 'react';


// import sample_comparsion from '../sample_comparison.json'
import sample_comparison from './sample_comparison.js';


function SheetDisplay({comparisonData, recording}) {


  // local state for comparison data
  const [comparisonLocal, setComparisonLocal] = useState([])

  // update local state when comparison data changes using useEffect
  useEffect(() => {
    if (!recording && comparisonData && comparisonData.length > 0) {
      setComparisonLocal(comparisonData)
    }
  }, [comparisonData])

  // preprocess the sample_comparison, add artificial timeDiff
  for (let [drum, times] of Object.entries(sample_comparison)) {
    sample_comparison[drum]["user"] = times["user"].map(time => time + Math.random() - 0.5)
  }

  function getMaxTime(drumHits) {
    let userMax = Object.keys(drumHits).map(drum => {
      Math.max(...drumHits[drum]["user"])
    })

    let originalMax = Object.keys(drumHits).map(drum => {
      Math.max(drumHits[drum]["original"])
    })

    return Math.max(...userMax, ...originalMax)
  }

  return (
    <div className="App">
      <div className="canvas">
        <svg height="1500" width="600">
          <Staffs 
            numLines={4} 
            x={50} 
            y={100}
            width={500}
            lineGap={180}
            staffGap={40}  
          />


          {comparisonLocal.length > 0 ? (
            Object.keys(comparisonLocal).map((drum =>
              // iterate over the indices of the drum hits
              comparisonLocal[drum]["user"].map((time, index) => 
                  time >= 0 && comparisonLocal[drum]["original"][index] >= 0 ? (
                      <div key={index}>
                        <OriginalPieceHit
                          instrument={drum}
                          time={comparisonLocal[drum]["original"]}
                          xRoot={50}
                          yRoot={100}
                          staffWidth={500}
                          lineGap={180}
                          staffGap={40}
                        />
      
                        <UserPieceHit
                          instrument={drum}
                          time={comparisonLocal[drum]["user"]}
                          timeDiff={
                            comparisonLocal[drum]["original"][index] - 
                            comparisonLocal[drum]["user"][index]
                          }
                          xRoot={50}
                          yRoot={100}
                          staffWidth={500}
                          lineGap={180}
                          staffGap={40}
                        />
                      </div>
                    ) : null
                  )
                ))
            ) : null }  
          </svg>
      </div>
    </div>
  );
}

export default SheetDisplay;
