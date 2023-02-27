
import OriginalPieceHit from './OriginalPieceHit';
import Staffs from './Staffs';

function SheetDisplay({ drumHits, enabled, method }) {

  // preprocess the drumHits, add artificial timeDiff
  for (let [drum, times] of Object.entries(drumHits)) {
    drumHits[drum]["user"] = times["user"].map(time => time + Math.random() - 0.5)
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
    <div className="sheet-display">
      {!enabled ? <p>Follow the instructions to get started...</p> :
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

            <OriginalPieceHit
              instrument="hihat"
              time={13}
              xRoot={50}
              yRoot={100}
              staffWidth={500}
              lineGap={180}
              staffGap={40}
            />

            {/* <UserPieceHit
              instrument="hihat"
              time={13}
              timeDiff={0.01}
              xRoot={50}
              yRoot={100}
              staffWidth={500}
              lineGap={180}
              staffGap={40}
            /> */}

          </svg>
        </div>
      }
    </div>
  );
}

export default SheetDisplay;
