import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import LikeMinds from "likeminds-chat-beta";
import { log } from "./sdkFunctions";

export const myClient = new LikeMinds({
  apiKey: "d4356d31-306e-406d-aa4a-cd49f1b88f19",
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
