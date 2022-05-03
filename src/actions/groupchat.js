import * as actionType from './actionType';
import axios from 'axios';
import Server from '../config'
import jwt from 'jsonwebtoken';
import fingerprint from 'fingerprintjs'
import { isExpireToken }from './dashboard';
const finderprint = new fingerprint().get();

const GroupChatSuccess = (result) => {
    return ({
        type: actionType.GROUP_CHAT_SUCCESS,
        payloads: result.data
    })
}

export const getAllGroupChatList = () => {
    return dispatch => {
        //axios.post(Server.API + 'admin/getGroups')
        var getApiToken = localStorage.getItem("__apiToken__")
        var Token = jwt.verify(getApiToken, finderprint.toString());
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
        axios.post(Server.API + 'admin/getGroups')
            .then(function (result) {
                dispatch(GroupChatSuccess(result))
            }).catch(function(error){
                //console.log("Error",error.response)
                if(error.response.data.code) {
                    return dispatch(isExpireToken(error.response.data.code))
                }
            })
    }

}