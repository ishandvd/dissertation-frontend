
import OriginalPieceHit from './OriginalPieceHit';
import Staffs from './Staffs';

function SheetDisplay({ drumHits, enabled, method }) {

  const xRoot = 50;
  const yRoot = 100;
  const lineGap = 180;
  const staffGap = 40;

  // preprocess the drumHits, add artificial timeDiff
  for (let [drum, times] of Object.entries(drumHits)) {
    drumHits[drum]["user"] = times["user"].map(time => time + Math.random() - 0.5)
  }

  function getMaxTime(drumHits) {
    let userMax = Object.keys(drumHits).map(drum => {
      return Math.max(...drumHits[drum]["user"])
    })

    let originalMax = Object.keys(drumHits).map(drum => {
      return Math.max(...drumHits[drum]["backing"])
    })

    return Math.max(...userMax, ...originalMax)
  }

  const numLines = Math.ceil(getMaxTime(drumHits) / 5)
  const overallHeight = numLines * (lineGap + staffGap * 2)

  return (
    <div className="sheet-display">
      {!enabled ? <p>Follow the instructions to get started...</p> :
        <div className="canvas">
          <svg height={overallHeight} width="600">
            <Staffs 
              numLines={numLines} 
              xRoot={xRoot} 
              yRoot={yRoot}
              width={500}
              lineGap={lineGap}
              staffGap={staffGap}
              overallHeight={overallHeight}  
            />

            {Object.keys(drumHits).map(drum => {
              return drumHits[drum]["backing"].map(time => {
                return <OriginalPieceHit
                  instrument={drum}
                  time={time}
                  xRoot={xRoot}
                  yRoot={yRoot}
                  staffWidth={500}
                  lineGap={lineGap}
                  staffGap={staffGap}
                />
              })
            })}

            {/* <OriginalPieceHit
              instrument="hihat"
              time={13}
              xRoot={50}
              yRoot={100}
              staffWidth={500}
              lineGap={180}
              staffGap={40}
            /> */}

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
