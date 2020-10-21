import {
  CALCULATE_PRICE_START,
  CALCULATE_PRICE_SUCCESS,
  CALCULATE_PRICE_FAILED,
  GET_LATLNG_START,
  GET_LATLNG_SUCCESS,
  GET_LATLNG_FAILED,
  GET_DELIVERY_COORD_START,
  GET_DELIVERY_COORD_SUCCESS,
  GET_DELIVERY_COORD_FAILED,
} from "../../actions/calculator";

const initialState = {
  cost: {},
  results: [],
  deliveryCoord: [],
  loading: false,
  success: false,
  latLoading: false,
  latSuccess: false,
  error: ""
}

export const priceReducer = (state = initialState, action) => {
  switch(action.type) {
    case CALCULATE_PRICE_START:
      return {
        ...state,
        loading: true
      }
    case CALCULATE_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        cost: action.data,
      }
    case CALCULATE_PRICE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_LATLNG_START:
      return {
        ...state,
        latLoading: true,
      }
    case GET_LATLNG_SUCCESS:
      return {
        ...state,
        latLoading: false,
        latSuccess: true,
        results: action.data,
      }
    case GET_LATLNG_FAILED:
      return {
        ...state,
        latLoading: false,
        latSuccess: false,
        error: action.error
      }
    case GET_DELIVERY_COORD_START:
      return {
        ...state,
        latLoading: true,
      }
    case GET_DELIVERY_COORD_SUCCESS:
      return {
        ...state,
        latLoading: false,
        latSuccess: true,
        deliveryCoord: action.data,
      }
    case GET_DELIVERY_COORD_FAILED:
      return {
        ...state,
        latLoading: false,
        latSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}