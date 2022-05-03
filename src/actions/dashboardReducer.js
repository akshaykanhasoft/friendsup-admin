import { DASHBOARD_SUCCESS_DATA, ADMIN_LOGIN_DATA_SAVE, IS_EXPIRE_TOKEN } from '../actions/actionType'

const initialState = {
  get_dashboard_list: [],
  admin_login_data: [],
  token_expire: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_SUCCESS_DATA:
      return { ...state, get_dashboard_list: action.payloads }
    case ADMIN_LOGIN_DATA_SAVE:
      return { ...state, admin_login_data: action.payload }
    case IS_EXPIRE_TOKEN:
      return {...state, token_expire: action.data}
    default:
      return state
  }
}
