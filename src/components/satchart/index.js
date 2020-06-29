import React from "react"
import PassrateVsBenchmarkChart from "./PassrateVsBenchmarkChart"
import BenchmarkVsTotalpoolChart from "./BenchmarkVsTotalpoolChart"
import { useState } from "react"


export default props => {
  const CHARTS = [<PassrateVsBenchmarkChart/>, <BenchmarkVsTotalpoolChart/>]
  const [chartOption, setChartOption] = useState(0)
  return <div>
    <button onClick={() => setChartOption(1-chartOption)}>Swap to {chartOption == 0 ? "planning" : "review"}</button>
    {CHARTS[chartOption]}
  </div>
}
