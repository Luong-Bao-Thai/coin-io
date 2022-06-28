import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="lg:flex-row flex flex-col w-full min-w-full overflow-x-auto relative text-white bg-trasparent isolate">
      <Navbar />
      <Homepage />
    </div>
  );
}

export default App;
