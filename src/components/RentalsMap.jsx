import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

function RentalsMap({ locations, google, setHighLight }) {
  const [center, setCenter] = useState();
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
      {center && (
        <Map
          google={google}
          containerStyle={{
            width: "50%",
            height: "calc(99vh - 135px)",
          }}
          center={center}
          initialCenter={locations[0]}
          zoom={13}
          disableDefaultUI={true}
        >
          {locations.map((coords, i) => (
            <Marker key={i} position={coords} onClick={() => setHighLight(i)} />
          ))}
        </Map>
      )}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCwDPUDZlx1yo9lsVRHAv5bSRhhMh7t4nk",
})(RentalsMap);
