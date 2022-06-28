import Navbar from "../Components/Navbar";
import CryptoList from "../Components/CryptoList";

const Crypto = () => {
  return (
    <div className="lg:flex-row flex flex-col w-full min-w-full overflow-x-auto relative text-white bg-trasparent isolate">
      <div className="lg:pt-9 px-0 pb-20 flex-1 z-0 transition-all bg-transparent lg:ml-[220px]">
        <Navbar />
        <CryptoList />
      </div>
    </div>
  );
};

export default Crypto;
