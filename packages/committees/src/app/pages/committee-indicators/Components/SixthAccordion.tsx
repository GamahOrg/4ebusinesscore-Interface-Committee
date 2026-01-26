import React from "react";
import CustomLineChart from "./LineCharts";
import { useIntl } from "react-intl";

const ViewsStatistics = () => {
  const intl = useIntl();
  const data = {
    labels: [
      intl.formatMessage({ id: "ReportsAndIndicators" }),
      intl.formatMessage({ id: "TaskIndicators" }),
      intl.formatMessage({ id: "TechnicalSupportReports" }),
      intl.formatMessage({ id: "CommitteeReports" }),
    ],
    datasets: [
      {
        label: "",
        data: [80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  return <CustomLineChart chartData={data} />;
};

export default ViewsStatistics;
