import React, { createContext, useState } from "react";

export const MapContext = createContext();

const MapContextProver = (props) => {
  const [ count, setCount ] = useState(0);
  const [ coord8s, setCoord8s ] = useState([]);

  return (
    <MapContext.Provider value={{
      setCoord8s,
      setCount,
      count,
      coord8s
    }}>
      {props.children}
    </MapContext.Provider>
  );
}

export default MapContextProver;