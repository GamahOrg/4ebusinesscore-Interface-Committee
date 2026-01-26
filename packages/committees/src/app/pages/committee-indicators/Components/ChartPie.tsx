import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useIntl } from "react-intl";

const ChartPie = () => {
  const intl = useIntl();

  const data = {
    labels: [
      intl.formatMessage({ id: "FahdAbdulaziz" }),
      intl.formatMessage({ id: "AbdullahIbrahim" }),
    ],
    datasets: [
      {
        data: [300, 200],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    width: 400,
    height: 400,
  };
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ChartPie;
