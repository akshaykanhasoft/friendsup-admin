import * as actionType from './actionType';
import axios from 'axios';
import Server from '../config';
import firebaseClient from "../components/FirebaseConfig/FirebaseClient";
import jwt from 'jsonwebtoken';
import fingerprint from 'fingerprintjs'
import { isExpireToken } from './dashboard';
import { toast } from 'react-toastify'
const finderprint = new fingerprint().get();

const UserListSuccess = (result) => {
    return ({
        type: actionType.USERS_LIST_SUCCESS,
        payloads: result.data
    })
}

export const getAllUserList = () => {
    return dispatch => {
        //window.location.href = `/dashboard/dashboard`;
        var getApiToken = localStorage.getItem("__apiToken__")
        var Token = jwt.verify(getApiToken, finderprint.toString());
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
        axios.get(Server.API + 'admin/getinitialuserdata')
            .then(function (result) {
                dispatch(UserListSuccess(result))
            }).catch(function (error) {
                if (error.response.data.code) {
                    return dispatch(isExpireToken(error.response.data.code))
                }
            })
    }
}

const userBlockByAdmin = () => {
    let status = 200
    return ({
        type: actionType.USER_BLOCK_BY_ADMIN,
        payloads: status
    })
}


export const ChangeUserStatusByadmin = (id, status, is_call) => {
    let request = { id: id, status: status }
    let status_code = ""
    return dispatch => {
        try {
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.API + 'admin/userActiveDeactiveByAdmin', request)
                .then(function (result) {
                    dispatch(notifcationSendSuccess(status_code))
                    dispatch(mailSendSuccess(status_code))
                    dispatch(MultiplemailSendSuccess(status_code))
                    dispatch(getAllUserList())
                    if (is_call == 1) {
                        dispatch(userBlockByAdmin())
                    }
                })
                .catch(function (error) {
                    //console.log("Error", error)
                    if (error.response.data.code) {
                        return dispatch(isExpireToken(error.response.data.code))
                    }
                })
            if(status == 1){
                toast.success('User block successfully!')  
            }else{
                toast.success('User un-block successfully!')  
            }
        }
        catch (error) {
            if (error.response.data.code) {
                return dispatch(isExpireToken(error.response.data.code))
            }
        }
    }
}

const mailSendSuccess = (status) => {
    return ({
        type: actionType.MAIL_SEND_SUCCESS,
        payloads: status
    })
}

export const sendMailToUserByAdmin = (mailBody, userEmail, subject) => {
    //let request = { mailBody: mailBody, userEmail: userEmail, subject: subject }
    // return dispatch => {
    //     try {
    //         axios.post(Server.API + "admin/sendMailToUserbyAdmin", request)
    //             .then((response) => {
    //                 if (response.status == 200) {
    //                     dispatch(mailSendSuccess(response.status))
    //                 }
    //             })
    //     } catch (error) {
    //         console.log("Error", error.message)
    //     }
    // }
    return dispatch => {
        try {
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.SEND_MAIL_FUNCTION_URL + "subject=" + subject + "&text_body=" + mailBody + "&to_email=+" + userEmail)
                .then((response) => {
                })
            toast.success('Mail send successfully!')
            let status = 200
            dispatch(mailSendSuccess(status))

        } catch (error) {
            if (error.response.data.code) {
                return dispatch(isExpireToken(error.response.data.code))
            }
            let status = 200
            dispatch(mailSendSuccess(status))
            //console.log("Error", error.message)
        }
    }
}

const MultiplemailSendSuccess = (code) => {
    return ({
        type: actionType.MULTIPLE_MAIL_SEND_SUCCESS,
        payloads: code
    })
}

export const multipleMailsend = (data, subject, message) => {
    let isMailTrue = []
    data.map((val, index) => {
        if (val.is_mail) {
            isMailTrue.push({ email: val.email, id: val.id })
        }
    })
    let request = { users_email: isMailTrue, subject: subject, mailBody: message }
    let getAllEmail = ""
    let getUserEmail = []
    request.users_email.map((val, index) => {
        getUserEmail.push(val.email)
    })
    getAllEmail = getUserEmail.join(",");
    return dispatch => {
        try {
            // axios.post(Server.API + "admin/sendMultipleMailToUsersbyAdmin", request)
            //     .then((response) => {
            //         if (response.data.code == 200) {
            //             dispatch(MultiplemailSendSuccess(response.data.code))
            //         }
            //     })
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.SEND_MAIL_FUNCTION_URL + "subject=" + subject + "&text_body=" + message + "&to_email=+" + getAllEmail)
                .then((response) => {
                })
            let status = 200
            toast.success('Mail send successfully!')
            dispatch(MultiplemailSendSuccess(status))
        } catch (error) {
            if (error.response.data.code) {
                return dispatch(isExpireToken(error.response.data.code))
            }
            let status = 200
            dispatch(MultiplemailSendSuccess(status))
            console.log("Error", error.message)
        }
    }
}


const notifcationSendSuccess = (status) => {
    return ({
        type: actionType.NOTIFICATION_SEND_SUCCESS,
        payloads: status
    })
}

export const sendMultipleNotification = (data, message) => {
    let isMailTrue = []
    data.map((val, index) => {
        if (val.is_mail) {
            isMailTrue.push({ firebase_id: val.firebaseId, id: val.id, })
        }
    })
    let request = { users_notification: isMailTrue }
    return dispatch => {
        try {
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.API + "admin/getFcmTokens", request)
                .then((response) => {
                    response.data.map((val, index) => {
                        if (val.platform == 1) { // 1 = android, notificationType: "5" = invited friends notification
                            let body = {
                                to: val.fcm_token,
                                notification: {
                                    title: "Melding",
                                    body: "FriendsUp-melding: " + message,
                                    sound: "default",
                                    click_action: "chat_msg_notification"
                                },
                                data: {
                                    title: "Melding",
                                    body: "FriendsUp-melding: " + message,
                                    notificationType: "11"
                                },
                                priority: "high"
                            };
                            firebaseClient.send(JSON.stringify(body), "notification");
                        } else { // 2 = ios, notificationType: "5" = invited friends notification
                            let body = {
                                to: val.fcm_token,
                                notification: {
                                    title: "Melding",
                                    body: "FriendsUp-melding: " + message,
                                },
                                data: {
                                    title: "Melding",
                                    body: "FriendsUp-melding: " + message,
                                    sound: "default",
                                    notificationType: "11"
                                },
                                priority: "high"
                            };
                            firebaseClient.send(JSON.stringify(body), "notification");
                        }
                    })

                    dispatch(notifcationSendSuccess(response.status))
                })
            toast.success('Notification send successfully!')
        } catch (error) {
            //console.log("Error", error.message)
            if (error.response.data.code) {
                return dispatch(isExpireToken(error.response.data.code))
            }
        }
    }
}



