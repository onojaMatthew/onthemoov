import {
  ADD_DRIVER_START,
  ADD_DRIVER_SUCCESS,
  ADD_DRIVER_FAILED,
  UPDATE_DRIVER_START,
  UPDATE_DRIVER_SUCCESS,
  UPDATE_DRIVER_FAILED,
  GET_DRIVER_START,
  GET_DRIVER_SUCCESS,
  GET_DRIVER_FAILED,
  GET_DRIVERS_START,
  GET_DRIVERS_SUCCESS,
  GET_DRIVERS_FAILED,
  ACTIVATE_DRIVER_START,
  ACTIVATE_DRIVER_SUCCESS,
  ACTIVATE_DRIVER_FAILED,
  DEACTIVATE_DRIVER_START,
  DEACTIVATE_DRIVER_SUCCESS,
  DEACTIVATE_DRIVER_FAILED,
  DELETE_DRIVER_START,
  DELETE_DRIVER_SUCCESS,
  DELETE_DRIVER_FAILED,
  DECLINE_APPLICATION_START,
  DECLINE_APPLICATION_SUCCESS,
  DECLINE_APPLICATION_FAILED,
} from "../../actions/driver";

const initialState = {
  
  riders: [],
  rider: {},
  createLoading: false,
  createSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  ridersLoading: false,
  ridersSuccess: false,
  riderLoading: false,
  riderSuccess: false,
  activateLoading: false,
  activateSuccess: false,
  deactivateLoading: false,
  deactivateSuccess: false,
  deleteRiderLoading: false,
  deleteRiderSuccess: false,
  declineLoading: false,
  declineSuccess: false,
  error: ""
}

export const riderReducer = (state=initialState, action) => {
  switch(action.type) {
    case ADD_DRIVER_START:
      return {
        ...state,
        createLoading:true
      }
    case ADD_DRIVER_SUCCESS:
      return {
        ...state,
        createLoading:false,
        createSuccess: true,
        rider: action.data,
      }
    case ADD_DRIVER_FAILED:
      return {
        ...state,
        createLoading:false,
        createSuccess: false,
        error: action.error
      }
    case UPDATE_DRIVER_START:
      return {
        ...state,
        updateLoading:true
      }
    case UPDATE_DRIVER_SUCCESS:
      return {
        ...state,
        updateLoading:false,
        updateSuccess: true,
        rider: action.data,
      }
    case UPDATE_DRIVER_FAILED:
      return {
        ...state,
        updateLoading:false,
        updateSuccess: false,
        error: action.error
      }
    case GET_DRIVER_START:
      return {
        ...state,
        riderLoading: true
      }
    case GET_DRIVER_SUCCESS:
      return {
        ...state,
        riderLoading: false,
        riderSuccess: true,
        rider: action.data,
      }
    case GET_DRIVER_FAILED:
      return {
        ...state,
        riderLoading: false,
        riderSuccess: false,
        error: action.error
      }
    case GET_DRIVERS_START:
      return {
        ...state,
        ridersLoading: true,
        
      }
    case GET_DRIVERS_SUCCESS:
      return {
        ...state,
        ridersLoading: false,
        ridersSuccess: true,
        riders: action.data,
      }
    case GET_DRIVERS_FAILED:
      return {
        ...state,
        riderLoading: false,
        riderSuccess: false,
        error: action.error
      }
    case ACTIVATE_DRIVER_START:
      return {
        ...state,
        activateLoading: true,
      }
    case ACTIVATE_DRIVER_SUCCESS:
      return {
        ...state,
        activateLoading: false,
        activateSuccess: true,
        rider: action.data,
      }
    case ACTIVATE_DRIVER_FAILED:
      return {
        ...state,
        activateLoading: false,
        riderSuccess: false,
        error: action.error
      }
    case DEACTIVATE_DRIVER_START:
      return {
        ...state,
        deactivateLoading: true,
      }
    case DEACTIVATE_DRIVER_SUCCESS:
      return {
        ...state,
        deactivateLoading: false,
        riderSuccess: true,
        rider: action.data,
      }
    case DEACTIVATE_DRIVER_FAILED:
      return {
        ...state,
        deactivateLoading: false,
        deactivateSuccess: false,
        error: action.error
      }
    case DELETE_DRIVER_START:
      return {
        ...state,
        deleteRiderLoading: true,
      }
    case DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        deleteRiderLoading: false,
        deleteRiderSuccess: true,
        riders: state.riders.filter(riders => riders._id !== action.data.riderId)
      }
    case DELETE_DRIVER_FAILED:
      return {
        ...state,
        deleteRiderLoading: false,
        deleteRiderSuccess: false,
        error: action.error
      }
    case DECLINE_APPLICATION_START:
      return {
        ...state,
        declineLoading: true
      }
    case DECLINE_APPLICATION_SUCCESS:
      return {
        ...state,
        declineLoading: false,
        declineSuccess: true,
        rider: action.data,
      }
    case DECLINE_APPLICATION_FAILED:
      return {
        ...state,
        declineLoading: false,
        declineSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}