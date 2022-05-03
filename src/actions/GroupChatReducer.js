import { GROUP_CHAT_SUCCESS } from '../actions/actionType'

const initialState = {
    get_group_chat_data: []
}

export default (state = initialState, action) => {
   switch (action.type) {
    case GROUP_CHAT_SUCCESS:
      return {...state, get_group_chat_data: action.payloads}
    default:
      return state
  }
}