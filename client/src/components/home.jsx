import React from "react";
import Drawer from "./Drawer";
import Chart from "./Chart";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Deposits from "./Deposits";
import Title from "./Title";

export default function Home() {
  return (
    <div>
      <Title />
      <Dashboard />
      <Chart />
    </div>
  );
}
