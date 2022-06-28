import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GithubOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-w-[220px] text-white flex flex-col gap-5 z-1 p-4 lg:px-6 lg:py-6 lg:top-0 lg:bottom-0 lg:left-0 lg:h-screen lg:fixed nav-bg-dark">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-center justify-between lg:mb-4 gap-2 font-extrabold logo text-4xl">
              <Link to="/">COIN IO</Link>
            </div>
            <span
              onClick={() => setOpen(!open)}
              class="material-symbols-outlined text-4xl cursor-pointer lg:hidden"
            >
              {open ? "close" : "menu"}
            </span>
          </div>
          <div
            className={`transiton-all duration-500 ease-in flex-1 flex-col gap-5 ${
              open ? "flex" : "hidden"
            } lg:flex`}
          >
            <NavLink
              to="/"
              className="flex gap-2 opacity-50 hover:opacity-100 transition-all mt-4 lg:mt-0"
            >
              <span className="material-symbols-outlined text-2xl">
                group_work
              </span>
              <div className="font-medium text-sm text-white flex items-center gap-3">
                Overview
              </div>
            </NavLink>
            <NavLink
              to="/cryptos"
              className="flex gap-2 opacity-50 hover:opacity-100 transition-all"
            >
              <span className="material-symbols-outlined text-2xl">token</span>
              <div className="font-medium text-sm text-white flex items-center gap-3">
                Top 100 Crypto
              </div>
            </NavLink>
            {/* <Link
              to="/"
              className="flex gap-2 opacity-50 hover:opacity-100 transition-all"
            >
              <span className="material-symbols-outlined text-2xl">
                change_circle
              </span>
              <div className="font-medium text-sm text-white flex items-center gap-3">
                Exchanges
              </div>
            </Link> */}
            <NavLink
              to="/news"
              className="flex gap-2 opacity-50 hover:opacity-100 transition-all"
            >
              <span className="material-symbols-outlined text-2xl">
                newspaper
              </span>
              <div className="font-medium text-sm text-white flex items-center gap-3">
                News
              </div>
            </NavLink>
            <a
              href="https://github.com/Luong-Bao-Thai/coin-io/"
              target="_blank"
              className="lg:hidden flex gap-2 items-center hover:underline"
            >
              <GithubOutlined />
              GitHub
            </a>
          </div>
        </div>
        <a
          href="https://github.com/Luong-Bao-Thai/coin-io/"
          target="_blank"
          className="hidden lg:flex gap-2 items-center hover:underline"
        >
          <GithubOutlined />
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Navbar;
