import {
  ADD_VEHICLE_START,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_FAILED,
  GET_VEHICLES_START,
  GET_VEHICLES_SUCCESS,
  GET_VEHICLES_FAILED,
  GET_VEHICLE_START,
  GET_VEHICLE_SUCCESS,
  GET_VEHICLE_FAILED,
  UPDATE_VEHICLE_START,
  UPDATE_VEHICLE_SUCCESS,
  UPDATE_VEHICLE_FAILED,
  DELETE_VEHICLE_START,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAILED,
} from "../../actions/vehicle";

const initialState = {
  vehicles: [],
  vehicle: {},
  addLoading: false,
  addSuccess: false,
  deleteVehicleLoading: false,
  deleteVehicleSuccess: false,
  updateVehicleLoading: false,
  udpateVehicleSuccess: false,
  getVehicleLoading: false,
  getVehicleSuccess: false,
  getVehiclesLoading: false,
  getVehiclesSuccess: false,
  error: ""
}

export const vehicleReducer = (state=initialState,action) => {
  switch(action.type) {
    case ADD_VEHICLE_START:
      return {
        ...state,
        addLoading: true,
        
      }
    case ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        vehicles: state.vehicles.concat(action.data),
      }
    case ADD_VEHICLE_FAILED:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        error: action.error
      }
    case GET_VEHICLES_START:
      return {
        ...state,
        getVehiclesLoading: true,
      }
    case GET_VEHICLES_SUCCESS:
      return {
        ...state,
        getVehiclesLoading: false,
        getVehiclesSuccess: true,
        vehicles: action.data,
      }
    case GET_VEHICLES_FAILED:
      return {
        ...state,
        getVehiclesLoading: false,
        getVehiclesSuccess: false,
        error: action.error
      }
    case GET_VEHICLE_START:
      return {
        ...state,
        getVehicleLoading: true,
      }
    case GET_VEHICLE_SUCCESS:
      return {
        ...state,
        getVehicleLoading: false,
        getVehicleSuccess: true,
        vehicle: action.data,
      }
    case GET_VEHICLE_FAILED:
      return {
        ...state,
        getVehicleLoading: false,
        getVehicleSuccess: false,
        error: action.error
      }
    case UPDATE_VEHICLE_START:
      return {
        ...state,
        updateVehicleLoading: true,
      }
    case UPDATE_VEHICLE_SUCCESS:
      return {
        ...state,
        updateVehicleLoading: false,
        updateVehicleSuccess: true,
        vehicle: action.data,
      }
    case UPDATE_VEHICLE_FAILED:
      return {
        ...state,
        updateVehicleLoading: false,
        updateVehicleSuccess: false,
        error: action.error
      }
    case DELETE_VEHICLE_START:
      return {
        ...state,
        deleteVehicleLoading: true,
      }
    case DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        deleteVehicleLoading: false,
        deleteVehicleSuccess: true,
        vehicles: state.vehicles.concat(action.data),
      }
    case DELETE_VEHICLE_FAILED:
      return {
        ...state,
        deleteVehicleLoading: false,
        deleteVehicleSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}