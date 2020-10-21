import {
  CREATE_ORDER_START,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  UPDATE_ORDER_START,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILED,
  GET_ORDERS_START,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
  GET_ORDER_START,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  DELETE_ORDER_START,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILED,
  RIDER_ORDERS_START,
  RIDER_ORDERS_SUCCESS,
  RIDER_ORDERS_FAILED,
  CUSTOMER_ORDER_START,
  CUSTOMER_ORDER_SUCCESS,
  CUSTOMER_ORDER_FAILED,
  COMPLETE_TRIP_START,
  COMPLETE_TRIP_SUCCESS,
  COMPLETE_TRIP_FAILED,
} from "../../actions/order";

const initialState = {
  orders: [],
  order: {},
  createLoading: false,
  createSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  ordersLoading: false,
  ordersSuccess: false,
  orderLoading: false,
  orderSuccess: false,
  orderDeleteLoading: false,
  orderDeleteSuccess: false,
  riderOrderLoading: false,
  riderOrderSuccess: false,
  customerorderLoading: false,
  customerorderSuccess: false,
  completeLoading: false,
  completeSuccess: false,
  error: ""
}

export const orderReducer = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_ORDER_START:
      return {
        ...state,
        createLoading: true,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
        orders: state.orders.concat(action.data),
      }
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        createLoading: false,
        createSuccess: false,
        error: action.error
      }
    case UPDATE_ORDER_START:
      return {
        ...state,
        updateLoading: true
      }
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        order: action.data,
      }
    case UPDATE_ORDER_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.error
      }
    case GET_ORDERS_START:
      return {
        ...state,
        ordersLoading: true
      }
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        ordersLoading: false,
        ordersSuccess: true,
        orders: action.data,
      }
    case GET_ORDERS_FAILED:
      return {
        ...state,
        ordersLoading: false,
        ordersSuccess: false,
        error: action.error
      }
    case GET_ORDER_START:
      return {
        ...state,
        orderLoading: true,
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderSuccess: true,
        order: action.data,
      }
    case GET_ORDER_FAILED:
      return {
        ...state,
        orderLoading: false,
        orderSuccess: false,
        error: action.error
      }
    case DELETE_ORDER_START:
      return {
        ...state,
        orderDeleteLoading: true,
        
      }
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        ordersDeleteLoading: false,
        ordersDeleteSuccess: true,
        orders: state.orders.filter(orders => orders._id !== action.data.orderId),
      }
    case DELETE_ORDER_FAILED:
      return {
        ...state,
        ordersDeleteLoading: false,
        ordersDeleteSuccess: false,
        error: action.error
      }
    case RIDER_ORDERS_START:
      return {
        ...state,
        riderOrderLoading: true
      }
    case RIDER_ORDERS_SUCCESS:
      return {
        ...state,
        riderOrderLoading: false,
        riderOrderSucces: true,
        orders: action.data,
      }
    case RIDER_ORDERS_FAILED:
      return {
        ...state,
        riderOrderLoading: false,
        riderOrderSucces: false,
        error: action.error
      }
    case CUSTOMER_ORDER_START:
      return {
        ...state,
        customerorderLoading: true
      }
    case CUSTOMER_ORDER_SUCCESS:
      return {
        ...state,
        customerorderLoading: false,
        customerorderSuccess: true,
        orders: state.orders.concat(action.data),
      }
    case CUSTOMER_ORDER_FAILED:
      return {
        ...state,
        customerorderLoading: false,
        customerorderSuccess: false,
        error: action.error
      }
    case COMPLETE_TRIP_START:
      return {
        ...state,
        completeLoading: true,
      }
    case COMPLETE_TRIP_SUCCESS:
      return {
        ...state,
        completeLoading: false,
        completeSuccess: true,
        order: action.data,
      }
    case COMPLETE_TRIP_FAILED:
      return {
        ...state,
        completeLoading: false,
        completeSuccess: false,
        error: action.error
      }
    default: 
      return state;
  }
}