import React from "react";
import "./index.css";
import { App } from "./app/App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "typeface-roboto";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
