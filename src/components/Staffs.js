import React from 'react'

const Staffs = ({numLines, xRoot, yRoot, width, lineGap, staffGap, overallHeight}) => {

    let annotations = [
      <text textAnchor="middle" 
              x={xRoot - 20} 
              y={yRoot + 5}>Hihat</text>,
      <text textAnchor="middle" 
              x={xRoot - 20} 
              y={yRoot + 5 + staffGap}>Snare</text>,
      <text textAnchor="middle" 
              x={xRoot - 20} 
              y={yRoot + 5 + (staffGap * 2)}>Kick</text>
    ]
    let lines = []
    for (let i = 0; i < numLines; i++) {
        // Number of seconds indicator at right of each line block
        lines.push(
        <text textAnchor="middle" 
              x={xRoot + width + 10} 
              y={yRoot + i * lineGap - 5}>{5 * (i+1)}s</text>
        )
        // Draw the staff lines in each line block
        lines.push(
        <line x1={xRoot} y1={yRoot + i * lineGap} 
              x2={xRoot + width} y2={yRoot + i * lineGap} 
              stroke="black" strokeWidth="2" />)
        lines.push(
          <line x1={xRoot} y1={yRoot + (i * lineGap) + staffGap} 
                x2={xRoot + width} y2={yRoot + (i * lineGap) + staffGap} 
                stroke="black" strokeWidth="2" />)
        lines.push(
          <line x1={xRoot} y1={yRoot + (i * lineGap) + (staffGap * 2)} 
                x2={xRoot + width} y2={yRoot + (i * lineGap) + (staffGap * 2)} 
                stroke="black" strokeWidth="2" />)
    }

  return (
    <svg height={overallHeight} width="600">
        {annotations}
        {lines}
    </svg>
  )
}

export default Staffs