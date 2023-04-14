import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LikeMinds from "likeminds-chat-beta";
import { log } from "./sdkFunctions";

export const myClient = new LikeMinds({
  apiKey: process.env.REACT_APP_API_KEY,
  xPlatformCode: process.env.REACT_APP_XPLATFORM_CODE,
  xVersionCode: 22,
  baseUrl: process.env.REACT_APP_BASE_URL,
  baseUrlCaravan: process.env.REACT_APP_BASE_URL_CARAVAN,
});
log(myClient);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
  community: {},
  setCommunity: () => {},
});
