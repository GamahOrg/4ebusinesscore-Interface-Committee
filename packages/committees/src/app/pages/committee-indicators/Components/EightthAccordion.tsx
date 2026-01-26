import React from "react";
import CustomLineChart from "./LineCharts";

const TopRatingStatistics = () => {
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
        data: [30, 40, 50, 60, 55],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return <CustomLineChart  />;
};

export default TopRatingStatistics;
