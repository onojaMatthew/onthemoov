import { localAuth } from "../../../helper/authentcate";

export const GET_NOTIFICATION_START = "GET_NOTIFICATION_START";
export const GET_NOTIFICATION_SUCCESS = "GET_NOTIFICATION_SUCCESS";
export const GET_NOTIFICATION_FAILED = "GET_NOTIFICATION_FAILED";
export const GET_NOTIFICATIONS_START = "GET_NOTIFICATIONS_START";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAILED = "GET_NOTIFICATIONS_FAILED";
export const DELETE_NOTIFICATION_START = "DELETE_NOTIFICATION_START";
export const DELETE_NOTIFICATION_SUCCESS = "DELETE_NOTIFICATION_SUCCESS";
export const DELETE_NOTIFICATION_FAILED = "DELETE_NOTIFICATION_FAILED";
export const VIEW_STATUS_START = "VIEW_STATUS_START";
export const VIEW_STATUS_SUCCESS = "VIEW_STATUS_SUCCESS";
export const VIEW_STATUS_FAILED = "VIEW_STATUS_FAILED";
export const REPLY_START = "REPLY_START";
export const REPLY_SUCCESS = "REPLY_SUCCESS";
export const REPLY_FAILED = "REPLY_FAILED";

const token = localAuth().token && localAuth().token;
const role = localAuth().user && localAuth().user.role;

const BASE_URL = process.env.REACT_APP_API_URL;

export const getNotificationStart = () => {
  return {
    type: GET_NOTIFICATION_START
  }
}

export const getNotificationSuccess = (data) => {
  return {
    type: GET_NOTIFICATION_SUCCESS,
    data
  }
}

export const getNotificationFailed = (error) => {
  return {
    type: GET_NOTIFICATION_FAILED,
    error
  }
}

export const getNotification = (notificationId) => {
  return dispatch => {
    dispatch(getNotificationStart());
    fetch(`${BASE_URL}/contact/${role}/${notificationId}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getNotificationFailed(resp.error));
        dispatch(getNotificationSuccess(resp));
      })
      .catch(err => {
        dispatch(getNotificationFailed(err.message));
      });
  }
}

export const getNotificationsStart = () => {
  return {
    type: GET_NOTIFICATIONS_START
  }
}

export const getNotificationsSuccess = (data) => {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    data
  }
}

export const getNotificationsFailed = (error) => {
  return {
    type: GET_NOTIFICATIONS_FAILED,
    error
  }
}

export const getNotifications = () => {
  return dispatch => {
    dispatch(getNotificationsStart());
    fetch(`${BASE_URL}/contact/${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getNotificationsFailed(resp.error));
        dispatch(getNotificationsSuccess(resp));
      })
      .catch(err => {
        dispatch(getNotificationsFailed(err.message));
      });
  }
}

export const deleteNotificationStart = () => {
  return {
    type: DELETE_NOTIFICATION_START
  }
}

export const deleteNotificationSuccess = (data) => {
  return {
    type: DELETE_NOTIFICATION_SUCCESS,
    data
  }
}

export const deleteNotificationFailed = (error) => {
  return {
    type: DELETE_NOTIFICATION_FAILED,
    error
  }
}

export const deleteNotification = (notificationId) => {
  return dispatch => {
    dispatch(deleteNotificationStart());
    fetch(`${BASE_URL}/contact/${role}/${notificationId}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteNotificationFailed(resp.error));
        dispatch(deleteNotificationSuccess(resp));
      })
      .then(() => {
        dispatch(getNotifications());
      })
      .catch(err => {
        dispatch(deleteNotificationFailed(err.message));
      });
  }
}

export const viewStart = () => {
  return {
    type: VIEW_STATUS_START
  }
}

export const viewSuccess = (data) => {
  return {
    type: VIEW_STATUS_SUCCESS,
    data
  }
}

export const viewFailed = (error) => {
  return {
    type: VIEW_STATUS_FAILED,
    error
  }
}

export const viewStatus = (notificationId) => {
  return dispatch => {
    dispatch(viewStart());
    fetch(`${BASE_URL}/contact/view_status/${notificationId}`, {
      method: "PUT",
      headers: {
        ACCEPT: "applicaton/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(viewFailed(resp.error));
        dispatch(viewSuccess(resp));
      })
      .catch(err => {
        dispatch(viewFailed(err.message));
      });
  }
}

export const replyStart = () => {
  return {
    type: REPLY_START
  }
}

export const replySuccess = (data) => {
  return {
    type: REPLY_SUCCESS,
    data
  }
}

export const replyFailed = (error) => {
  return {
    type: REPLY_FAILED,
    error
  }
}

export const reply = (notificationId, data) => {
  return dispatch => {
    dispatch(replyStart());
    fetch(`${BASE_URL}/contact/reply/${notificationId}`, {
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
        if (resp.error) return dispatch(replyFailed(resp.error));
        dispatch(replySuccess(resp));
      })
      .then(() => {
        dispatch(getNotification(notificationId));
      })
      .catch(err => {
        dispatch(replyFailed(err.message));
      });
  }
}

