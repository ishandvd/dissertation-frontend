import React from 'react'
import colourScheme from './colourScheme';
import RecorderJSDemo from './RecorderJSDemo';
import SheetDisplay from './SheetDisplay';
import sampleDrumHits from './sampleDrumHits';

const AnalysisPage = () => {


  return (
    <div className="analysis">
        <h5><b>Analysis Page</b></h5>
        <RecorderJSDemo />
        <SheetDisplay 
            drumHits={sampleDrumHits}
            enabled={false}
            method="original"
        />
    </div>
  )
}

export default AnalysisPage