import { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "./Loader";
// import Select from "react-select";

const demoImage =
  "https://img.freepik.com/free-photo/3d-rendering-bitcoin-other-crypto-currencies-led-glow-dark-glossy-glass-board-with-blockchain-data-dots-lines_163855-4.jpg?w=2000";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Crypto Market");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 100,
  });
  if (!cryptoNews?.value) return <Loader />;
  // console.log(cryptoNews);

  return (
    <div className="flex flex-col max-w-[90rem] w-full mt-0 mx-auto pt-3 lg:pt-0 lg:px-8 pb-7 text-stone-800 py-0 px-3">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">News & Articles</h1>
        {simplified && (
          <Link
            to="/news"
            className="text-lg font-bold text-blue-500 hover:underline"
          >
            See more
          </Link>
        )}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
        {cryptoNews.value.map((news) => (
          <div
            className="px-4 py-5 bg-sky-200/20 rounded-lg transition-all hover:bg-sky-300/20 min-h-[300px]"
            key={news.name}
          >
            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              className=" flex flex-col justify-between h-full"
            >
              <div className="flex justify-between hover:underline gap-3">
                <h2 className="w-2/3 font-semibold text-base lg:text-xl">
                  {news.name}
                </h2>
                <div className="object-contain w-28 h-28">
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                </div>
              </div>
              <p className="my-3 text-sm lg:text-base">
                {news.description.length > 40
                  ? `${news.description.substring(0, 200)}...`
                  : news.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center">
                  <img
                    className="w-6 h-6 lg:w-10 lg:h-10 rounded-full object-cover"
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="Provider"
                  />
                  <h3 className="ml-2 flex justify-center items-center font-bold text-sm lg:text-base">
                    {news.provider[0]?.name}
                  </h3>
                </div>
                <div className="flex justify-center items-center italic text-xs lg:text-sm">
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
