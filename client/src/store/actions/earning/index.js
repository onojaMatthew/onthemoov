import { localAuth } from "../../../helper/authentcate";

export const GET_EARNINGS_START = "GET_EARNINGS_START";
export const GET_EARNINGS_SUCCESS =  "GET_EARNINGS_SUCCESS";
export const GET_EARNINGS_FAILED = "GET_EARNINGS_FAILED";
export const GET_EARNING_START = "GET_EARNING_START";
export const GET_EARNING_SUCCESS = "GET_EARNING_SUCCESS";
export const GET_EARNING_FAILED = "GET_EARNING_FAILED";
export const RIDER_EARNING_START = "RIDER_EARNING_START";
export const RIDER_EARNING_SUCCESS = "RIDER_EARNING_SUCCESS";
export const RIDER_EARNING_FAILED = "RIDER_EARNING_FAILED";
export const DELETE_EARNING_START = "DELETE_EARNING_START";
export const DELETE_EARNING_SUCCESS = "DELETE_EARNING_SUCCESS";
export const DELETE_EARNING_FAILED = "DELETE_EARNING_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;
const token = localAuth().token && localAuth().token;
const role = localAuth().user && localAuth().user.role;

export const getEarningsStart = () => {
  return {
    type: GET_EARNINGS_START
  }
}

export const getEarningsSuccess = (data) => {
  return {
    type: GET_EARNINGS_SUCCESS,
    data
  }
}

export const getEarningsFailed = (error) => {
  return {
    type: GET_EARNINGS_FAILED,
    error
  }
}

export const getEarnings = () => {
  return dispatch => {
    dispatch(getEarningsStart());
    fetch(`${BASE_URL}/earning/all/${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getEarningsFailed(resp.error));
        dispatch(getEarningsSuccess(resp));
      })
      .catch(err => {
        dispatch(getEarningsFailed(err.message));
      });
  }
}

export const getEarningStart = () => {
  return {
    type: GET_EARNING_START
  }
}

export const getEarningSuccess = (data) => {
  return {
    type: GET_EARNING_SUCCESS,
    data
  }
}

export const getEarningFailed = (error) => {
  return {
    type: GET_EARNING_FAILED,
    error
  }
}

export const getEarning = (earningId) => {
  return dispatch => {
    dispatch(getEarningStart());
    fetch(`${BASE_URL}/earning/${earningId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getEarningFailed(resp.error));
        dispatch(getEarningSuccess(resp));
      })
      .catch(err => {
        dispatch(getEarningFailed(err.message));
      });
  }
}

export const getRiderEarningStart = () => {
  return {
    type: RIDER_EARNING_START
  }
}

export const getRiderEarningSuccess = (data) => {
  return {
    type: RIDER_EARNING_SUCCESS,
    data
  }
}

export const getRiderEarningFailed = (error) => {
  return {
    type: RIDER_EARNING_FAILED,
    error
  }
}

export const getRiderEarnings = (riderId) => {
  return dispatch => {
    dispatch(getRiderEarningStart());
    fetch(`${BASE_URL}/earning/rider/${riderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getRiderEarningFailed(resp.error));
        dispatch(getRiderEarningSuccess(resp));
      })
      .catch(err => {
        dispatch(getRiderEarningFailed(err.message));
      });
  }
}

export const deleteEarningStart = () => {
  return {
    type: DELETE_EARNING_START
  }
}

export const deleteEarningSuccess = (data) => {
  return {
    type: DELETE_EARNING_SUCCESS,
    data
  }
}

export const deleteEarningFailed = (error) => {
  return {
    type: DELETE_EARNING_FAILED,
    error
  }
}

export const deleteEarning = (earningId) => {
  return dispatch => {
    dispatch(deleteEarningStart());
    fetch(`${BASE_URL}/earning/delete/${earningId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteEarningFailed(resp.error));
        dispatch(deleteEarningSuccess(resp));
      })
      .catch(err => {
        dispatch(deleteEarningFailed(err.message));
      });
  }
}
// router.get("/earning/all/:role", getEarnings);
// router.get("/earning/:earningId", getEanrning);
// router.get("/earning/rider/:riderId", getEarningsByRider);
// router.delete("/earning/delete/:earningId", deleteEarning);