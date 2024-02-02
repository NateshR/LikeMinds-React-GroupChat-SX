import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LMChatClient from "@likeminds.community/chat-js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

export const myClient: LMChatClient = LMChatClient.setApiKey(
  // process.env.REACT_APP_API_KEY!
  "c2193402-6710-442a-ae68-22cd9d1c7b5e",
)
  // .setPlatformCode(process.env.REACT_APP_XPLATFORM_CODE!)
  .setPlatformCode("rt")
  // .setVersionCode(parseInt(process.env.REACT_APP_XVERSION_CODE!))
  .setVersionCode(35)
  .build();

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
