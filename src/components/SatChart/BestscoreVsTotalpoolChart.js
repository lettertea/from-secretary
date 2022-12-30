import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import React, {useState} from "react"
import {getCandidate} from "./satData"
import {Typography} from "@material-ui/core";

const TOTAL_POOL = 100

const getData = (likeliness) => {
    const data = []

    for (let n = 1; n <= TOTAL_POOL; n++) {
        const cutoffCandidate = getCandidate(Math.pow(1-(likeliness/100),1/n))
        data.push({x:n,bestScore: cutoffCandidate.score,
            percentile: cutoffCandidate.percentile})

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
                        Possibility (%):
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
                <XAxis dataKey={"x"} label={{value: "Candidates Evaluated", position: "bottom"}}/>
                <YAxis
                    label={{
                        value: "Best Candidate Score",
                        position: "insideLeft", angle: -90, dy: 40,
                    }}
                    domain={[1400, 2400]}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Line type="monotone" dataKey="bestScore" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
            <Typography variant={"caption"}>bestCandidatePercentile = (1 - possibility)^(1/ totalPool)</Typography>

        </div>
    )
}