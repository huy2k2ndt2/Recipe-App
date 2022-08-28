import { useEffect } from "react";
import { SAVE_STYLES } from "../contants";
import { setStyleRoot } from "../utils";

const GlobalStyle = ({ children }) => {
  const settings = JSON.parse(localStorage.getItem(SAVE_STYLES));

  useEffect(() => {
    settings && setStyleRoot(settings);
  }, [settings]);

  return children;
};

export default GlobalStyle;
