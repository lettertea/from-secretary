import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import React, {useEffect} from "react"
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {computeSecretarySimulations, DEPENDENT_VARIABLES, SIMULATIONS, STRATEGIES} from "./getData";
import {Typography} from "@material-ui/core";


const getData = (secretarySimulationData, dependentVariable) => {
    const data = [];
    for (let i = 2; i < 100; i++) {
        const secretarySimulationData = computeSecretarySimulations(i)
        const dataPoint = {x: i}
        for (let strategy of STRATEGIES) {
            dataPoint[strategy] = secretarySimulationData[dependentVariable][strategy]
        }
        data.push(dataPoint)
    }
    return data;
}


export default () => {
    const [dependentVariable, setDependentVariable] = React.useState(DEPENDENT_VARIABLES[0])
    const secretarySimulationData = []

    const colors = ["#3969b1", "#da7c30", "#3e9651"]


    useEffect(() => {
        for (let i = 2; i < 100; i++) {
            secretarySimulationData.push({
                x: i,
                data: computeSecretarySimulations(i)
            })
        }
    }, [])

    return (
        <div>
            <FormControl style={{minWidth: 120, marginBottom: 10}}>
                <InputLabel>Dependent Variable</InputLabel>
                <Select
                    native
                    value={dependentVariable}
                    onChange={(e) => setDependentVariable(e.target.value)}
                >
                    {DEPENDENT_VARIABLES.map((e, i) => <option value={e}>{e}</option>)}
                </Select>
            </FormControl>
            <LineChart
                width={800}
                height={500}
                data={getData(secretarySimulationData, dependentVariable)}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 40,
                }}
            ><CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={"x"} label={{value: "Total Population (N)", position: "bottom"}} interval={4}/>
                <YAxis
                    allowDecimals={false}
                    label={{
                        value: dependentVariable,
                        position: "insideLeft", angle: -90, dy: 40,
                    }}
                />
                <Tooltip />
                {STRATEGIES.map((e, i) => <Line type="monotone" dataKey={e} stroke={colors[i]} activeDot={{r: 8}}/>)}
            </LineChart>
            <Typography variant={"caption"}>Average of running the secretary algorithm {SIMULATIONS} times</Typography>
        </div>
    )
}