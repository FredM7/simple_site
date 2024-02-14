// import "doshx_controls_web/lib/index.css"; //Tailwind is being included here.

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { redux_store } from "./store";
import { HashRouter } from "react-router-dom";
import { App } from "./app";

const root = createRoot(document.getElementById("app") ?? document.body);
root.render(
  <Provider store={redux_store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
