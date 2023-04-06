import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LikeMinds from "likeminds-chat-beta";

export const myClient = new LikeMinds({
  apiKey: process.env.REACT_APP_API_KEY,
  // xPlatformCode: process.env.REACT_APP_XPLATFORM_CODE,
  xVersionCode: 9999,
  baseUrl: process.env.REACT_APP_BASE_URL,
  baseUrlCaravan: process.env.REACT_APP_BASE_URL_CARAVAN,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();

export const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
  community: {},
  setCommunity: () => {},
});
