import {
  ADD_POLICY_START,
  ADD_POLICY_SUCCESS,
  ADD_POLICY_FAILED,
  GET_POLICY_START,
  GET_POLICY_SUCCESS,
  GET_POLICY_FAILED,
  UPDATE_POLICY_START,
  UPDATE_POLICY_SUCCESS,
  UPDATE_POLICY_FAILED,
  DELETE_POLICY_START,
  DELETE_POLICY_SUCCESS,
  DELETE_POLICY_FAILED
} from "../../actions/privacyPolicy";

const initialState = {
  policy: {},
  addLoading: false,
  addSuccess: false,
  getLoading: false,
  getSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: ""
}

export const policyReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_POLICY_START:
      return {
        ...state,
        addLoading: true,
      }
    case ADD_POLICY_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        policy: action.data,
      }
    case ADD_POLICY_FAILED:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        error: action.error
      }
    case GET_POLICY_START:
      return {
        ...state,
        getLoading: true
      }
    case GET_POLICY_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        policy: action.data,
      }
    case GET_POLICY_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case UPDATE_POLICY_START:
      return {
        ...state,
        updateLoading: true,
      }
    case UPDATE_POLICY_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        policy: action.data,
      }
    case UPDATE_POLICY_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.error
      }
    case DELETE_POLICY_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_POLICY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        policy: action.data,
      }
    case DELETE_POLICY_FAILED:
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