import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Loader from "./Loader";

const CryptoList = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Crypto Market",
    count: 3,
  });
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const cryptoChange = cryptoList?.data?.coins;

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm, cryptoChange]);

  if (isFetching) return <Loader />;
  // console.log(cryptoNews);

  return (
    <div className="flex flex-col gap-7 max-w-[90rem] w-full mt-0 mx-auto pt-0 lg:px-8 pb-8 text-stone-800 py-0 px-3">
      <div className="flex flex-col relative">
        <div className="hidden lg:flex items-center shadow-sm bg-white rounded-t-xl">
          <div className="pl-4 text-xl font-bold italic">News</div>
          <div className="flex items-center p-4 m-0">
            <Marquee pauseOnHover={true} gradient={false} speed={60} number={5}>
              {cryptoNews?.value?.map((news) => (
                <a href={news.url} key={news.name} className="pr-1 font-medium">
                  {""}
                  {news.name} | {""}
                </a>
              ))}
            </Marquee>
          </div>
        </div>
        <input
          placeholder="Search Cryptocurrencies..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pt-8 lg:pt-4 px-4 pb-[14px] border-none outline-none text-stone-800 text-base m-0 bg-white/60 dash-shadow"
          style={{
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        />
        <div className="absolute bottom-[12px] right-4">
          <span className="material-symbols-outlined">search</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between flex-col md:flex-row">
          <h1 className="text-xl md:text-2xl font-bold mb-2 lg:mb-4">
            {`Top ${
              simplified ? "12" : "100"
            } Cryptocurrency Prices by Market Cap`}
          </h1>
          {simplified && (
            <Link
              to="/cryptos"
              className="text-base md:text-lg font-bold mb-4 text-blue-500 hover:underline"
            >
              See more
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 auto-rows-fr">
          {cryptos?.map((currency) => (
            <Link
              to={`/cryptos/${currency.uuid}`}
              key={currency.uuid}
              className={`${
                currency.change > 0
                  ? `overflow-hidden px-4 py-5 bg-green-300/20 rounded-lg transition-all hover:bg-green-200/20`
                  : `overflow-hidden px-4 py-5 bg-red-300/20 rounded-lg transition-all hover:bg-red-200/20`
              }`}
            >
              <div className="flex justify-between h-1/2">
                <div className="flex flex-col">
                  <img
                    src={currency.iconUrl}
                    alt={`${currency.name} icon`}
                    className="h-9 w-9 mb-2"
                  />
                  <div className="flex flex-col">
                    <span className="m-0 text-lg font-medium leading-6">
                      {currency.name}
                    </span>
                    <span className="m-0 text-sm font-normal leading-5">
                      #{currency.rank} {currency.symbol}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h6 className="font-bold text-2xl leading-8">
                    ${" "}
                    {millify(currency.price, {
                      precision: 3,
                    })}
                  </h6>
                  <div
                    className={`${
                      currency.change > 0
                        ? "rounded py-[2px] px-[13px] mt-2 bg-green-500 font-bold text-lg text-white"
                        : "rounded py-[2px] px-[13px] mt-2 bg-red-500 font-bold text-lg text-white"
                    }`}
                  >
                    {currency.change}%
                  </div>
                </div>
              </div>
              <div className="h-1/2 pt-6 mb-[-10px]">
                <p className=" text-base font-bold">
                  Market Cap: $ {millify(currency.marketCap, { precision: 2 })}
                </p>
                <p className=" text-base font-bold">
                  24h Volume: ${" "}
                  {millify(currency["24hVolume"], { precision: 2 })}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {!simplified && (
          <div className="flex justify-center items-center flex-col w-full pt-4 md:hidden">
            <p>You scrolled all ther way down here? Wow!</p>
            <a href="#top" className="mt-2 font-bold text-blue-500">
              Going up!
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoList;
