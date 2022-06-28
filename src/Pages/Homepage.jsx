import CryptoList from "../Components/CryptoList";
import Dashboard from "../Components/Dashboard";
import News from "../Components/News";

const Homepage = () => {
  return (
    <div className="pt-0 lg:pt-9 px-0 pb-20 flex-1 z-0 transition-all bg-transparent lg:ml-[220px]">
      <div className="subtle-bg"></div>
      <Dashboard />
      <CryptoList simplified />
      <News simplified />
    </div>
  );
};

export default Homepage;
