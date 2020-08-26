import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import React, {useState} from "react"
import {getCandidate} from "./satData"
import {Typography} from "@material-ui/core";

const SIMULATIONS = 2500
const MAX_CANDIDATE = 100

const getData = (passRate) => {
    let data = []
    const TOTAL_CANDIDATES = SIMULATIONS * MAX_CANDIDATE

    const bestCandidates = []

    // Add 1 to do an extra loop to add the last cutoff candidate to data
    for (let i = 0; i < TOTAL_CANDIDATES + 1; i++) {
        const currentCandidate = Math.random()
        const j = i % SIMULATIONS
        if (i < SIMULATIONS) {
            bestCandidates.push(currentCandidate)
        } else {
            if (j === 0) {
                const sortedCandidates = [...bestCandidates].sort((a, b) => b - a)
                const cutoffCandidate = getCandidate(sortedCandidates[Math.floor(bestCandidates.length * (passRate / 100))])
                data.push({
                    x: Math.floor(i / SIMULATIONS),
                    bestScore: cutoffCandidate.score,
                    percentile: cutoffCandidate.percentile,
                })
            }
            bestCandidates[j] = Math.max(bestCandidates[j], currentCandidate)
        }
    }
    return data

}

const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <div style={{
                padding: "3px 8px",
                borderRadius: 3,
                backgroundColor: "rgba(23, 23, 23, 0.85)",
                color: "white"
            }}>
                <div>Total Pool: {label}</div>
                <div>Best Score: {payload[0].payload.bestScore}</div>
                <div>Percentile: {payload[0].payload.percentile.toFixed(2)}%</div>
            </div>
        )
    }
    return null
}


export default props => {
    let likelinessInput = 50
    const [likelinessToUpdateChart, setLikelinessToUpdateChart] = useState(50)

    const handleSubmit = event => {
        event.preventDefault()
        setLikelinessToUpdateChart(likelinessInput)
    }


    return (
        <div>
            <p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Likeliness (%):
                        <input
                            onChange={event => likelinessInput = event.target.value}
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
                width={props.chartDimension[0]}
                height={props.chartDimension[1]}
                data={getData(likelinessToUpdateChart)}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 40,
                }}
            ><CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={"x"} label={{value: "Total Pool", position: "bottom"}}/>
                <YAxis
                    label={{
                        value: "Best Score",
                        position: "insideLeft", angle: -90, dy: 40,
                    }}
                    domain={[1400, 2400]}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Line type="monotone" dataKey="bestScore" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
            <Typography variant={"caption"}>Best score of varying candidate pool sizes
                of {SIMULATIONS} simulations</Typography>

        </div>
    )
}