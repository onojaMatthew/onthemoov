export const CALCULATE_PRICE_START = "CALCULATE_PRICE_START";
export const CALCULATE_PRICE_SUCCESS = "CALCULATE_PRICE_SUCCESS";
export const CALCULATE_PRICE_FAILED = "CALCULATE_PRICE_FAILED";

export const GET_LATLNG_START = "GET_LATLNG_START";
export const GET_LATLNG_SUCCESS = "GET_LATLNG_SUCCESS";
export const GET_LATLNG_FAILED = "GET_LATLNG_FAILED";

export const GET_DELIVERY_COORD_START = "GET_DELIVERY_COORD_START";
export const GET_DELIVERY_COORD_SUCCESS = "GET_DELIVERY_COORD_SUCCESS";
export const GET_DELIVERY_COORD_FAILED = "GET_DELIVERY_COORD_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

export const calculateStart = () => {
  return {
    type: CALCULATE_PRICE_START
  }
}

export const calculateSuccess = (data) => {
  return {
    type: CALCULATE_PRICE_SUCCESS,
    data
  }
}

export const calculateFailed = (error) => {
  return {
    type: CALCULATE_PRICE_FAILED,
    error
  }
}

export const calculatePrice = (data) => {
  return dispatch => {
    dispatch(calculateStart());
    fetch(`${BASE_URL}/cost`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(calculateFailed(resp.error));
        dispatch(calculateSuccess(resp));
      })
      .catch(err => {
        dispatch(calculateFailed(err.message));
      });
  }
}

export const getLatLngStart = () => {
  return {
    type: GET_LATLNG_START
  }
}

export const getLatLngSuccess = (data) => {
  return {
    type: GET_LATLNG_SUCCESS,
    data
  }
}

export const getLatLngFailed = (error) => {
  return {
    type: GET_LATLNG_FAILED,
    error
  }
}

export const getLatLng = (data) => {
  return dispatch => {
    dispatch(getLatLngStart());
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data}&components=country:NG&key=${process.env.REACT_APP_DIST_MATRIX_API_KEY}`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getLatLngFailed(resp.error));
        dispatch(getLatLngSuccess(resp));
      })
      .catch(err => {
        dispatch(getLatLngFailed(err.message));
      });
  }
}

export const getDeliveryCoordStart = () => {
  return {
    type: GET_DELIVERY_COORD_START
  }
}

export const getDeliveryCoordSuccess = (data) => {
  return {
    type: GET_DELIVERY_COORD_SUCCESS,
    data
  }
}

export const getDeliveryCoordFailed= (error) => {
  return {
    type: GET_DELIVERY_COORD_FAILED,
    error
  }
}

export const getDeliveryCoord = (data) => {
  return dispatch => {
    dispatch(getDeliveryCoordStart());
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data}&components=country:NG&key=${process.env.REACT_APP_DIST_MATRIX_API_KEY}`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getDeliveryCoordFailed(resp.error));
        dispatch(getDeliveryCoordSuccess(resp));
      })
      .catch(err => {
        dispatch(getDeliveryCoordFailed(err.message));
      });
  }
}