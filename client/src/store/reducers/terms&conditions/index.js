import {
  ADD_TERMS_START,
  ADD_TERMS_SUCCESS,
  ADD_TERMS_FAILED,
  GET_TERMS_START,
  GET_TERMS_SUCCESS,
  GET_TERMS_FAILED,
  UPDATE_TERMS_START,
  UPDATE_TERMS_SUCCESS,
  UPDATE_TERMS_FAILED,
  DELETE_TERMS_START,
  DELETE_TERMS_SUCCESS,
  DELETE_TERMS_FAILED
} from "../../actions/terms&conditions";

const initialState = {
  term: {},
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

export const termsReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_TERMS_START:
      return {
        ...state,
        addLoading: true,
      }
    case ADD_TERMS_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        term: action.data,
      }
    case ADD_TERMS_FAILED:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        error: action.error
      }
    case GET_TERMS_START:
      return {
        ...state,
        getLoading: true
      }
    case GET_TERMS_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        term: action.data,
      }
    case GET_TERMS_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case UPDATE_TERMS_START:
      return {
        ...state,
        updateLoading: true,
      }
    case UPDATE_TERMS_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        term: action.data,
      }
    case UPDATE_TERMS_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.error
      }
    case DELETE_TERMS_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_TERMS_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        term: action.data,
      }
    case DELETE_TERMS_FAILED:
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