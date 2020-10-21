import React from "react";
import Map from "./Map";

const googleMapsApiKey = process.env.REACT_APP_DIST_MATRIX_API_KEY;

const MapWrapper = (props) => {
  const {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom,
    places, 
  } = props;

  return (
    <Map
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        googleMapsApiKey +
        '&libraries=geometry,drawing,places'
      }
      markers={places}
      loadingElement={loadingElement || <div style={{height: `100%`}}/>}
      containerElement={containerElement || <div style={{height: "80vh"}}/>}
      mapElement={mapElement || <div style={{height: `100%`}}/>}
      defaultCenter={defaultCenter || {lat: 25.798939, lng: -80.291409}}
      defaultZoom={defaultZoom || 11}
    />
  );
}

export default MapWrapper;