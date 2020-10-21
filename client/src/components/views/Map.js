/* global google */
import React, { useState, useEffect, useContext } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import { MapContext } from "../../context/MapContext";

const MapDirectionsRenderer = (props) => {
  const [ directions, setDirections ] = useState(null);
  const [ error, setError ] = useState(null);
  const { places, travelMode } = props;
  const { count, coord8s } = useContext(MapContext)

  let travelPlaces = places;

  useEffect(() => {
    const waypoints = travelPlaces && travelPlaces.map(p => ({
      location: {lat: p && p.lat, lng: p && p.lng},
      stopover: true
    }));

    const origin = waypoints && waypoints.length > 0 && waypoints.shift().location;
    const destination = waypoints && waypoints.length > 0 && waypoints.pop().location;
    const directionsService = new google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );
  }, [ places, travelMode ]);

  useEffect(() => {
    if (count > 0) {
      travelPlaces = null;
      const waypoints = coord8s && coord8s.map(p => ({
        location: {lat: p && p.lat, lng: p && p.lng},
        stopover: true
      }));

      const origin = waypoints && waypoints.length > 0 && waypoints.shift().location;
      const destination = waypoints && waypoints.length > 0 && waypoints.pop().location;
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
          waypoints: waypoints
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setError(result);
          }
        }
      );
    }
  },[ count ]);

  if (error) {
    return <h1>{error}</h1>;
  }
  return (directions && <DirectionsRenderer directions={directions} />)
}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.markers.map((marker, index) => {
        const position = { lat: marker && marker.latitude, lng: marker && marker.longitude };
        return <Marker key={index} position={position} />;
      })}
      <MapDirectionsRenderer
        places={props.markers}
        travelMode={google.maps.TravelMode.DRIVING}
      />
    </GoogleMap>
  ))
);

export default Map;
