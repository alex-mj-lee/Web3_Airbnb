import React, { useState, useEffect } from "react";
// import { Map, Marker, GoogleApiWrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import console from "console-browserify";

export default function RentalsMap({ locations, setHighLight }) {
  const [center, setCenter] = useState();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  });

  useEffect(() => {
    var arr = Object.keys(locations);
    var getLat = (key) => locations[key]["lat"];
    var avgLat = arr.reduce((a, c) => a + Number(getLat(c)), 0) / arr.length;

    var getLng = (key) => locations[key]["lng"];
    var avgLng = arr.reduce((a, c) => a + Number(getLng(c)), 0) / arr.length;
    setCenter({ lat: avgLat, lng: avgLng });
  }, [locations]);

  return (
    <div className="container">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "calc(99vh - 135px)",
          }}
          center={center}
          initialCenter={locations[0]}
          zoom={12}
        >
          {locations.map((coords, i) => (
            <Marker key={i} position={coords} onClick={() => setHighLight(i)} />
          ))}
        </GoogleMap>
      ) : (
        <>Nothing Load</>
      )}
    </div>
  );
}
