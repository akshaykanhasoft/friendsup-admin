import { EVENTS_SUCCESS } from '../actions/actionType'

const initialState = {
    get_event_data: []
}

export default (state = initialState, action) => {
   switch (action.type) {
    case EVENTS_SUCCESS:
      return {...state, get_event_data: action.payloads}
    default:
      return state
  }
}