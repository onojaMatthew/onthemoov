import { localAuth } from "../../../helper/authentcate";
import { join } from "lodash";

export const ADD_DRIVER_START = "ADD_DRIVER_START";
export const ADD_DRIVER_SUCCESS = "ADD_DRIVER_SUCCESS";
export const ADD_DRIVER_FAILED = "ADD_DRIVER_FAILED";
export const UPDATE_DRIVER_START = "UPDATE_DRIVER_START";
export const UPDATE_DRIVER_SUCCESS = "UPDATE_DRIVER_SUCCESS";
export const UPDATE_DRIVER_FAILED = "UPDATE_DRIVER_FAILED";

export const GET_DRIVER_START = "GET_DRIVER_START";
export const GET_DRIVER_SUCCESS = "GET_DRIVER_SUCCESS";
export const GET_DRIVER_FAILED = "GET_DRIVER_FAILED";

export const GET_DRIVERS_START = "GET_DRIVERS_START";
export const GET_DRIVERS_SUCCESS = "GET_DRIVERS_SUCCESS";
export const GET_DRIVERS_FAILED = "GET_DRIVERS_FAILED";

export const ACTIVATE_DRIVER_START = "ACTIVATE_DRIVER_START";
export const ACTIVATE_DRIVER_SUCCESS = "ACTIVATE_DRIVER_SUCCESS";
export const ACTIVATE_DRIVER_FAILED = "ACTIVATE_DRIVER_FAILED";

export const DEACTIVATE_DRIVER_START = "DEACTIVATE_DRIVER_START";
export const DEACTIVATE_DRIVER_SUCCESS = "DEACTIVATE_DRIVER_SUCCESS";
export const DEACTIVATE_DRIVER_FAILED = "DEACTIVATE_DRIVER_FAILED";

export const DELETE_DRIVER_START = "DELETE_DRIVER_START";
export const DELETE_DRIVER_SUCCESS = "DELETE_DRIVER_SUCCESS";
export const DELETE_DRIVER_FAILED = "DELETE_DRIVER_FAILED";

export const DECLINE_APPLICATION_START = "DECLINE_APPLICATION_START";
export const DECLINE_APPLICATION_SUCCESS = "DECLINE_APPLICATION_SUCCESS";
export const DECLINE_APPLICATION_FAILED = "DECLINE_APPLICATION_FAILED";

const token = localAuth().token && localAuth().token;
const role = localAuth().user && localAuth().user.role;
const BASE_URL = process.env.REACT_APP_API_URL;

export const addDriverStart = () => {
  return {
    type: ADD_DRIVER_START
  }
}

export const addDriverSuccess = (data) => {
  return {
    type: ADD_DRIVER_SUCCESS,
    data
  }
}

export const addDriverFailed = (error) => {
  return {
    type: ADD_DRIVER_FAILED,
    error
  }
}

export const addDriver = (data) => {
  return dispatch => {
    dispatch(addDriverStart());
    fetch(`${BASE_URL}/rider/registration`, {
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
        if (resp.error) return dispatch(addDriverFailed(resp.error));
        dispatch(addDriverSuccess(resp));
      })
      .catch(err => {
        dispatch(addDriverFailed("Oops! Something went wrong. Please try again"));
      });
  }
}

export const updateDriverStart = () => {
  return {
    type: UPDATE_DRIVER_START
  }
}

export const updateDriverSuccess = (data) => {
  return {
    type: UPDATE_DRIVER_SUCCESS,
    data
  }
}

export const updateDriverFailed = (error) => {
  return {
    type: UPDATE_DRIVER_FAILED,
    error
  }
}

export const updateDriver = (data, riderId) => {
  let formData = new FormData();
  formData.append("riderPhoto", data.riderPhoto);
  formData.append("vehicleImage", data.vehicleImage);
  formData.append("vehicleNumber", data.vehicleNumber);
  formData.append("vehicleType", data.vehicleType)
  formData.append("vehicleModel", data.model)
  formData.append("insurance", data.insurance);
  formData.append("driving_license", data.license)
  return dispatch => {
    dispatch(updateDriverStart());
    fetch(`${BASE_URL}/rider/upload/documents/${role}/${riderId}`, {
      method: "PUT",
      body: formData
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateDriverFailed(resp.error));
        dispatch(updateDriverSuccess(resp));
      })
      .catch(err => {
        dispatch(updateDriverFailed("Internal server error. Ensure you have good internet connection"));
      });
  }
}

export const getDriverStart = () => {
  return {
    type: GET_DRIVER_START
  }
}

export const getDriverSuccess = (data) => {
  return {
    type: GET_DRIVER_SUCCESS,
    data
  }
}

export const getDriverFailed = (error) => {
  return {
    type: GET_DRIVER_FAILED,
    error
  }
}

export const getDriver = (riderId) => {
  return dispatch => {
    dispatch(getDriverStart());
    fetch(`${BASE_URL}/rider/${riderId}/${role}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getDriverFailed(resp.error));
        dispatch(getDriverSuccess(resp));
      })
      .catch(err => {
        dispatch(getDriverFailed(err.message));
      });
  }
}

export const getDriversStart = () => {
  return {
    type: GET_DRIVERS_START
  }
}

export const getDriversSuccess = (data) => {
  return {
    type: GET_DRIVERS_SUCCESS,
    data
  }
}

export const getDriversFailed = (error) => {
  return {
    type: GET_DRIVERS_FAILED,
    error
  }
}

export const getDrivers = () => {
  return dispatch => {
    dispatch(getDriversStart());
    fetch(`${BASE_URL}/rider/${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getDriversFailed(resp.error));
        dispatch(getDriversSuccess(resp));
      })
      .catch(err => {
        dispatch(getDriversFailed(err.message));
      });
  }
}

export const activateStart = () => {
  return {
    type: ACTIVATE_DRIVER_START
  }
}

export const activateSuccess = (data) => {
  return {
    type: ACTIVATE_DRIVER_SUCCESS,
    data
  }
}

export const activateFailed = (error) => {
  return {
    type: ACTIVATE_DRIVER_FAILED,
    error
  }
}

export const activateDriver = (riderId) => {
  return dispatch => {
    dispatch(activateStart());
    fetch(`${BASE_URL}/rider/activate/${role}/${riderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(activateFailed(resp.error));
        dispatch(activateSuccess(resp));
      })
      .then(() => {
        dispatch(getDrivers());
      })
      .catch(err => {
        dispatch(activateFailed(err.message));
      });
  }
}

export const deactivateStart = () => {
  return {
    type: DEACTIVATE_DRIVER_START
  }
}

export const deactivateSuccess = (data) => {
  return {
    type: DEACTIVATE_DRIVER_SUCCESS,
    data
  }
}

export const deactivateFailed = (error) => {
  return {
    type: DEACTIVATE_DRIVER_FAILED,
    error
  }
}

export const deactivateDriver = (riderId) => {
  return dispatch => {
    dispatch(deactivateStart());
    fetch(`${BASE_URL}/rider/deactivate/${role}/${riderId}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "applicatin/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deactivateFailed(resp.error));
        dispatch(deactivateSuccess(resp));
      })
      .catch(err => {
        dispatch(deactivateFailed(err.message));
      });
  }
}

export const deleteRiderStart = () => {
  return {
    type: DELETE_DRIVER_START
  }
}

export const deleteRiderSuccess = (data) => {
  return {
    type: DELETE_DRIVER_SUCCESS,
    data
  }
}

export const deleteRiderFailed = (error) => {
  return {
    type: DELETE_DRIVER_FAILED,
    error
  }
}

export const deleteRider = (riderId) => {
  return dispatch => {
    dispatch(deleteRiderStart());
    fetch(`${BASE_URL}/rider/delete/${riderId}/${role}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json", 
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteRiderFailed(resp.error));
        dispatch(deleteRiderSuccess(resp));
      })
      .catch(err => {
        dispatch(deleteRiderFailed(err.message));
      });
  }
}

export const declineApplicationStart = () => {
  return {
    type: DECLINE_APPLICATION_START
  }
}

export const declineApplicationSuccess = (data) => {
  return {
    type: DECLINE_APPLICATION_SUCCESS,
    data
  }
}

export const declineApplicationFailed = (error) => {
  return {
    type: DELETE_DRIVER_FAILED,
    error
  }
}

export const declineApplication = (riderId) => {
  return dispatch => {
    dispatch(declineApplicationStart());
    fetch(`${BASE_URL}/rider/decline/${riderId}`, {
      method: "PUT",
      "Content-Type": "application/json",
      ACCEPT: "application/json",
      "x-auth-token": token
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(declineApplicationFailed(resp.error));
        dispatch(declineApplicationSuccess(resp));
      })
      .catch(err => {
        dispatch(declineApplicationFailed(err.message));
      })
  }
}