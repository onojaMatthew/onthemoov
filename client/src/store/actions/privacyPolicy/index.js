import { localAuth } from "../../../helper/authentcate";

export const ADD_POLICY_START = "ADD_POLICY_START";
export const ADD_POLICY_SUCCESS = "ADD_POLICY_SUCCESS";
export const ADD_POLICY_FAILED = "ADD_POLICY_FAILED";
export const GET_POLICY_START = "GET_POLICY_START";
export const GET_POLICY_SUCCESS = "GET_POLICY_SUCCESS";
export const GET_POLICY_FAILED = "GET_POLICY_FAILED";
export const UPDATE_POLICY_START = "UPDATE_POLICY_START";
export const UPDATE_POLICY_SUCCESS = "UPDATE_TERMS_SUCCESS";
export const UPDATE_POLICY_FAILED = "UPDATE_POLICY_FAILED";
export const DELETE_POLICY_START = "DELETE_POLICY_START";
export const DELETE_POLICY_SUCCESS = "DELETE_POLICY_SUCCESS";
export const DELETE_POLICY_FAILED = "DELETE_POLICY_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;
const token = localAuth().token && localAuth().token;

export const addPolicyStart = () => {
  return {
    type: ADD_POLICY_START
  }
}

export const addPolicySuccess = (data) => {
  return {
    type: ADD_POLICY_SUCCESS,
    data
  }
}

export const addPolicyFailed = (error) => {
  return {
    type: ADD_POLICY_FAILED,
    error
  }
}

export const addPolicy = (data) => {
  return dispatch => {
    dispatch(addPolicyStart());
    fetch(`${BASE_URL}/policy/new`, {
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
        if (resp.error) return dispatch(addPolicyFailed(resp.error));
        dispatch(addPolicySuccess(resp));
      })
      .catch(err => {
        dispatch(addPolicyFailed(err.message));
      });
  }
}

export const getPolicyStart = () => {
  return {
    type: GET_POLICY_START
  }
}

export const getPolicySuccess = (data) => {
  return {
    type: GET_POLICY_SUCCESS,
    data
  }
}

export const getPolicyFailed = (error) => {
  return {
    type: GET_POLICY_FAILED,
    error
  }
}

export const getPolicy = () => {
  return dispatch => {
    dispatch(getPolicyStart());
    fetch(`${BASE_URL}/policy`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getPolicyFailed(resp.error));
        dispatch(getPolicySuccess(resp));
      })
      .catch(err => {
        dispatch(getPolicyFailed(err.message));
      });
  }
}

export const updatePolicyStart = () => {
  return {
    type: UPDATE_POLICY_START
  }
}

export const updatePolicySuccess = (data) => {
  return {
    type: UPDATE_POLICY_SUCCESS,
    data
  }
}

export const updatePolicyFailed = (error) => {
  return {
    type: UPDATE_POLICY_FAILED,
    error
  }
}

export const updatePolicy = (data, id) => {
  return dispatch => {
    dispatch(updatePolicyStart());
    fetch(`${BASE_URL}/policy/update/${id}`, {
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
        if (resp.error) return dispatch(updatePolicyFailed(resp.error));
        dispatch(updatePolicySuccess(resp));
      })
      .then(() => {
        dispatch(getPolicy());
      })
      .catch(err => {
        dispatch(updatePolicyFailed(err.message));
      });
  }
}

export const deletePolicyStart = () => {
  return {
    type: DELETE_POLICY_START
  }
}

export const deletePolicySuccess = (data) => {
  return {
    type: DELETE_POLICY_SUCCESS,
    data
  }
}

export const deletePolicyFailed = (error) => {
  return {
    type: DELETE_POLICY_FAILED,
    error
  }
}

export const deletePolicy = (id) => {
  return dispatch => {
    dispatch(deletePolicyStart());
    fetch(`${BASE_URL}/policy/delete/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deletePolicyFailed(resp.error));
        dispatch(deletePolicySuccess(resp));
      })
      .catch(err => {
        dispatch(deletePolicyFailed(err.message));
      });
  }
}