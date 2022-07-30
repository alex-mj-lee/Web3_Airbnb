import React, { useState, useContext, useEffect } from "react";
import { Input, Icon, Typography, Modal } from "web3uikit";
import { AirbnbContext } from "../context/AirbnbContext";
import "./addPlace.css";
var console = require("console-browserify");

const AddPlace = ({ setAddPlaceHandler }) => {
  const {
    placeName,
    city,
    lat,
    long,
    unoDescription,
    dosDescription,
    imgUrl,
    maxGuest,
    pricePerDay,

    setPlaceName,
    setCity,
    setLat,
    setLong,
    setUnoDescription,
    setDosDescription,
    setImgUrl,
    setMaxGuest,
    setPricePerDay,
    addRentalPlace,
  } = useContext(AirbnbContext);

  /// converted coordinate will be updated

  const [address, setAddress] = useState("");

  useEffect(() => {
    const geocode = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCwDPUDZlx1yo9lsVRHAv5bSRhhMh7t4nk`
        );
        const data = await response.json();
        const lat = data.results[0].geometry.location.lat.toString();
        const lng = data.results[0].geometry.location.lng.toString();

        setLat(lat);
        setLong(lng);
      } catch (err) {
        console.log(err.message);
      }
    };
    geocode();
  }, [address]);

  return (
    <div>
      <Modal
        className="add_modal"
        isCentered
        onCancel={(e) => setAddPlaceHandler(!e)}
        onCloseButtonPressed={(e) => setAddPlaceHandler(!e)}
        onOk={() => {
          addRentalPlace(
            placeName,
            city,
            lat,
            long,
            unoDescription,
            dosDescription,
            imgUrl,
            maxGuest,
            pricePerDay
          );
        }}
        title={
          <div className="add_title">
            <Icon fill="#68738D" size={28} svg="edit" />
            <Typography color="#68738D" variant="h3">
              Add Your Place
            </Typography>
          </div>
        }
      >
        <div className="add_inputs">
          Name
          <Input
            className="add_input"
            width="100%"
            placeholder="Name"
            name="name"
            type="text"
            onChange={(e) => setPlaceName(e.target.value)}
          />
          City
          <Input
            className="add_input"
            width="100%"
            placeholder="City"
            name="city"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
          Address
          <Input
            className="add_input"
            width="100%"
            placeholder="Address"
            name="long"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          How many rooms and beds?
          <Input
            className="add_input"
            width="100%"
            placeholder="2 bedroom, 2 bathrooms"
            name="unoDescription"
            type="text"
            onChange={(e) => setUnoDescription(e.target.value)}
          />
          What place offers
          <Input
            className="add_input"
            width="100%"
            placeholder="Wifi, Kitchen, Plates"
            name="dosDescription"
            type="text"
            onChange={(e) => setDosDescription(e.target.value)}
          />
          Image
          <Input
            className="add_input"
            width="100%"
            placeholder="image"
            name="imgUrl"
            type="text"
            onChange={(e) => setImgUrl(e.target.value)}
          />
          Maximum Guest
          <Input
            className="add_input"
            width="100%"
            value={1}
            name="maxGuests"
            type="number"
            onChange={(e) => setMaxGuest(e.target.value)}
          />
          Price per day (Matic)
          <Input
            className="add_input"
            width="100%"
            value={1}
            name="pricePerDay"
            type="number"
            onChange={(e) => setPricePerDay(e.target.value)}
          />
          {/* Booking Dates
        <Input placeholder="Empty" name="datesBooked" type="text" /> */}
        </div>
      </Modal>
    </div>
  );
};

export default AddPlace;
