import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import LMChatClient from "@likeminds.community/chat-js";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const myClient: LMChatClient = LMChatClient
  // .setApiKey(
  //   process.env.REACT_APP_API_KEY!
  // )
  // .setApiKey("8fa4304d-a5b6-4f10-baeb-a80650a480a4")
  .setApiKey("c2193402-6710-442a-ae68-22cd9d1c7b5e")
  .setPlatformCode(process.env.REACT_APP_XPLATFORM_CODE!)
  .setVersionCode(parseInt(process.env.REACT_APP_XVERSION_CODE!))
  .build();

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
