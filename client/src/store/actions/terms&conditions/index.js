import { localAuth } from "../../../helper/authentcate";

export const ADD_TERMS_START = "ADD_TERMS_START";
export const ADD_TERMS_SUCCESS = "ADD_TERMS_SUCCESS";
export const ADD_TERMS_FAILED = "ADD_TERMS_FAILED";
export const GET_TERMS_START = "GET_TERMS_START";
export const GET_TERMS_SUCCESS = "GET_TERMS_SUCCESS";
export const GET_TERMS_FAILED = "GET_TERMS_FAILED";
export const UPDATE_TERMS_START = "UPDATE_TERMS_START";
export const UPDATE_TERMS_SUCCESS = "UPDATE_TERMS_SUCCESS";
export const UPDATE_TERMS_FAILED = "UPDATE_TERMS_FAILED";
export const DELETE_TERMS_START = "DELETE_TERMS_START";
export const DELETE_TERMS_SUCCESS = "DELETE_TERMS_SUCCESS";
export const DELETE_TERMS_FAILED = "DELETE_TERMS_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;
const token = localAuth().token && localAuth().token;

export const addTermsStart = () => {
  return {
    type: ADD_TERMS_START
  }
}

export const addTermsSuccess = (data) => {
  return {
    type: ADD_TERMS_SUCCESS,
    data
  }
}

export const addTermsFailed = (error) => {
  return {
    type: ADD_TERMS_FAILED,
    error
  }
}

export const addTerms = (data) => {
  return dispatch => {
    dispatch(addTermsStart());
    fetch(`${BASE_URL}/terms/new`, {
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
        if (resp.error) return dispatch(addTermsFailed(resp.error));
        dispatch(addTermsSuccess(resp));
      })
      .catch(err => {
        dispatch(addTermsFailed(err.message));
      });
  }
}

export const getTermsStart = () => {
  return {
    type: GET_TERMS_START
  }
}

export const getTermsSuccess = (data) => {
  return {
    type: GET_TERMS_SUCCESS,
    data
  }
}

export const getTermsFailed = (error) => {
  return {
    type: GET_TERMS_FAILED,
    error
  }
}

export const getTerms = () => {
  return dispatch => {
    dispatch(getTermsStart());
    fetch(`${BASE_URL}/terms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getTermsFailed(resp.error));
        dispatch(getTermsSuccess(resp));
      })
      .catch(err => {
        dispatch(getTermsFailed(err.message));
      });
  }
}

export const updateTermsStart = () => {
  return {
    type: UPDATE_TERMS_START
  }
}

export const updateTermsSuccess = (data) => {
  return {
    type: UPDATE_TERMS_SUCCESS,
    data
  }
}

export const updateTermsFailed = (error) => {
  return {
    type: UPDATE_TERMS_FAILED,
    error
  }
}

export const updateTerms = (data, id) => {
  console.log(data, "hey here data")
  return dispatch => {
    dispatch(updateTermsStart());
    fetch(`${BASE_URL}/terms/update/${id}`, {
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
        if (resp.error) return dispatch(updateTermsFailed(resp.error));
        dispatch(updateTermsSuccess(resp));
      })
      .then(() => {
        dispatch(getTerms());
      })
      .catch(err => {
        dispatch(updateTermsFailed(err.message));
      });
  }
}

export const deleteTermsStart = () => {
  return {
    type: DELETE_TERMS_START
  }
}

export const deleteTermsSuccess = (data) => {
  return {
    type: DELETE_TERMS_SUCCESS,
    data
  }
}
export const deleteTermsFailed = (error) => {
  return {
    type: DELETE_TERMS_FAILED,
    error
  }
}

export const deleteTerms = (id) => {
  return dispatch => {
    dispatch(deleteTermsStart());
    fetch(`${BASE_URL}/terms/delete/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteTermsFailed(resp.error));
        dispatch(deleteTermsSuccess(resp));
      })
      .catch(err => {
        dispatch(deleteTermsFailed(err.message));
      });
  }
}