import React from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import Loader from "./Loader";

const findAverageChange = (arr) => {
  const { length } = arr;
  return arr.reduce((acc, val) => {
    return acc + val.change / length;
  }, 0);
};

const Dashboard = () => {
  const { data, isFetching } = useGetCryptosQuery(100);
  const globalStats = data?.data?.stats;

  // console.log(data);

  if (isFetching) return <Loader />;

  return (
    <div className="flex flex-col gap-7 max-w-[90rem] w-full mt-0 mx-auto pt-0 lg:px-8 pb-7 text-stone-800 py-0 md:pt-7 lg:pt-0 px-3">
      <div className="max-w-[90rem] flex items-center bg-transparent">
        <div className="flex-1 mx-auto py-0">
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:gap-4">
            <li className="bg-white/60 lg:rounded-lg py-6 px-8 dash-shadow">
              <h1 className="m-0 min-w-0 font-medium text-base">Total Coins</h1>
              <p className="mt-[10px] font-bold text-2xl lg:text-4xl text-sky-400">
                {globalStats.total}
              </p>
            </li>
            <li className="col-span-2 bg-white/60 lg:rounded-lg py-6 px-8 dash-shadow">
              <h1 className="m-0 min-w-0 font-medium text-base">
                Total Market Cap
              </h1>
              <p className="mt-[10px] font-bold text-2xl lg:text-4xl text-orange-400">
                $ {Number(globalStats.totalMarketCap).toLocaleString()}
              </p>
            </li>
            <li className="col-span-2 bg-white/60 lg:rounded-lg py-6 px-8 dash-shadow">
              <h1 className="m-0 min-w-0 font-medium text-base">
                Total 24h Volume
              </h1>
              <p className="mt-[10px] font-bold text-2xl lg:text-4xl text-teal-500">
                $ {Number(globalStats.total24hVolume).toLocaleString()}
              </p>
            </li>
            <li className="bg-white/60 lg:rounded-lg py-6 px-8 dash-shadow">
              <h1 className="m-0 min-w-0 font-medium text-base">
                Top 100 Average 24h Change (%)
              </h1>
              <p
                className={`${
                  Math.floor(findAverageChange(data?.data?.coins)) < 0
                    ? "negative text-2xl lg:text-4xl"
                    : "positive text-2xl lg:text-4xl"
                }`}
              >
                {millify(findAverageChange(data?.data?.coins), {
                  precision: 2,
                })}
                %
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
