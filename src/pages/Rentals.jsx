import React, { useState, useContext } from "react";
import "./rentals.css";
import { Link } from "react-router-dom";
import logo from "../images/airbnbRed.png";
import { ConnectButton, Icon, Button } from "web3uikit";
import RentalsMap from "../components/RentalsMap";
import { AirbnbContext } from "../context/AirbnbContext";
import User from "../components/User";

const Rentals = () => {
  const [highLight, setHighLight] = useState();
  const [menuItem, setMenuItem] = useState(false);

  const {
    checkIn,
    checkOut,
    destination,
    guests,
    coOrdinates,
    rentalsList,
    bookRental,
    currentAccount,
    setDestination,
    cityList,
  } = useContext(AirbnbContext);

  return (
    <div className="container">
      <div className="topBanner">
        <div>
          <Link to="/">
            <img
              className="rental_logo"
              src={logo}
              alt="logo"
              onClick={() => setDestination(cityList[0].label)}
            />
          </Link>
        </div>
        <div className="searchReminder">
          <div className="filter">{destination}</div>
          <div className="vl" />
          <div className="filter">
            {`
           ${checkIn.toLocaleString("default", {
             month: "short",
           })} 
           ${checkIn.toLocaleString("default", {
             day: "2-digit",
           })} 
           - 
           ${checkOut.toLocaleString("default", {
             month: "short",
           })} 
           ${checkOut.toLocaleString("default", {
             day: "2-digit",
           })}
          `}
          </div>
          <div className="vl" />
          <div className="filter">{guests} Guest</div>
          <div className="searchFiltersIcon">
            <Icon fill="#ffffff" size={20} svg="search" />
          </div>
        </div>
        <div className="lrContainer">
          {currentAccount && <User />}
          <div className="hidden__btn">
            <ConnectButton className="hidden" />
          </div>
          <div onClick={() => setMenuItem(!menuItem)}>
            <button
              id="menu-btns"
              className={
                menuItem ? "menu_btns hamburgers open" : "menu_btns hamburgers"
              }
            >
              <span className="hamburgers-top"></span>
              <span className="hamburgers-middle"></span>
              <span className="hamburgers-bottom"></span>
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

      <hr className="line" />
      <div className="rentalsContent">
        <div className="rentalsContentL">
          Stays Available For Your Destination
          <div className="rentalsGrid">
            {rentalsList &&
              rentalsList.map((e, i) => {
                return (
                  <>
                    {/* <hr className="line2" /> */}
                    <div
                      className={highLight === i ? "rentalDivH " : "rentalDiv"}
                    >
                      <img className="rentalImg" src={e.attributes.imgUrl} />
                      <div className="rentalInfo">
                        <div className="rentalTitle">{e.attributes.name}</div>
                        <div className="rentalDesc">
                          {e.attributes.unoDescription}
                        </div>
                        <div className="rentalDesc">
                          {e.attributes.dosDescription}
                        </div>
                        <div className="bottomButton">
                          <div className="price">
                            <Icon fill="#808080" size={10} svg="matic" />{" "}
                            {e.attributes.pricePerDay} / Day
                          </div>
                          <Button
                            onClick={() => {
                              bookRental(
                                checkIn,
                                checkOut,
                                e.attributes.uid_decimal.value.$numberDecimal,
                                Number(
                                  e.attributes.pricePerDay_decimal.value
                                    .$numberDecimal
                                )
                              );
                            }}
                            text="Stay Here"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="rentalsContentR">
          <RentalsMap locations={coOrdinates} setHighLight={setHighLight} />
        </div>
      </div>
    </div>
  );
};

export default Rentals;
