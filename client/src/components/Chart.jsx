import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";

import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00"),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          flexGrow: 1,
          overflow: "hidden",
          backgroundColor: "#000000",
          border: "1px solid #000000",
        }}
      >
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: 2,
              tickLabelStyle: { fill: "#FFFFFF" }, // Set x-axis label text color to white
              labelStyle: { fill: "#FFFFFF" }, // Set x-axis label text color to white
            },
          ]}
          yAxis={[
            {
              label: "Sales ($)",
              labelStyle: {
                ...theme.typography.body1,
                fill: "#FFFFFF", // Set y-axis label text color to white
              },
              tickLabelStyle: { fill: "#FFFFFF" }, // Set y-axis tick label text color to white
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: "amount",
              showMark: false,
              color: "#FFFFFF", // Set data color to white
            },
          ]}
          sx={{
            border: "1px solid #000000", // Set outline color of the LineChart to black
            [`.${axisClasses.root} line`]: {
              stroke: "#FFFFFF", // Set axis line color to white
            },
            [`.${axisClasses.root} text`]: {
              fill: "#FFFFFF", // Set axis label text color to white
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
