import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle";

import "./styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </React.StrictMode>,
  document.getElementById("root")
);
