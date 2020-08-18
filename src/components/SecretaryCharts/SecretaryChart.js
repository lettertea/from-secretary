import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import React, {useState} from "react"
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {computeSecretarySimulations, independentVariables, strategies} from "./getData";

const getData = (independentVariable,dependentVariable) => {

    const data = [];
    for (let i = 2; i < 25; i++) {
        const secretarySimulationData = computeSecretarySimulations("Total Pool (N)",i)
        data.push({
            x: i,
            y: secretarySimulationData["Average Percentile (%)"]["1/e"]
        })
    }
    return data;
}

export default () => {
    const [totalCandidates, setTotalCandidates] = useState(50)
    const [independentVariable, setIndependentVariable] = React.useState("")
    const [dependentVariable, setDependentVariable] = React.useState("")


    const CustomTooltip = ({active, payload, label}) => {
        if (active) {
            return (
                <div style={{
                    padding: "3px 8px",
                    borderRadius: 3,
                    backgroundColor: "rgba(23, 23, 23, 0.85)",
                    color: "white"
                }}>
                    <div>Total Pool: {payload[0].payload.x}</div>
                    <div>Percentile: {payload[0].payload.y.toFixed(2)}%</div>
                </div>
            )
        }
        return null
    }


    return (
        <div>
            <FormControl style={{minWidth: 120}}>
                <InputLabel>Independent Variable (X Axis)</InputLabel>
                <Select
                    native
                    value={independentVariable}
                    onChange={(e) => setIndependentVariable(e.target.value)}
                >
                    {independentVariables.map((e, i) => <option value={e}>{e}</option>)}
                </Select>
            </FormControl>

            <FormControl style={{minWidth: 120}}>
                <InputLabel>Dependent Variable (Y Axis)</InputLabel>
                <Select
                    native
                    value={independentVariable}
                    onChange={(e) => setDependentVariable(e.target.value)}
                >
                    {independentVariables.map((e, i) => <option value={e}>{e}</option>)}
                </Select>
            </FormControl>


            <LineChart
                width={800}
                height={500}
                data={getData(independentVariable,dependentVariable)}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 40,
                }}
            ><CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={"x"} label={{value: "Total Population (N)", position: "bottom"}}/>
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