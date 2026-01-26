import React from "react";
import CustomLineChart from "./LineCharts";

const FourthAccordion = () => {
  const data = {
    labels: [
      "سعود القحطاني",
      "خالد السديري",
      "فهد عبدالعزيز",
      "عبدالله ابراهيم",
    ],
    datasets: [
      {
        label: "",
        data: [40, 50, 70, 65, 50],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  return <CustomLineChart chartData={data} />;
};

export default FourthAccordion;
