import React from "react"
import PassrateVsBenchmarkChart from "./PassrateVsBenchmarkChart"
import BenchmarkVsTotalpoolChart from "./BenchmarkVsTotalpoolChart"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default props => {
  const [value, setValue] = React.useState(0);
  const CHARTS = [<PassrateVsBenchmarkChart/>, <BenchmarkVsTotalpoolChart/>]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <div>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" style={{marginBottom:20}}
              textColor="primary">
          <Tab label="Review" {...a11yProps(0)} />
          <Tab label="Plan" {...a11yProps(1)} />
        </Tabs>
    </div>

      {CHARTS[value]}
  </div>
);
}

