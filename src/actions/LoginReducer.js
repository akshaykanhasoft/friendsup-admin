// import { LOGIN_SUCCESS } from '../container/home/type'
import { LOGIN_SUCCESS,LOGIN_DATA_SAVE_TO_LOCALSTORAGE, 
    LOGIN_FAIL, ADMIN_RESET_PASSWORD, ADMIN_URL_CHECK_EXPIRE_ORNOT,
    ADMIN_RESET_PASSWORD_DONE,
    ADMIN_EMAIL_CHECK
   } from '../actions/actionType'

const initialState = {
    get_login_data: [],
    login_data_save_to_local_storage: "",
    login_fail: "",
    admin_reset_password: "",
    reset_password_url_expire_check: [],
    reset_password_done: "",
    admin_check_email: ""
}

export default (state = initialState, action) => {
   switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, get_login_data: action.payload}
    case LOGIN_DATA_SAVE_TO_LOCALSTORAGE:
      return {...state, login_data_save_to_local_storage: action.payload}  
    case LOGIN_FAIL:
      return {...state, login_fail: action.payload}  
    case ADMIN_RESET_PASSWORD:
      return {...state, admin_reset_password: action.payload}  
    case ADMIN_URL_CHECK_EXPIRE_ORNOT:
      return {...state,reset_password_url_expire_check: action.payload}  
    case ADMIN_RESET_PASSWORD_DONE:
      return {...state,reset_password_done: action.payload}  
    case ADMIN_EMAIL_CHECK:
        return{...state, admin_check_email: action.payload}  
    default:
      return state
  }
}
