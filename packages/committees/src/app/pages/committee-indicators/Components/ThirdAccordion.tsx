import React from "react";
import CustomBarChart from "./BarCharts";

const ThirdAccordion = () => {
  const data = {
    labels: ["الكتاب الأول", "الكتاب الثاني", "الكتاب الثالث", "الكتاب الرابع"],
    datasets: [
      {
        label: "",
        data: [11, 13, 15, 10, 12],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <CustomBarChart chartData={data} />;
};

export default ThirdAccordion;
