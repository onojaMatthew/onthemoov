import { localAuth } from "../../../helper/authentcate";
export const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
export const GET_CUSTOMERS_START = "GET_CUSTOMERS_START";
export const GET_CUSTOMERS_FAILED = "GET_CUSTOMERS_FAILED";
export const GET_CUSTOMER_START = "GET_CUSTOMER_START";
export const GET_CUSTOMER_SUCCESS = "GET_CUSTOMER_SUCCESS";
export const GET_CUSTOMER_FAILED = "GET_CUSTOMER_FAILED";
export const DELETE_CUSTOMER_START = "DELETE_CUSTOMER_START";
export const DELETE_CUSTOMER_SUCCESS = "DELETE_CUSTOMER_SUCCESS";
export const DELETE_CUSTOMER_FAILED = "DELETE_CUSTOMER_FAILED";

const role = localAuth() && localAuth().user && localAuth().user.role;
const token = localAuth() && localAuth().token;

const BASE_URL = process.env.REACT_APP_API_URL;

export const getCustomerStart = () => {
  return {
    type: GET_CUSTOMER_START
  }
}

export const getCustomerSuccess = (data) => {
  return {
    type: GET_CUSTOMER_SUCCESS,
    data
  }
}

export const getCustomerFailed = (error) => {
  return {
    type: GET_CUSTOMER_FAILED,
    error
  }
}

export const getCustomer = (customerId) => {
  return dispatch => {
    dispatch(getCustomerStart());
    fetch(`${BASE_URL}/customer/${role}/${customerId}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getCustomerFailed(resp.error));
        dispatch(getCustomerSuccess(resp));
      })
      .catch(err => {
        dispatch(getCustomerFailed(err.message));
      });
  }
}

export const getCustomersStart = () => {
  return {
    type: GET_CUSTOMERS_START
  }
}

export const getCustomersSuccess = (data) => {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    data
  }
}

export const getCustomersFailed = (error) => {
  return {
    type: GET_CUSTOMERS_FAILED,
    error
  }
}

export const getCustomers = () => {
  return dispatch => {
    dispatch(getCustomersStart());
    fetch(`${BASE_URL}/customer/${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getCustomersFailed(resp.error));
        dispatch(getCustomersSuccess(resp));
      })
      .catch(err => {
        dispatch(getCustomersFailed(err.message));
      });
  }
}

export const deleteCustomerStart = () => {
  return {
    type: DELETE_CUSTOMER_START
  }
}

export const deleteCustomerSuccess = (data) => {
  return {
    type: DELETE_CUSTOMER_SUCCESS,
    data
  }
}

export const deleteCustomerFailed = (error) => {
  return {
    type: DELETE_CUSTOMER_FAILED,
    error
  }
}

export const deleteCustomer = (customerId) => {
  return dispatch => {
    dispatch(deleteCustomerStart());
    fetch(`${BASE_URL}/customer/delete/${customerId}/${role}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token     
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteCustomerFailed(resp.error));
        dispatch(deleteCustomerSuccess(resp));
      })
      .catch(err => {
        dispatch(deleteCustomerFailed(err.message));
      });
  }
}