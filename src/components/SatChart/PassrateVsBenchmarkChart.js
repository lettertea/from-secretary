import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import React, { useState } from "react"
import { getCandidate } from "./satData"
import {Typography} from "@material-ui/core";

const SIMULATIONS = 5000

const getData = (totalCandidates) => {
  let data = []
  const bestCandidates = []

  for (let _ = 0; _ < SIMULATIONS; _++) {
    const candidatesPercentages = []
    for (let i = 0; i < totalCandidates; i++) {
      candidatesPercentages.push(Math.random())
    }
    const bestCandidate = getCandidate(Math.max(...candidatesPercentages))
    bestCandidates.push(bestCandidate)
  }
  bestCandidates.sort((a, b) => a.score - b.score)
  let i = 0
  for (let benchmarkScore = 1400; benchmarkScore <= 2400; benchmarkScore += 20) {
    while (i < bestCandidates.length && bestCandidates[i].score < benchmarkScore) {
      ++i
    }

    data.push({
      x: benchmarkScore,
      passRate: (1 - (i + 1) / bestCandidates.length) * 100,
      percentile: bestCandidates[i].percentile,
    })
  }
  return data
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div style={{
        padding: "3px 8px",
        width: 250,
        borderRadius: 3,
        backgroundColor: "rgba(23, 23, 23, 0.85)",
        color: "white",
      }}>
        <div>{(payload[0].payload.passRate).toFixed(2)}% chance the best candidate
          scored {label} ({payload[0].payload.percentile.toFixed(1)} percentile) or greater
        </div>
      </div>
    )
  }

  return null
}


export default props => {
  let totalCandidatesInput
  const [totalCandidates, setTotalCandidates] = useState(50)

  const handleSubmit = event => {
    event.preventDefault()
    setTotalCandidates(totalCandidatesInput)
  }
  return (
    <div>
      <p>
      <form onSubmit={handleSubmit}>
        <label>
          Total Candidates:
          <input
            onChange={event => totalCandidatesInput = event.target.value}
            placeholder={50}
            type="number"
            min="1"
            max="999"
          />
        </label>
        <input type="submit" value="Submit"/>
      </form>
      </p>

      <LineChart
        width={props.chartDimension[0]}
        height={props.chartDimension[1]}
        data={getData(totalCandidates)}
        margin={{
          top: 5, right: 30, left: 20, bottom: 40,
        }}
      ><CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={"x"} label={{ value: "Benchmark Score", position: "bottom" }}/>
        <YAxis
          label={{
            value: "Likeliness (%)",
            position: "insideLeft", angle: -90, dy: 40,
          }}/>
        <Tooltip content={<CustomTooltip/>}/>
        <Line type="monotone" dataKey="passRate" stroke="#8884d8" activeDot={{ r: 8 }}/>
      </LineChart>
        <Typography variant={"caption"}>Likeliness the best candidate will score equal to or better than particular benchmark scores after {SIMULATIONS} simulations</Typography>
    </div>
  )
}