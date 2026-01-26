import React from "react";
import CustomLineChart from "./LineCharts";

const FifthAccordion = () => {
  const data = {
    labels: ["أرشيف 1", "أرشيف 2", "أرشيف 3", "أرشيف 4"],
    datasets: [
      {
        label: "",
        data: [40, 50, 70, 55, 60],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  return <CustomLineChart chartData={data} />;
};

export default FifthAccordion;
