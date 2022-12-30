import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line
} from "recharts";
import NormalDistribution from "normal-distribution";
import MouseTooltip from 'react-sticky-mouse-tooltip';
import {Typography, Link} from "@material-ui/core";

  // 62.1% is the national average score (1490/2400)
  // 13.5% is the national average SD (323/2400)

  // Harvard:
  // Mean: 1530 -> 2320 | 96.7% (2320/2400) 
  // 75% Percentile: 1580 -> 2390 | SD: 3.1% (74/2400) | SD inferred using this method: https://stats.stackexchange.com/q/506434
  // 

  // CSULB Fall 2017:
  // Both local and non-local mean and SD are provided here: 
  // https://data.ir.csulb.edu/t/IRA-Public/views/UndergraduateStudents/FTFSATCompAVGandSD?%3Aembed=y&%3AshowAppBanner=false&%3AshowShareOptions=true&%3Adisplay_count=no&%3AshowVizHome=no

const normalizedDistributions = [["CSULB Local", new NormalDistribution(1060, 144),"#ffe699"],["CSULB Non-local", new NormalDistribution(1159, 143),"#99b3ff"],["Harvard", new NormalDistribution(1530, 74),"#f6a2b7"]]

const data = []

for (let score = 400; score <= 1600; score+=10) {
  
  let datum = {score}

  for (const [dataSource, distribution] of normalizedDistributions) {
    datum = {...datum, [`${dataSource} Line`]:distribution.pdf(score),[`${dataSource} CDF`]:distribution.cdf(score)}
  }

  data.push(datum)
}

export default function App() {
  const [dataState,setDataState] = useState(data)
  const [isTooltipVisible,setIsTooltipVisible] = useState(false)
  const [dataIndex, setDataIndex] = useState(0)

  const onGraphHover = (e) => {
    const newData = [...dataState]
      for (let i = data.length-1; i >= 0; --i) {
      if (i>=e.activeTooltipIndex){
        normalizedDistributions.forEach(([dataSource])=>{newData[i][`${dataSource} Fill`] = newData[i][`${dataSource} Line`]
      })
    }
      else {
        if (newData[i].fill !== newData[i].line) {
          break
        }
        normalizedDistributions.forEach(([dataSource])=>{delete newData[i][`${dataSource} Fill`]})
      }      
    }
    setDataState(newData)
    if (typeof e.activeTooltipIndex === 'number') {
      setDataIndex(e.activeTooltipIndex)
    }
    
    if (!isTooltipVisible){
    setIsTooltipVisible(true)}

  }
  const CustomTooltip = () => {
    const datum = dataState[dataIndex]
        return (
            <div style={{
                padding: "3px 8px",
                borderRadius: 3,
                backgroundColor: "rgba(23, 23, 23, 0.85)",
                color: "white"
            }}>
               Score: {datum.score}
              {normalizedDistributions.map(([dataSource,_,color])=>{
                
                const cdf =  datum[`${dataSource} CDF`]
              return <div>
                <div><span style={{color}}>{dataSource}</span>: {((1-cdf)*100).toFixed(1)}%<div>Best of {Math.ceil(Math.log(.5)/Math.log(cdf)) || 1} Candidates with 50% Likeliness</div></div>
                </div>
  })}
            </div>
        )

}


  return (
    <>
            <MouseTooltip
          visible={isTooltipVisible}
          offsetX={-250}
          offsetY={-175}
        >
          < CustomTooltip />
        </MouseTooltip>
    <AreaChart
      width={800}
      height={500}
      data={dataState}
      margin={{
        top: 5, right: 30, left: 20, bottom: 40,
    }}

      onMouseMove={onGraphHover}
      onMouseLeave={()=>setIsTooltipVisible(false)}
    >
      <XAxis dataKey="score" minTickGap={50} label={{value: "Score", position: "bottom"}}/>

      {/* Keep Tooltip here because hovering over the graph somehow crashes when it's not present */}
      <Tooltip content={<></>} />
    {normalizedDistributions.map(([dataSource,_,color])=>[<Area key={`${dataSource} Fill`} dataKey={`${dataSource} Fill`} stroke={color} fill={color} />,
    <Area key={`${dataSource} Line`} dataKey={`${dataSource} Line`} stroke={color} fillOpacity="0" fill={color} />])
}            

    </AreaChart>
    <Typography variant={"caption"}>Comparison of <Link
                href="https://data.ir.csulb.edu/t/IRA-Public/views/UndergraduateStudents/FTFSATCompAVGandSD?%3Aembed=y&%3AshowAppBanner=false&%3AshowShareOptions=true&%3Adisplay_count=no&%3AshowVizHome=no"
                target="_blank" rel="noopener noreferrer">CSULB local/non-local (Fall 2017)</Link> and <Link
                href="https://blog.prepscholar.com/sat-scores-for-colleges"
                target="_blank" rel="noopener noreferrer">Harvard (unknown) </Link> distributions on the 1600 SAT scale</Typography></>
  );
}
