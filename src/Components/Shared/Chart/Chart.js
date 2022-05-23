import "./Chart.css";
import numeral from "numeral";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       // text: "Chart.js Line Chart",
//     },
//   },
// };

function Chart({ heading, data, unit }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: unit,
          color: "#000",
          font: {
            family: "Nunito sans-serif",
            size: 14,
            style: "normal",
            lineHeight: 1.2,
            weight: "bold",
          },
          padding: { top: 30, left: 0, right: 0, bottom: 0 },
        },
      },
    },
  };
  const labels = data?.map((obj) => obj.date);
  const graphData = {
    labels,
    datasets: [
      {
        label: "",
        data: data?.map((obj) => obj.value),
        backgroundColor: "rgba(204, 16, 52, 0.5)",
        borderColor: "#CC1034",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chart-heading">{heading}</h2>

      <div className="graph-container">
        {/* <Line options={options} data={graphData} /> */}

        {data?.length > 0 && <Line data={graphData} options={options} />}
      </div>
    </div>
  );
}

export default Chart;
