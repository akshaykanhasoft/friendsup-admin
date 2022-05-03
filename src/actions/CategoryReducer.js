import {
  CATEGORY_SUCCESS,
  MAIN_CATEGORY_SUCCESS,
  USERS_LIST_SUCCESS,
  EVENT_CATEGORY_SUCCESS,
  CATEGORY_SAVE_SUCCESS,
  EDIT_CATEGORY_SUCEESS
} from '../actions/actionType'

const initialState = {
  get_category_data: [],
  get_main_intrest_category: [],
  get_all_users: [],
  get_event_category: [],
  save_category: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_SUCCESS:
      return { ...state, get_category_data: action.payloads }
    case MAIN_CATEGORY_SUCCESS:
      return { ...state, get_main_intrest_category: action.payloads }
    case USERS_LIST_SUCCESS:
      return { ...state, get_all_users: action.payloads }
    case EVENT_CATEGORY_SUCCESS:
      return { ...state, get_event_category: action.payloads }
    case CATEGORY_SAVE_SUCCESS:
      return { ...state, save_category: action.payloads }
    case EDIT_CATEGORY_SUCEESS:
      return { ...state, edit_category: action.payloads }
    default:
      return state
  }
}