import { Line, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  console.log(coinTimestamp);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    layout: {
      padding: 20,
    },
    elements: {
      borderJoinStyle: "round",
      point: {
        radius: 1.5,
      },
    },
    plugins: {
      legend: {
        reverse: true,
      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: false,
          text: "Price",
        },
      },
      x: {
        display: true,
        reverse: true,
        title: {
          display: false,
          text: "value",
        },
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold m-3 mb-[-20px]">
          <div className="flex gap-5 items-center flex-wrap">
            <div
              className={
                coinHistory?.data?.change > 0
                  ? "text-bold text-green-500"
                  : "text-bold text-red-500"
              }
            >
              {coinHistory?.data?.change}%
            </div>
            <div className="mt-0 font-black">{coinName} Price Chart</div>
          </div>
        </div>
      </div>
      <Line data={data} options={options} className="" />
    </div>
  );
};

export default LineChart;
