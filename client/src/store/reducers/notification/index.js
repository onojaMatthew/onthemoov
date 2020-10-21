import {
  GET_NOTIFICATION_START,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAILED,
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILED,
  DELETE_NOTIFICATION_START,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILED,
  VIEW_STATUS_START,
  VIEW_STATUS_SUCCESS,
  VIEW_STATUS_FAILED,
  REPLY_START,
  REPLY_SUCCESS,
  REPLY_FAILED,
} from "../../actions/notification";

const initialState = {
  notifications: [],
  notification: {},
  getNotificationLoading: false,
  getNotificationSuccess: false,
  getNotificationsLoading: false,
  deleteNotificationLoading: false,
  deleteNotificationSuccess: false,
  replyLoading: false,
  replySuccess: false,
  viewStatusLoading: false,
  viewStatusSuccess: false,
  error: ""
}

export const notificationReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_NOTIFICATION_START:
      return {
        ...state,
        getNotificationLoading: true,
      }
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        getNotificationLoading: false,
        getNotificationSuccess: true,
        notification: action.data,
      }
    case GET_NOTIFICATION_FAILED:
      return {
        ...state,
        getNotificationLoading: false,
        getNotificationSuccess: false,
        error: action.error
      }
    case GET_NOTIFICATIONS_START:
      return {
        ...state,
        getNotificationsLoading: true
      }
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        getNotificationsLoading: false,
        getNotificationsSuccess: true,
        notifications: action.data,
      }
    case GET_NOTIFICATIONS_FAILED:
      return {
        ...state,
        getNotificationsLoading: false,
        getNotificationsSuccess: false,
        error: action.error
      }
    case DELETE_NOTIFICATION_START:
      return {
        ...state,
        deleteNotificationLoading: true
      }
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        deleteNotificationLoading: false,
        deleteNotificationSuccess: true,
        notification: action.data,
      }
    case DELETE_NOTIFICATION_FAILED:
      return {
        ...state,
        deleteNotificationLoading: false,
        deleteNotificationSuccess: false,
        error: action.error
      }
      case VIEW_STATUS_START:
        return {
          ...state,
          viewStatusLoading: true,
        }
      case VIEW_STATUS_SUCCESS:
        return {
          ...state,
          viewStatusLoading: false,
          viewStatusSuccess: true,
          // notification: action.data,
        }
      case VIEW_STATUS_FAILED:
        return {
          ...state,
          replyLoading: false,
          replySuccess: false,
          error: action.error
        }
      case REPLY_START:
        return {
          ...state,
          replyLoading: true,
        }
      case REPLY_SUCCESS:
        return {
          ...state,
          replyLoading: false,
          replySuccess: true,
          notification: action.data,
        }
      case REPLY_FAILED:
        return {
          ...state,
          replyLoading: false,
          replySuccess: false,
          error: action.error
        }
    default:
      return state;
  }
}