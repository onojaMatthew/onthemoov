import Auth from "../../../helper/Auth"

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTRATION_START = "REGISTRATION_START";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const FORGOT_EMAIL_START = "FORGOT_EMAIL_START";
export const FORGOT_EMAIL_SUCCESS = "FORGOT_EMAIL_SUCCESS";
export const FORGOT_EMAIL_FAILED = "FORGOT_EMAIL_FAILED";

export const RESET_PASSWORD_START = "RESET_PASSWORD_START";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

export const registerStart = () => {
  return {
    type: REGISTER_START
  }
}

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    data
  }
}

export const registerFailed = (error) => {
  return {
    type: REGISTER_FAILED,
    error
  }
}

export const register = (data, userType) => {
  return dispatch => {
    dispatch(registerStart());
    fetch(`${BASE_URL}/customer/new/${userType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(registerFailed(resp.error));
        dispatch(registerSuccess(resp));
      })
      .catch(err => {
        dispatch(registerFailed(err.message));
      });
  }
}

export const registrationStart = () => {
  return {
    type: REGISTRATION_START
  }
}

export const registrationSuccess = (data) => {
  return {
    type: REGISTRATION_SUCCESS,
    data
  }
}

export const registrationFailed = (error) => {
  return {
    type: REGISTRATION_FAILED,
    error
  }
}

export const registration = (data, userType) => {
  return dispatch => {
    dispatch(registrationStart());
    fetch(`${BASE_URL}/signup/${userType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(registrationFailed(resp.error));
        dispatch(registrationSuccess(resp));
      })
      .catch(err => {
        dispatch(registrationFailed(err.message));
      });
  }
}

export const loginStart = () => {
  return {
    type: LOGIN_START
  }
}

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export const login = (data, userType) => {
  return dispatch => {
    dispatch(loginStart())
    fetch(`${BASE_URL}/login/${userType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        console.log(resp, "this resp")
        if (resp.error) return dispatch(loginFailed(resp.error));
        Auth.authenticateUser(JSON.stringify(resp));
        dispatch(loginSuccess(resp));
      })
      .catch(err => {
        dispatch(loginFailed(err.messagge));
      });
  }
}

export const forgotStart = () => {
  return {
    type: FORGOT_EMAIL_START
  }
}

export const forgotSuccess = (data) => {
  return {
    type: FORGOT_EMAIL_SUCCESS,
    data
  }
}

export const forgotFailed = (error) => {
  return {
    type: FORGOT_EMAIL_FAILED,
    error
  }
}

export const forgotPassword = (data, userType) => {
  return dispatch => {
    dispatch(forgotStart());
    fetch(`${BASE_URL}/auth/recover/${userType}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(forgotFailed(resp.error));
        dispatch(forgotSuccess(resp));
      })
      .catch(err => {
        dispatch(forgotFailed(err.message));
      });
  }
}

export const resetStart = () => {
  return {
    type: RESET_PASSWORD_START
  }
}

export const resetSuccess = (data) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    data
  }
}

export const resetFailed = (error) => {
  return {
    type: RESET_PASSWORD_FAILED,
    error
  }
}

export const resetPassword = (data, userType) => {
  return dispatch => {
    dispatch(resetStart());
    fetch(`${BASE_URL}/auth/reset_password/${userType}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(resetFailed(resp.error));
        dispatch(resetSuccess(resp));
      })
      .catch(err => {
        dispatch(resetFailed(err.message));
      });
  }
}