import React, { useState, useContext } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import bg from "../images/frontpagebg.png";
import AddPlace from "../components/AddPlace";
import Headers from "../components/Headers";
import { AirbnbContext } from "../context/AirbnbContext";
import { Select, DatePicker, Input, Icon, Button } from "web3uikit";
import console from "console-browserify";

const Home = () => {
  const [addPlace, setAddPlace] = useState(false);

  const {
    setCheckIn,
    setCheckOut,
    setDestination,
    setGuests,
    guests,
    cityList,
  } = useContext(AirbnbContext);

  const randomDestination = () => {
    const randomNum = Math.floor(Math.random() * cityList.length);
    setDestination(cityList[randomNum].label);
  };

  return (
    <>
      <div className="container home_container">
        <Headers />
        <div className="tabContent">
          <div className="searchFields">
            <div className="inputs">
              <p className="select_title">Location</p>
              <div className="location__select">
                <Select
                  id="select-id"
                  defaultOptionIndex={0}
                  onChange={(data) => setDestination(data.label)}
                  options={cityList}
                />
              </div>
            </div>
            <div className="vl" />
            <div className="inputs">
              <p className="input_title">Check In</p>
              <div id="datePicker__id">
                <DatePicker id="CheckIn" onChange={(e) => setCheckIn(e.date)} />
              </div>
            </div>
            <div className="vl" />
            <div className="inputs">
              <p className="input_title">Check Out</p>
              <div id="datePicker__id">
                <DatePicker
                  id="CheckOut"
                  onChange={(e) => setCheckOut(e.date)}
                />
              </div>
            </div>
            <div className="vl" />
            <div className="inputs">
              <p className="input_title">Guest</p>
              <div id="number__input">
                <Input
                  id="input-id"
                  value={guests}
                  name="AddGuests"
                  type="number"
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </div>
            </div>{" "}
            <Link to={"/rentals"}>
              <div className="searchButton">
                <Icon fill="#ffffff" size={24} svg="search" />
              </div>
            </Link>
          </div>
        </div>
        <div className="moreOptions">
          <div className="randomLocation">
            <div className="title">Feel Adventurous</div>
            <div className="text">
              Let us decide and discover new places to stay,live, work or just
              relax
            </div>{" "}
            <Link className="randomLink" to={"/rentals"}>
              <Button
                text="Explore A Location"
                onClick={() => randomDestination()}
              />
            </Link>
            <div>
              <div className="text_add">Let us share your place</div>
              <Button
                text="Share Your Place"
                onClick={() => setAddPlace(!addPlace)}
              />
            </div>
          </div>
          <div className="add_form">
            {addPlace && (
              <div
                style={{
                  height: "75vh",
                  width: "60vw",
                }}
              >
                <AddPlace setAddPlaceHandler={() => setAddPlace(!addPlace)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
