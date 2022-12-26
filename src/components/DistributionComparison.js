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

  // 62.1% is the national average score (1490/2400)
  // 13.5% is the national average SD (323/2400)

  // Harvard:
  // Mean: 1530 -> 2320 | 96.7% (2320/2400) 
  // 75% Percentile: 1580 -> 2390 | SD: 3.1% (74/2400) | SD inferred using this method: https://stats.stackexchange.com/q/506434
  // 

  // CSULB Fall 2017:
  // Both local and non-local mean and SD are provided here: 
  // https://data.ir.csulb.edu/t/IRA-Public/views/UndergraduateStudents/FTFSATCompAVGandSD?%3Aembed=y&%3AshowAppBanner=false&%3AshowShareOptions=true&%3Adisplay_count=no&%3AshowVizHome=no

const normalizedDistributions = [["CSULB Local", new NormalDistribution(1060, 144),"#FFC61E"],["CSULB Non-local", new NormalDistribution(1159, 143),"#1E57FF"],["Harvard", new NormalDistribution(1530, 74),"#A41034"]]

const data = []

for (let gradePercentage = 400; gradePercentage <= 1600; gradePercentage+=10) {
  
  let datum = {gradePercentage}

  for (const [dataSource, distribution] of normalizedDistributions) {
    datum = {...datum, [`${dataSource} Line`]:distribution.pdf(gradePercentage),[`${dataSource} CDF`]:distribution.cdf(gradePercentage)}
  }

  data.push(datum)
}
console.log(data)

export default function App() {
  const [dataState,setDataState] = useState(data)

  const onGraphHover = (e) => {
  
      for (let i = data.length-1; i >= 0; --i) {
        const newDataState = [...dataState]
      if (i>=e.activeTooltipIndex){
        normalizedDistributions.forEach(([dataSource])=>{newDataState[i][`${dataSource} Fill`] = newDataState[i][`${dataSource} Line`]
      })
    }
      else {
        if (newDataState[i].fill !== newDataState[i].line) {
          break
        }
        normalizedDistributions.forEach(([dataSource])=>{delete newDataState[i][`${dataSource} Fill`]})
      }      
      setDataState(newDataState)

    }

  }
  


  return (
    <AreaChart
      width={500}
      height={400}
      data={dataState}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}

      onMouseMove={onGraphHover}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="gradePercentage" />

      {/* Keep Tooltip here because hovering over the graph somehow crashes when it's not present */}
      <Tooltip />
    {normalizedDistributions.map(([dataSource,_,color])=>[<Area key={`${dataSource} Fill`} dataKey={`${dataSource} Fill`} stroke={color} fill={color} />,
    <Area key={`${dataSource} Line`} dataKey={`${dataSource} Line`} stroke={color} fillOpacity="0" fill={color} />])
}
    </AreaChart>
  );
}
