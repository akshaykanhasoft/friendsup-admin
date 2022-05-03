// import { LOGIN_SUCCESS } from '../container/home/type'
import { GROUP_SUCCESS,GROUP_DETAILS_SUCCESS,REPORT_ABUSE_DETAILS_SUCCESS } from '../actions/actionType'

const initialState = {
    get_group_data: [],
    get_group_post_data: [],
    get_report_abuse_by_post_id: []
}

export default (state = initialState, action) => {
   switch (action.type) {
    case GROUP_SUCCESS:
      return {...state, get_group_data: action.payloads}
    case GROUP_DETAILS_SUCCESS:
      return {...state, get_group_post_data: action.payloads}  
    case REPORT_ABUSE_DETAILS_SUCCESS: 
        return{...state, get_report_abuse_by_post_id: action.payloads}  
    default:
      return state
  }
}