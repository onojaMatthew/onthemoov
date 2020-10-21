import { localAuth } from "../../../helper/authentcate";
export const ADD_VEHICLE_START = "ADD_VEHICLE_START";
export const ADD_VEHICLE_SUCCESS = "ADD_VEHICLE_SUCCESS";
export const ADD_VEHICLE_FAILED = "ADD_VEHICLE_FAILED";
export const GET_VEHICLES_START = "GET_VEHICLES_START";
export const GET_VEHICLES_SUCCESS = "GET_VEHICLES_SUCCESS";
export const GET_VEHICLES_FAILED = "GET_VEHICLES_FAILED";
export const GET_VEHICLE_START = "GET_VEHICLE_START";
export const GET_VEHICLE_SUCCESS = "GET_VEHICLE_SUCCESS";
export const GET_VEHICLE_FAILED = "GET_VEHICLE_FAILED";
export const UPDATE_VEHICLE_START = "UPDATE_VEHICLE_START";
export const UPDATE_VEHICLE_SUCCESS = "UPDATE_VEHICLE_SUCCESS";
export const UPDATE_VEHICLE_FAILED = "UPDATE_VEHICLE_FAILED";
export const DELETE_VEHICLE_START = "DELETE_VEHICLE_START";
export const DELETE_VEHICLE_SUCCESS = "DELETE_VEHICLE_SUCCESS";
export const DELETE_VEHICLE_FAILED = "DELETE_VEHICLE_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;
const token = localAuth().token && localAuth().token;
const role = localAuth().user && localAuth().user.role;

export const addVehicleStart = () => {
  return {
    type: ADD_VEHICLE_START
  }
}

export const addVehicleSuccess = (data) => {
  return {
    type: ADD_VEHICLE_SUCCESS,
    data
  }
}

export const addVehicleFailed = (error) => {
  return {
    type: ADD_VEHICLE_FAILED,
    error
  }
}

export const addVehicle = (data) => {
  return dispatch => {
    dispatch(addVehicleStart());
    fetch(`${BASE_URL}/vehicle/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(addVehicleFailed(resp.error));
        dispatch(addVehicleSuccess(resp));
      })
      .catch(err => {
        dispatch(addVehicleFailed(err.message));
      });
  }
}


export const getVehicleStart = () => {
  return {
    type: GET_VEHICLE_START
  }
}

export const getVehicleSuccess = (data) => {
  return {
    type: GET_VEHICLE_SUCCESS,
    data
  }
}

export const getVehicleFailed = (error) => {
  return {
    type: GET_VEHICLE_FAILED,
    error
  }
}

export const getVehicle = (id) => {
  return dispatch => {
    dispatch(getVehicleStart());
    fetch(`${BASE_URL}/vehicle/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getVehicleFailed(resp.error));
        dispatch(getVehicleSuccess(resp));
      })
      .catch(err => {
        dispatch(getVehicleFailed(err.message));
      });
  }
}

export const getVehiclesStart = () => {
  return {
    type: GET_VEHICLES_START
  }
}

export const getVehiclesSuccess = (data) => {
  return {
    type: GET_VEHICLES_SUCCESS,
    data
  }
}

export const getVehiclesFailed = (error) => {
  return {
    type: GET_VEHICLES_FAILED,
    error
  }
}

export const getVehicles = () => {
  return dispatch => {
    dispatch(getVehiclesStart());
    fetch(`${BASE_URL}/vehicle/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getVehiclesFailed(resp.error));
        dispatch(getVehiclesSuccess(resp));
      })
      .catch(err => {
        dispatch(getVehiclesFailed(err.message));
      });
  }
}

export const updateStart = () => {
  return {
    type: UPDATE_VEHICLE_START
  }
}

export const updateSuccess = (data) => {
  return {
    type: UPDATE_VEHICLE_SUCCESS,
    data
  }
}

export const updateFailed = (error) => {
  return {
    type: UPDATE_VEHICLE_FAILED,
    error
  }
}

export const updateVehicle = (data, id) => {
  return dispatch => {
    dispatch(updateStart());
    fetch(`${BASE_URL}/vehicle/update/${id}/${role}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateFailed(resp.error));
        dispatch(updateSuccess(resp));
      })
      .catch(err => {
        dispatch(updateFailed(err.message));
      });
  }
}

export const deleteStart = () => {
  return {
    type: DELETE_VEHICLE_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_VEHICLE_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_VEHICLE_FAILED,
    error
  }
}

export const deleteVehicle = (id) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/vehicle/delete/${id}/${role}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.error));
        dispatch(deleteSuccess(resp));
      })
      .catch(err => {
        dispatch(deleteFailed(err.message));
      });
  }
}
// get("/vehicle/:vehicleId", getVehicle);
// router.put("/vehicle/update/:vehicleId/:role", requireLogin, updateVehicle);
// router.delete("/vehicle/delete/:vehicleId/:role", requireLogin, deleteVehicle)