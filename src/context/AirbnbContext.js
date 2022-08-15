import React, { createContext, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { airbnbAbi, airbnbAddress } from "../lib/constants";
import { useNotification } from "web3uikit";
var console = require("console-browserify");

export const AirbnbContext = createContext();

export const AirbnbProvider = ({ children }) => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(1);
  const [currentAccount, setCurrentAccount] = useState("");

  //add rental place
  const [placeName, setPlaceName] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [unoDescription, setUnoDescription] = useState("");
  const [dosDescription, setDosDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [pricePerDay, setPricePerDay] = useState(1);

  ///Fetching List
  const [rentalsList, setRentalsList] = useState();
  const [coOrdinates, setCoOrdinates] = useState([]);

  ///Fetching Booked List
  const [isVisible, setVisible] = useState(false);
  const [userRentals, setUserRentals] = useState();

  const [cityList, setCityList] = useState([]);
  const { isAuthenticated, user, Moralis } = useMoralis();
  const dispatch = useNotification();
  const contractProcessor = useWeb3ExecuteFunction();

  const handleSuccess = (msg) => {
    dispatch({
      type: "success",
      message: `${msg}`,
      title: "Request Succesful",
      position: "topL",
    });
  };

  const handleError = (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Processing Failed",
      position: "topL",
    });
  };

  const handleNoAccount = () => {
    dispatch({
      type: "error",
      message: `You need to connect your wallet to book a rental`,
      title: "Not Connected",
      position: "topL",
    });
  };

  useEffect(() => {
    const getInitialData = async () => {
      if (isAuthenticated) {
        getCityData();

        const account = await user?.get("ethAddress");
        setCurrentAccount(account);
      }
    };
    getInitialData();
  }, [user, isAuthenticated]);

  ///Fetching Listed Rentals and Filtered
  useEffect(() => {
    const fetchRentalsList = async () => {
      try {
        if (isAuthenticated) {
          const Rentals = Moralis.Object.extend("Rentals");
          const query = new Moralis.Query(Rentals);
          query.equalTo("city", destination);
          query.greaterThanOrEqualTo("maxGuests_decimal", guests);

          const result = await query.find();

          let cords = [];
          result.forEach((e) => {
            cords.push({
              lat: Number(e.attributes.lat),
              lng: Number(e.attributes.long),
            });
          });

          setCoOrdinates(cords);
          setRentalsList(result);
        }
      } catch (err) {
        handleError(err.message);
      }
    };

    fetchRentalsList();
  }, [checkIn, checkOut, destination, guests, isAuthenticated]);

  ///Fetching Booked Rentals
  useEffect(() => {
    const fetchBookedList = async () => {
      const BookedRentals = Moralis.Object.extend("newBookings");
      const query = new Moralis.Query(BookedRentals);
      query.equalTo("booker", currentAccount);
      const result = await query.find();

      setUserRentals(result);
    };
    fetchBookedList();
  }, [isVisible]);

  //Fetching City from Classes
  const getCityData = async () => {
    try {
      const rentals = new Moralis.Object.extend("Rentals");
      const query = new Moralis.Query(rentals);
      const result = await query.select("city").find();

      const cityList = [];
      result.forEach((city, index) => {
        if (cityList.find(({ label }) => label === city.attributes.city)) {
          return;
        } else {
          cityList.push({ id: index, label: city.attributes.city });
        }
      });

      setCityList(cityList);

      setDestination(cityList[0].label);
    } catch (error) {
      console.log(error.message);
    }
  };

  ///// Listing the new Place
  const addRentalPlace = async (
    placeName,
    city,
    lat,
    long,
    unoDescription,
    dosDescription,
    imgUrl,
    maxGuests,
    pricePerDay
  ) => {
    if (!isAuthenticated) {
      handleError("Please connect wallet");
    }

    let options = {
      contractAddress: airbnbAddress,
      functionName: "addRentals",
      abi: airbnbAbi,
      params: {
        name: placeName,
        city: city,
        lat: lat,
        long: long,
        unoDescription: unoDescription,
        dosDescription: dosDescription,
        imgUrl: imgUrl,
        maxGuests: maxGuests,
        pricePerDay: pricePerDay,
        datesBooked: [],
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleSuccess("Thanks for regist your place");
      },
      onError: (error) => {
        handleError(error.message);
        console.log(error);
      },
    });
  };

  ///Book the Rentals Function
  const bookRental = async function (start, end, id, dayPrice) {
    if (currentAccount) {
      for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt).toISOString().slice(0, 10));
      }

      let options = {
        contractAddress: airbnbAddress,
        functionName: "addDatesBooked",
        abi: airbnbAbi,
        params: {
          id: id,
          newBookings: arr,
        },
        msgValue: Moralis.Units.ETH(dayPrice * arr.length),
      };

      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          handleSuccess("Booking is completed");
        },
        onError: (error) => {
          handleError(error.data.message);
          console.log(error);
        },
      });
    } else {
      handleNoAccount();
    }
  };

  return (
    <AirbnbContext.Provider
      value={{
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        destination,
        setDestination,
        guests,
        setGuests,

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

        rentalsList,
        coOrdinates,

        bookRental,
        currentAccount,

        isVisible,
        setVisible,
        userRentals,

        cityList,
      }}
    >
      {children}
    </AirbnbContext.Provider>
  );
};
