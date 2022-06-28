import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { useState } from "react";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  ThunderboltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Select from "react-select";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import Navbar from "../Components/Navbar";
import LineChart from "../Components/LineChart";
import LineChartMobile from "../Components/LineChartMobile";
import Loader from "../Components/Loader";

const CryptoDetailsPage = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = [
    { value: "3h", label: "3h" },
    { value: "24h", label: "24h" },
    { value: "7d", label: "7d" },
    { value: "30d", label: "30d" },
    { value: "3m", label: "3m" },
    { value: "1y", label: "1y" },
    { value: "3y", label: "3y" },
    { value: "5y", label: "5y" },
  ];

  const stats = [
    { title: "Tier", value: cryptoDetails?.tier, icon: <StarOutlined /> },
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className="lg:flex-row flex flex-col w-full min-w-full  relative bg-trasparent isolate">
      <Navbar />
      <div className="subtle-bg"></div>
      <div className="pt-4 md:pt-9 px-0 pb-20 flex-1 z-0 transition-all bg-transparent lg:ml-[220px]">
        <div className="mx-auto max-w-[90rem] lg:px-8">
          <div className="grid grid-col-1 lg:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/60 dash-shadow rounded-xl flex flex-col p-4 justify-between md:items-center lg:items-start">
              <div className="mb-3">
                <p className="bg-slate-300/40 px-[0.5rem] py-1 items-center inline-flex text-left rounded-md font-bold">
                  Rank #{cryptoDetails.rank}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={cryptoDetails.iconUrl}
                  alt="Crypto-icon"
                  className="w-20 h-20"
                />
                <div className="flex flex-col">
                  <h2 className="text-3xl font-extrabold">
                    {cryptoDetails.name} ({cryptoDetails.symbol})
                  </h2>
                  {cryptoDetails.change > 0 ? (
                    <div className="flex items-center text-green-500">
                      <h3 className="text-3xl font-bold mr-2">
                        {cryptoDetails.change}%
                      </h3>
                      <span className="material-symbols-outlined text-3xl">
                        trending_up
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <h3 className="text-3xl font-bold mr-2">
                        {cryptoDetails.change}%
                      </h3>
                      <span className="material-symbols-outlined text-3xl">
                        trending_down
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-end">
                <h1 className="text-[36px] md:text-[48px] font-bold pb-[6px] pr-1">
                  $
                </h1>
                <h1 className="text-[48px] md:text-[64px] font-black">
                  {Number(cryptoDetails.price).toLocaleString()}
                </h1>
              </div>
              <h3 className="text-3xl text-black/50 font-base mr-2">
                {parseFloat(cryptoDetails.btcPrice).toFixed(7)} BTC
              </h3>
            </div>
            <div className="bg-white/60 mb-5 p-0 pt-5 md:p-5 h-auto rounded-xl dash-shadow-border lg:hidden">
              <div className="h-1/2">
                <Select
                  className="w-1/2 md:w-1/3 pl-3"
                  options={time}
                  placeholder={"24 hour"}
                  onChange={(value) => setTimePeriod(value.value)}
                />
                <LineChartMobile
                  coinHistory={coinHistory}
                  currentPrice={millify(cryptoDetails.price)}
                  coinName={cryptoDetails.name}
                />
              </div>
            </div>
            <div className="bg-white/60 dash-shadow rounded-xl md:hidden lg:block">
              {stats.map(({ icon, title, value, index }) => (
                <div
                  key={index}
                  className="flex justify-between border-b p-5 text-base opacity-90"
                >
                  <div className="flex gap-[10px] font-base">
                    <p className="flex items-center">{icon}</p>
                    <p>{title}</p>
                  </div>
                  <div className="font-semibold">{value}</div>
                </div>
              ))}
            </div>
            <div className="bg-white/60 dash-shadow rounded-xl md:hidden lg:block">
              {genericStats.map(({ icon, title, value, index }) => (
                <div
                  key={index}
                  className="flex justify-between border-b p-5 text-base opacity-90"
                >
                  <div className="flex gap-[10px] font-base">
                    <p className="flex items-center">{icon}</p>
                    <p>{title}</p>
                  </div>
                  <div className="font-semibold">{value}</div>
                </div>
              ))}
            </div>
            {/* mobile */}
            <div className="hidden md:grid lg:hidden md:grid-cols-2 w-full">
              <div className="bg-white/60 dash-shadow rounded-xl">
                {stats.map(({ icon, title, value, index }) => (
                  <div
                    key={index}
                    className="flex justify-between border-b py-5 px-10 text-base opacity-90"
                  >
                    <div className="flex gap-[10px] font-base">
                      <p className="flex items-center">{icon}</p>
                      <p>{title}</p>
                    </div>
                    <div className="font-semibold">{value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white/60 dash-shadow rounded-xl">
                {genericStats.map(({ icon, title, value, index }) => (
                  <div
                    key={index}
                    className="flex justify-between border-b py-5 px-10 text-base opacity-90"
                  >
                    <div className="flex gap-[10px] font-base">
                      <p className="flex items-center">{icon}</p>
                      <p>{title}</p>
                    </div>
                    <div className="font-semibold">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white/60 mb-5 p-5 h-auto rounded-xl dash-shadow-border hidden lg:block">
            <div className="h-1/2">
              <Select
                className="w-1/3 pl-3"
                options={time}
                placeholder={"24 hour"}
                onChange={(value) => setTimePeriod(value.value)}
              />
              <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(cryptoDetails.price)}
                coinName={cryptoDetails.name}
              />
            </div>
          </div>
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-5">
              <div className="coin-desc-link col-span-2 p-4 lg:p-0">
                <div>{HTMLReactParser(cryptoDetails.description)}</div>
              </div>
              <div className="p-4 md:pl-0 lg:p-4 col-span-1">
                {cryptoDetails.links.map((link, index) => (
                  <div
                    className="flex justify-between items-center border-b p-5"
                    key={index}
                  >
                    <div className="uppercase text-base">{link.type}</div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-blue-500"
                    >
                      {link.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailsPage;
