import React from 'react'

// convert 
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


// Mathematical interpolation of colours
function interpolateColor(color1, color2, weight) {
  const w1 = 1 - weight;
  const w2 = weight;
  
  const r = Math.round(color1.r * w1 + color2.r * w2);
  const g = Math.round(color1.g * w1 + color2.g * w2);
  const b = Math.round(color1.b * w1 + color2.b * w2);
  
  return rgbToHex(r, g, b);
}

// Map timeDiff (value of 0 to 0.1) to a colour between green and red
function getColor(timeDiff) {
  const green = { r: 0, g: 255, b: 0 };
  const red = { r: 255, g: 0, b: 0 };
  
  const weight = timeDiff / 0.1;
  
  return interpolateColor(green, red, weight);
}


const OriginalPieceHit = (
  {instrument,
    time,
    timeDiff,
    xRoot, yRoot,
    staffWidth,
    lineGap, staffGap}) => {
  
  // Calculate the x position of the hit
  let x = xRoot + ((time % 5) / 5) * staffWidth
  
  // Calculate the y position of the hit
  let y = yRoot + (Math.floor(time / 5) * (lineGap)) + 32

  // Adjust y position based on instrument
  y += (instrument === "hihat") ? 0 : 
        (instrument === "snare") ? staffGap : (staffGap * 2)


  let widthScale = timeDiff * 25
  return (
    <div>

    <svg>
      <rect 
      x={x} y={y + widthScale}
      width={3} height="15" 
      fill={getColor(timeDiff)} fill-opacity="0.4" />
      </svg>
    <svg>
      <rect 
      x={x} y={y}
      width={1.1 * Math.abs(widthScale)} height="15" 
      fill={getColor(timeDiff)} fill-opacity="0.9" />
      </svg>
    </div>
  
  )
}

export default OriginalPieceHit