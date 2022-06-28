import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Rings height="100" width="100" color="#33BFC2" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
