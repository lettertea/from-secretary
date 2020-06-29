import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import React, { useState } from "react"
import { getCandidate } from "./satData"

const getData = (totalCandidates) => {
  let data = []
  const SIMULATIONS = 2500

  for (let benchmarkScore = 1400; benchmarkScore <= 2400; benchmarkScore += 20) {
    let passedThreshold = 0
    for (let _ = 0; _ < SIMULATIONS; _++) {
      const candidatesPercentages = []
      for (let i = 0; i < totalCandidates; i++) {
        candidatesPercentages.push(Math.random())
      }
      const bestCandidate = getCandidate(Math.max(...candidatesPercentages))
      if (bestCandidate.score >= benchmarkScore) {
        ++passedThreshold
      }
    }
    const passRate = 100 * passedThreshold / SIMULATIONS
    data.push({
      x: benchmarkScore,
      passRate: passRate
    })
  }
  return data
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div style={{ padding: "3px 8px", borderRadius: 3, backgroundColor: "rgba(23, 23, 23, 0.85)", color: "white" }}>
        <div>Benchmark Score: {label}</div>
        <div>{`Pass Rate: ${(payload[0].payload.passRate).toFixed(2)}%`}</div>
      </div>
    )
  }

  return null
}


export default props => {
  let totalCandidatesInput
  const [totalCandidates, setTotalCandidates] = useState(20);

  const handleSubmit = event => {
    event.preventDefault()
    setTotalCandidates(totalCandidatesInput)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Total Candidates:
          <input
            onChange={event => totalCandidatesInput = event.target.value}
            placeholder={50}
            type="number"
            min="1"
            max="99"
          />
        </label>
        <input type="submit" value="Submit"/>
      </form>


      <LineChart
        width={600}
        height={400}
        data={getData(totalCandidates)}
        margin={{
          top: 5, right: 30, left: 20, bottom: 40,
        }}
      ><CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={"x"} label={{ value: "Benchmark Score", position: "bottom" }}/>
        <YAxis
          label={{
            value: "Pass Rate (%)",
            angle: -90,
            textAnchor: "middle",
          }}/>
        <Tooltip content={<CustomTooltip/>}/>
        <Line type="monotone" dataKey="passRate" stroke="#8884d8" activeDot={{ r: 8 }}/>
      </LineChart>
    </div>
  )
}