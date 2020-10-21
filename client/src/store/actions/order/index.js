import { localAuth } from "../../../helper/authentcate";

export const CREATE_ORDER_START = "CREATE_ORDER_START";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";

export const UPDATE_ORDER_START = "UPDATE_ORDER_START";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_FAILED = "UPDATE_ORDER_FAILED";

export const GET_ORDERS_START = "GET_ORDERS_START";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAILED = "GET_ORDERS_FAILED";

export const CUSTOMER_ORDER_START = "CUSTOMER_ORDER_START";
export const CUSTOMER_ORDER_SUCCESS = "CUSTOMER_ORDER_SUCCESS";
export const CUSTOMER_ORDER_FAILED = "CUSTOMER_ORDER_FAILED";

export const GET_ORDER_START = "GET_ORDER_START";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const DELETE_ORDER_START = "DELETE_ORDER_START";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_FAILED = "DELETE_ORDER_FAILED";

export const RIDER_ORDERS_START = "RIDER_ORDERS_START";
export const RIDER_ORDERS_SUCCESS = "RIDER_ORDERS_SUCCESS";
export const RIDER_ORDERS_FAILED = "RIDER_ORDERS_FAILED";

export const COMPLETE_TRIP_START = "COMPLETE_TRIP_START";
export const COMPLETE_TRIP_SUCCESS = "COMPLETE_TRIP_SUCCESS";
export const COMPLETE_TRIP_FAILED = "COMPLETE_TRIP_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;
const role = localAuth().user && localAuth().user.role;
const token = localAuth().token && localAuth().token;

export const getOrdersStart = () => {
  return {
    type: GET_ORDERS_START
  }
}

export const getOrdersSuccess = (data) => {
  return {
    type: GET_ORDERS_SUCCESS,
    data
  }
}

export const getOrdersFailed = (error) => {
  return {
    type: GET_ORDERS_FAILED,
    error
  }
}

export const getOrders = () => {
  return dispatch => {
    dispatch(getOrdersStart());
    fetch(`${BASE_URL}/order/all/${role}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getOrdersFailed(resp.error));
        dispatch(getOrdersSuccess(resp));
      })
      .catch(err => {
        dispatch(getOrdersFailed(err.message));
      });
  }
}

export const updateStart = () => {
  return {
    type: UPDATE_ORDER_START
  }
}

export const updateSuccess = (data) => {
  return {
    type: UPDATE_ORDER_SUCCESS,
    data
  }
}

export const updateFailed = (error) => {
  return {
    type: UPDATE_ORDER_FAILED,
    error
  }
}

export const updateOrder = (data, orderId) => {
  return dispatch => {
    dispatch(updateStart());
    fetch(`${BASE_URL}/order/update`, {
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
export const createOrderStart = () => {
  return {
    type: CREATE_ORDER_START
  }
}

export const createOrderSuccess = (data) => {
  return {
    type: CREATE_ORDER_SUCCESS,
    data
  }
}

export const createOrdeFailed = (error) => {
  return {
    type: CREATE_ORDER_FAILED,
    error
  }
}

export const createOrder = () => {
  return dispatch => {
    dispatch(createOrderStart());
    fetch(`${BASE_URL}/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
      
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(createOrdeFailed(resp.error));
        dispatch(createOrderSuccess(resp));
      })
      .catch(err => {
        dispatch(createOrdeFailed(err.message));
      });
  }
}

export const customerOrderStart = () => {
  return {
    type: CUSTOMER_ORDER_START
  }
}

export const customerOrderSuccess = (data) => {
  return {
    type: CUSTOMER_ORDER_SUCCESS,
    data
  }
}

export const customerOrderFailed = (error) => {
  return {
    type: CUSTOMER_ORDER_FAILED,
    error
  }
}

export const customerOrder = (data) => {
  return dispatch => {
    dispatch(customerOrderStart());
    fetch(`${BASE_URL}/order/create/new`, {
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
        if (resp.error) return dispatch(customerOrderFailed(resp.error));
        dispatch(customerOrderSuccess(resp));
      })
      .catch(err => {
        dispatch(customerOrderFailed(err.message));
      });
  }
}

export const getOrderStart = () => {
  return {
    type: GET_ORDER_START
  }
}

export const getOrderSuccess = (data) => {
  return {
    type: GET_ORDER_SUCCESS,
    data
  }
}

export const getOrderFailed = (error) => {
  return {
    type: GET_ORDER_FAILED,
    error
  }
}

export const getOrder = (orderId) => {
  return dispatch => {
    dispatch(getOrderStart());
    fetch(`${BASE_URL}/order/${orderId}/${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getOrderFailed(resp.error));
        dispatch(getOrderSuccess(resp));
      })
      .catch(err => {
        dispatch(getOrderFailed(err.message));
      });
  }
}

export const deleteStart = () => {
  return {
    type: DELETE_ORDER_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_ORDER_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_ORDER_FAILED,
    error
  }
}

export const deleteOrder = (orderId) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/order/delete/${orderId}/${role}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
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


export const riderOrdersStart = () => {
  return {
    type: RIDER_ORDERS_START
  }
}

export const riderOrdersSuccess = (data) => {
  return {
    type: RIDER_ORDERS_SUCCESS,
    data
  }
}

export const riderOrdersFailed = (error) => {
  return {
    type: RIDER_ORDERS_FAILED,
    error
  }
}

export const riderOrders = (riderId) => {
  return dispatch => {
    dispatch(riderOrdersStart());
    fetch(`${BASE_URL}/order/rider_orders/${riderId}/${role}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(riderOrdersFailed(resp.error));
        dispatch(riderOrdersSuccess(resp));
      })
      .catch(err => {
        dispatch(riderOrdersFailed(err.message));
      });
  }
}

export const completeTripStart = () => {
  return {
    type: COMPLETE_TRIP_START
  }
}

export const completeTripSuccess = (data) => {
  return {
    type: COMPLETE_TRIP_SUCCESS,
    data
  }
}

export const completeTripfailed = (error) => {
  return {
    type: COMPLETE_TRIP_FAILED,
    error
  }
}

export const completeTrip = (orderId, adminId) => {
  return dispatch => {
    dispatch(completeTripStart());
    fetch(`${BASE_URL}/order/admin/complete/${orderId}/${adminId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(completeTripfailed(resp.error));
        dispatch(completeTripSuccess(resp));
      })
      .then(() => {
        dispatch(getOrders());
      })
      .catch(err => {
        dispatch(completeTripfailed(err.message));
      });
  }
}