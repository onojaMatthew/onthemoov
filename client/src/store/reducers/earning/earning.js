import {
  GET_EARNINGS_START,
  GET_EARNINGS_SUCCESS,
  GET_EARNINGS_FAILED,
  GET_EARNING_START,
  GET_EARNING_SUCCESS,
  GET_EARNING_FAILED,
  RIDER_EARNING_START,
  RIDER_EARNING_SUCCESS,
  RIDER_EARNING_FAILED,
  DELETE_EARNING_START,
  DELETE_EARNING_SUCCESS,
  DELETE_EARNING_FAILED,
} from "../../actions/earning/";

const initialState = {
  earnings: [],
  earning: {},
  earningLoading: false,
  earningSuccess: false,
  getLoading: false,
  getSuccess: false,
  riderLoading: false,
  riderSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: ""
}

export const earningReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_EARNINGS_START:
      return {
        ...state,
        earningLoading: true
      }
    case GET_EARNINGS_SUCCESS:
      return {
        ...state,
        earningLoading: false,
        earningSuccess: true,
        earnings: action.data,
      }
    case GET_EARNINGS_FAILED:
      return {
        ...state,
        earningLoading: false,
        earningSuccess: false,
        error: action.error
      }
    case GET_EARNING_START:
      return {
        ...state,
        getLoading: true,
      }
    case GET_EARNING_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        earning: action.data,
      }
    case GET_EARNING_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case RIDER_EARNING_START:
      return {
        ...state,
        riderLoading: true,
      }
    case RIDER_EARNING_SUCCESS:
      return {
        ...state,
        riderLoading: false,
        riderSuccess: true,
        earnings: action.data,
      }
    case RIDER_EARNING_FAILED:
      return {
        ...state,
        riderLoading: false,
        riderSuccess: false,
        error: action.error
      }
    case DELETE_EARNING_START:
      return {
        ...state,
        deleteLoading: true,
      }
    case DELETE_EARNING_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        earning: action.data,
      }
    case DELETE_EARNING_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}