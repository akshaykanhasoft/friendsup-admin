import * as actionType from './actionType';
import axios from 'axios';
import Server from '../config';
import jwt from 'jsonwebtoken';
import fingerprint from 'fingerprintjs'

const dashboardSuccess = (result) => {
    return ({
        type: actionType.DASHBOARD_SUCCESS_DATA,
        payloads: result.data
    })
}

export const isExpireToken = (code) => {
    return ({
        type: actionType.IS_EXPIRE_TOKEN,
        data: code
    })
}

export const getAllModuleCountData = () => {
    let finderprint = new fingerprint().get();
    return dispatch => {
        try {
            // axios.post(Server.API + 'admin/getAllModuleCountData')
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.API + 'admin/getAllModuleCountData')
                .then(function (result) {
                    dispatch(dashboardSuccess(result))
                }).catch(function (error) {
                    if(error.response.data.code) {
                        return dispatch(isExpireToken(error.response.data.code))
                    }
                })
        } catch (error) {
            console.log("Error", error)
        }
    }
}



