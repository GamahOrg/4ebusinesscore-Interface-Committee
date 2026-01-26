import React from 'react';
import { Bar } from 'react-chartjs-2';

const CustomBarChart = ({ chartData }) => {
  const options = {
    plugins: {
      legend: {
        display: false, // Hides the label
      },
    },
  };
  return (
    <div>
      <Bar data={chartData} options={options}/>
    </div>
  );
};

export default CustomBarChart;
