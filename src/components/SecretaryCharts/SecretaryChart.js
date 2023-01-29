import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import React, {useEffect} from "react"
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {computeSecretarySimulations, DEPENDENT_VARIABLES, SIMULATIONS, STRATEGIES} from "./getData";
import {Typography} from "@material-ui/core";


export default () => {
    const [dependentVariable, setDependentVariable] = React.useState(DEPENDENT_VARIABLES[0])
    const [data,setData] = React.useState(()=>{
        const simulationData = []
        for (let i = 50; i <= 1000; i += 50) {
            simulationData.push({x:i,...computeSecretarySimulations(i)})
        }
        return simulationData
    })

    
    const colors = ["#3969b1", "#da7c30", "#3e9651"]
    const CustomTooltip = ({active, payload, label}) => {
        if (active) {
            return (
                <div style={{
                    padding: "3px 8px",
                    borderRadius: 3,
                    backgroundColor: "#fff",
                    outline:"1px outset black"
                }}>
                    <div>Total Population: {label}</div>
                    {payload.slice(0).reverse().map((pay)=><div style={{color:pay.color}}>{pay.name}: {pay.value.toFixed(2)}</div>)}
                </div>
            )
        }
        return null
    }

    useEffect(() => {
        const _data = []
        for (const dataPoint of data) {
            for (let strategy of STRATEGIES) {
                dataPoint[strategy] = dataPoint[dependentVariable][strategy]
            }
            _data.push(dataPoint)
        }
        setData(_data)
    }, [dependentVariable])


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
                data={data}
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
                <Tooltip content={<CustomTooltip/>}/>
                {STRATEGIES.map((e, i) => <Line type="monotone" dataKey={e} stroke={colors[i]} activeDot={{r: 8}}/>)}
            </LineChart>
            <Typography variant={"caption"}>Average of running the secretary algorithm {SIMULATIONS} times</Typography>
        </div>
    )
}