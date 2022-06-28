import React from "react";
import Navbar from "../Components/Navbar";
import News from "../Components/News";

const NewsPage = () => {
  return (
    <div className="lg:flex-row flex flex-col w-full min-w-full overflow-x-auto relative text-white bg-trasparent isolate">
      <div className="lg:pt-9 px-0 pb-20 flex-1 z-0 transition-all bg-transparent lg:ml-[220px]">
        <Navbar />
        <News />
      </div>
    </div>
  );
};

export default NewsPage;
