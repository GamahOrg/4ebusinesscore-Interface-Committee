import React from "react";
import CustomBarChart from "./BarCharts";

const SeventhAccordion = () => {
  const data = {
    labels: [
      "تقرير موازنة عام2021",
      "تقرير تقييم الموظفين",
      "تقرير مؤشر التقييم",
      "تقرير عن المنتجات",
      "تقرير بيان الانضباط",
    ],
    datasets: [
      {
        label: "",
        data: [12, 19, 5, 2, 3],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
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

export default SeventhAccordion;
