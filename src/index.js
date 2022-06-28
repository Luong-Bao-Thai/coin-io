import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";

import App from "./App";
import CryptoPage from "./Pages/CryptoPage";
import NewsPage from "./Pages/NewsPage";
import CryptoDetailsPage from "./Pages/CryptoDetailsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="cryptos" element={<CryptoPage />} />
          <Route path="cryptos/:coinId" element={<CryptoDetailsPage />} />
          <Route path="news" element={<NewsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
