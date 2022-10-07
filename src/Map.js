import React, { Component } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "700px",
  height: "760px",
};

const center = {
  lat: 51.521,
  lng: -0.1287,
};

// document.getElementById("google_map").addEventListener("load", () => {});

const onLoad = (marker) => {
  console.log("marker: ", marker);
};

const onClick = (marker) => {
  console.log("marker:", marker.label);
};

class MyMap extends Component {
  render() {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        docks={this.props.docks}
      >
        <MarkerF position={center} label="⭐️" />
        {this.props.docks.map((dock) => {
          return (
            <MarkerF
              onLoad={onLoad}
              position={dock["position"]}
              onClick={onClick}
              label={dock["name"]}
            />
          );
        })}
        <></>
      </GoogleMap>
    );
  }
}

export default MyMap;
