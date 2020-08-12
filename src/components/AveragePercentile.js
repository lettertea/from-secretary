import {Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import React, {useState} from "react"


const getData = (totalCandidates) => {
    const data = [];
    for (let i = 0; i < Math.min(totalCandidates,50); i++) {
        data.push({
            x: i + 1,
            y: 100 * ((totalCandidates - i) / (totalCandidates + 1))
        })
    }
    return data;
}

export default () => {
    const [totalCandidates, setTotalCandidates] = useState(50)

    const CustomTooltip = ({active, payload, label}) => {
        if (active) {
            return (
                <div style={{
                    padding: "3px 8px",
                    borderRadius: 3,
                    backgroundColor: "rgba(23, 23, 23, 0.85)",
                    color: "white"
                }}>
                    <div>Sample Population (N): {totalCandidates}</div>
                    <div>Candidate Rank: {payload[0].payload.x}</div>
                    <div>Percentile: {payload[0].payload.y.toFixed(2)}%</div>
                </div>
            )
        }
        return null
    }


    return (
        <div>
            <p>
                <label>
                    Sample Population (N):
                    <input
                        onChange={event => setTotalCandidates(event.target.valueAsNumber)}
                        value={totalCandidates}
                        type="number"
                        min="1"
                        max="1000000"
                    />
                </label>
            </p>


            <LineChart
                width={800}
                height={500}
                data={getData(totalCandidates)}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 40,
                }}
            ><CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={"x"} label={{value: "Candidate Rank", position: "bottom"}}/>
                <YAxis
                    allowDecimals={false}
                    label={{
                        value: "Percentile",
                        position: "insideLeft", angle: -90, dy: 40,
                    }}
                />
                <Tooltip content={<CustomTooltip/>}/>
                <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </div>
    )
}