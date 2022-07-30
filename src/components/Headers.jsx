import React, { useContext, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logo from "../images/airbnbRed.png";
import { AirbnbContext } from "../context/AirbnbContext";
import { ConnectButton } from "web3uikit";
import User from "../components/User";

const Headers = () => {
  const [menuItem, setMenuItem] = useState(false);
  const { setDestination, cityList, currentAccount } =
    useContext(AirbnbContext);

  return (
    <>
      <div className="topBanners">
        <div>
          <Link to="/">
            <img
              className="logo"
              src={logo}
              alt="logo"
              onClick={() => setDestination(cityList[0].label)}
            />
          </Link>
        </div>

        <div className="tabs">
          <Link to={"/rentals"} className="selected">
            Places to Stay
          </Link>
          <Link to={"/experiences"} className="selected">
            Experiences
          </Link>
          <Link to={"/support"} className="selected">
            Support
          </Link>
        </div>
        <div className="lrContainers ">
          {currentAccount && <User />}
          <ConnectButton className="connect__btn" />
          {/* Hamburger Icon */}
          <div onClick={() => setMenuItem(!menuItem)}>
            <button
              id="menu-btn"
              className={
                menuItem ? "menu_btn hamburger open" : "menu_btn hamburger"
              }
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={menuItem ? "" : "hidden"}>
        <div id="menu" className="menu__bar">
          <Link to={"/"}>
            <div className="menu_select">Home</div>
          </Link>
          <Link to={"/rentals"}>
            <div className="menu_select">Places to Stay</div>
          </Link>
          <Link to={"/experiences"}>
            <div className="menu_select">Experiences</div>
          </Link>
          <Link to={"/support"}>
            <div className="menu_select">Support</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Headers;
