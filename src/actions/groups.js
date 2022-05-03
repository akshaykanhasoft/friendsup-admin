import * as actionType from './actionType';
import axios from 'axios';
import Server from '../config'
import jwt from 'jsonwebtoken';
import fingerprint from 'fingerprintjs'
import { isExpireToken } from './dashboard';
import { toast } from 'react-toastify'
const finderprint = new fingerprint().get();

const GroupSuccess = (result) => {
    return ({
        type: actionType.GROUP_SUCCESS,
        payloads: result.data
    })
}

export const getAllGroupsList = () => {
    return dispatch => {
        var getApiToken = localStorage.getItem("__apiToken__")
        var Token = jwt.verify(getApiToken, finderprint.toString());
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
        axios.post(Server.API + 'admin/all_group_listing_data')
        //axios.post('http://45.79.23.192:225/admin/all_group_listing_data')
            .then(function (result) {
                dispatch(GroupSuccess(result))
            }).catch(function (error) {
                //console.log("Error-----", error)
                if (error.response.data.code) {
                    return dispatch(isExpireToken(error.response.data.code))
                }
            })
    }
}

const GroupDetailssuccess = (result) => {
    return ({
        type: actionType.GROUP_DETAILS_SUCCESS,
        payloads: result.data
    })
}

export const getGroupDetails = (group_id) => {
    return dispatch => {
        try {
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.API + 'admin/group_post_listing', { group_id: group_id })
                .then(function (result) {
                    dispatch(GroupDetailssuccess(result))
                }).catch(function (error) {
                    //console.log("Error-----", error)
                    if (error.response.data.code) {
                        return dispatch(isExpireToken(error.response.data.code))
                    }
                })
        } catch (error) {
            //console.log("Error", error.message)
            if (error.response.data.code) {
                return dispatch(isExpireToken(error.response.data.code))
            }
        }
    }
}

export const deleteGroupPostId = (request) => {
    return dispatch => {
        try {
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.API + 'admin/deleteUploadPostByUser', { id: request.post_id })
                //axios.post(Server.API + 'users/group_post_listing', { group_id: group_id })
                .then(function (result) {
                    dispatch(getGroupDetails(request.group_id))
                }).catch(function (error) {
                    //console.log("Error-----", error)
                    if (error.response.data.code) {
                        return dispatch(isExpireToken(error.response.data.code))
                    }
                })
                toast.success('Group post delete successfully!')  
        } catch (error) {
            //console.log("Error", error.message)
                if (error.response.data.code) {
                    return dispatch(isExpireToken(error.response.data.code))
                }
        }
    }
}

const ReportAbuseSuccess = (result) => {
    return ({
        type: actionType.REPORT_ABUSE_DETAILS_SUCCESS,
        payloads: result.data
    })
}

export const getreportAbuserListData = (id) => {
    return dispatch => {
        try{
            axios.post(Server.API + 'admin/reportAbuserListByPostId', { post_id: id })
            .then(function (result) {
                dispatch(ReportAbuseSuccess(result))
            }).catch( function (error){
                if (error.response.data.code) {
                    return dispatch(isExpireToken(error.response.data.code))
                }
            })
        }catch(error){
            if (error.response.data.code) {
                return dispatch(isExpireToken(error.response.data.code))
            }
        }
        
    }
}