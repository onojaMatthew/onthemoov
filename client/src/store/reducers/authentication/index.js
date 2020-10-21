import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FORGOT_EMAIL_START,
  FORGOT_EMAIL_SUCCESS,
  FORGOT_EMAIL_FAILED,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from "../../actions/authentication";

const initialState = {
  auths: [],
  auth: {},
  loginLoading: false,
  loginSuccess: false,
  registerLoading: false,
  registerSuccess: false,
  signupLoading: false,
  signupSuccess: false,
  forgotLoading: false,
  forgotSuccess: false,
  resetLoading: false,
  resetSuccess: false,
  error: ""
}

export const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case REGISTER_START:
      return {
        ...state,
        registerLoading: true,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: true,
        auths: state.auths.concat(action.data),
      }
    case REGISTER_FAILED:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: false,
        error: action.error
      }
    case REGISTRATION_START:
      return {
        ...state,
        signupLoading: true
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupSuccess: true,
        auths: state.auths.concat(action.data)
      }
    case REGISTRATION_FAILED:
      return {
        ...state,
        signupLoading: false,
        signupSuccess: false,
        error: action.error
      }
    case LOGIN_START:
      return {
        ...state,
        loginLoading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        auth: action.data,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        error: action.error
      }
    case FORGOT_EMAIL_START:
      return {
        ...state,
        forgotLoading: true,
       
      }
    case FORGOT_EMAIL_SUCCESS:
      return {
        ...state,
        forgotLoading: false,
        forgotSuccess: true,
        auth: action.data,
      }
    case FORGOT_EMAIL_FAILED:
      return {
        ...state,
        forgotLoading: false,
        forgotSuccess: false,
        error: action.error
      }
    case RESET_PASSWORD_START:
      return {
        ...state,
        resetLoading: true,
        resetSuccess: false,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetLoading: false,
        resetSuccess: true,
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetLoading: false,
        resetSuccess: false,
        error: action.error
      }
    default: 
      return state;
  }
}