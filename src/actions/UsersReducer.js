// import { LOGIN_SUCCESS } from '../container/home/type'
import {
  USERS_LIST_SUCCESS,
  MAIL_SEND_SUCCESS,
  MULTIPLE_MAIL_SEND_SUCCESS,
  NOTIFICATION_SEND_SUCCESS,
  USER_BLOCK_BY_ADMIN
} from '../actions/actionType'


const initialState = {
  get_all_users: [],
  send_mail_success_resp: "",
  send_mail_multiple_users_success: "",
  send_multiple_notifiation_success: "",
  user_block_by_admin: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_LIST_SUCCESS:
      return { ...state, get_all_users: action.payloads }
    case MAIL_SEND_SUCCESS:
      return { ...state, send_mail_success_resp: action.payloads }
    case MULTIPLE_MAIL_SEND_SUCCESS:
      return { ...state, send_mail_multiple_users_success: action.payloads }
    case NOTIFICATION_SEND_SUCCESS:
      return { ...state, send_multiple_notifiation_success: action.payloads }
    case USER_BLOCK_BY_ADMIN:
      return { ...state, user_block_by_admin: action.payloads }
    default:
      return state
  }
}