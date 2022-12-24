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

const averageDistribution = new NormalDistribution(621, 135);
const betterDistribution = new NormalDistribution(967, 31);

const data = []

for (let gradePercentage = 20; gradePercentage < 101; gradePercentage++) {
  const datum = {gradePercentage,
    line:averageDistribution.pdf(gradePercentage*10),
    lineCdf:averageDistribution.cdf(gradePercentage*10),
    otherLine:betterDistribution.pdf(gradePercentage*10),
    otherLineCdf:betterDistribution.cdf(gradePercentage*10)}
  data.push(datum)
}
console.log(data)

export default function App() {
  const [dataState,setDataState] = useState(data)

  const renderTooltip = (props) => {
    if (props.active) {
      return (
        <div >
          <div className="tool-tip">
 
            <span className="tool-tip-footer">
              {' '}
             <a href="SOME_VALUE_FROM_PROPS">Google</a>
           </span>
 
       </div>
 
     </div>
   );
 }
};

  const onGraphHover = (e) => {
  
      for (let i = data.length-1; i >= 0; --i) {
        const newDataState = [...dataState]
      if (i>=e.activeTooltipIndex){
      newDataState[i].fill = newDataState[i].line
      newDataState[i].otherFill = newDataState[i].otherLine

    }
      else {
        if (newDataState[i].fill !== newDataState[i].line) {
          break
        }
        delete newDataState[i].fill
        delete newDataState[i].otherFill
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
      <YAxis />
      <Tooltip  content={(value)=>renderTooltip(value)} style={'pointer-events: auto'}  trigger='click' />
      <Area dataKey="fill" stroke="#8884d8" fill="#8884d8" />
      <Area dataKey="line" stroke="#8884d8" fillOpacity="0" fill="#8884d8" />
      
      <Area dataKey="otherFill" stroke="#82ca9d" fill="#82ca9d" />
      <Area dataKey="otherLine" stroke="#82ca9d" fillOpacity="0" fill="#82ca9d" />

    </AreaChart>
  );
}
