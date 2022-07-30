import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { AirbnbProvider } from "./context/AirbnbContext";
import { NftProvider } from "./context/NftContext";

ReactDOM.render(
  <MoralisProvider
    serverUrl="https://y5g6dnyz4idq.usemoralis.com:2053/server"
    appId="Bw4cHZT0COxQE2J4Ro5EBLYMFcPd4LNlMO8xyVTt"
  >
    <NotificationProvider>
      <BrowserRouter>
        <NftProvider>
          <AirbnbProvider>
            <App />
          </AirbnbProvider>
        </NftProvider>
      </BrowserRouter>
    </NotificationProvider>
  </MoralisProvider>,
  document.querySelector("#root")
);
