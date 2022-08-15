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
    serverUrl={process.env.REACT_APP_MORALIS_URL}
    appId={process.env.REACT_APP_MORALIS_ID}
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
