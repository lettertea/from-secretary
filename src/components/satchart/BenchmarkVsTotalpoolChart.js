import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import React, { useState } from "react"
import { getCandidate } from "./satData"

const getData = (passRate) => {
  let data = []
  const SIMULATIONS = 2500

  for (let totalPool = 1; totalPool <= 50; ++totalPool) {
    const bestCandidates = []
    for (let _ = 0; _ < SIMULATIONS; _++) {
      const candidatesPercentages = []
      for (let i = 0; i < totalPool; i++) {
        candidatesPercentages.push(Math.random())
      }
      bestCandidates.push(getCandidate(Math.max(...candidatesPercentages)))
    }
    bestCandidates.sort((a, b) => b.score - a.score)
    const cutoffCandidate =  bestCandidates[Math.floor(bestCandidates.length * (passRate / 100))];
    data.push({
      x: totalPool,
      benchmark: cutoffCandidate.score,
      percentile: cutoffCandidate.percentile
    })
  }
  return data
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div style={{ padding: "3px 8px", borderRadius: 3, backgroundColor: "rgba(23, 23, 23, 0.85)", color: "white" }}>
        <div>Total Pool: {label}</div>
        <div>Benchmark Score: {payload[0].payload.benchmark}</div>
        <div>Percentile: {payload[0].payload.percentile.toFixed(2)}%</div>
      </div>
    )
  }
  return null
}


export default props => {
  let passrateInput = 50
  const [passrateToUpdateChart, setPassrateToUpdateChart] = useState(50)

  const handleSubmit = event => {
    event.preventDefault()
    setPassrateToUpdateChart(passrateInput)
  }


  return (
    <div>
      <p>
        <form onSubmit={handleSubmit}>
          <label>
            Pass Rate (%):
            <input
              onChange={event => passrateInput = event.target.value}
              placeholder={50}
              type="number"
              min="1"
              max="99"
            />
          </label>
          <input type="submit" value="Submit"/>
        </form>


      </p>

      <LineChart
        width={600}
        height={400}
        data={getData(passrateToUpdateChart)}
        margin={{
          top: 5, right: 30, left: 20, bottom: 40,
        }}
      ><CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={"x"} label={{ value: "Total Pool", position: "bottom" }}/>
        <YAxis
          label={{
            value: "Benchmark Score",
            position: "insideLeft", angle: -90, dy: 40,
          }}/>
        <Tooltip content={<CustomTooltip/>}/>
        <Line type="monotone" dataKey="benchmark" stroke="#8884d8" activeDot={{ r: 8 }}/>
      </LineChart>
    </div>
  )
}