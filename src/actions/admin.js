import * as actionType from './actionType';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import fingerprint from 'fingerprintjs'
import Server from '../config';
import { toast } from 'react-toastify'
//import md5 from 'md5';
//import base64 from 'base-64';


const finderprint = new fingerprint().get();
const LoginSuccess = (result) => {
    return ({
        type: actionType.LOGIN_SUCCESS,
        payload: result
    })
}

const LogindataSaveToLocalStorage = (result, is_login) => {

    if (is_login === 1) {
        return ({
            type: actionType.LOGIN_DATA_SAVE_TO_LOCALSTORAGE,
            payload: result
        })
    } else {
        return ({
            type: actionType.LOGIN_DATA_SAVE_TO_LOCALSTORAGE,
            payload: result
        })
    }

}

const LoginFail = () => {
    return ({
        type: actionType.LOGIN_FAIL,
        payload: "1"
    })
}

const storeUserData = (resp) => {
    let finderprint = new fingerprint().get();
    return jwt.sign(resp, finderprint.toString())
}


// export const getLogin = (request) => {
//     let is_login = 1
//     return dispatch => {
//         try {
//             axios.post(Server.API + 'admin/login', request)
//                 .then(function (result) {
//                     if (result.data.error === "true") {
//                         dispatch(LoginFail())
//                     } else {
//                         localStorage.setItem("__apiToken__", storeUserData(result.data.resp[0].new_token))
//                         localStorage.setItem("__apiEmail__", storeUserData(result.data.resp[0].email))
//                         var credential = localStorage.getItem("__apiToken__")
//                          //localStorage.setItem('loginAuthData', JSON.stringify(result.data.resp[0]));
//                         dispatch(LogindataSaveToLocalStorage(credential, is_login))
//                         dispatch(LoginSuccess(result.data.resp[0].email))
//                         window.location.href = `/friendsup-admin/dashboard`;    
//                     }
//                 })
//         } catch (error) {
//             console.log("Error", error.mesage)
//             dispatch(LoginFail())
//         }
//     }
// }

const AdminDataSave = (result) => {
    return ({
        type: actionType.ADMIN_LOGIN_DATA_SAVE,
        payload: result
    })
}


export const getLogin = (request) => {
    let is_login = 1
    return dispatch => {
        try {
            axios.post(Server.API + 'admin/adminLogin', request)
                .then(function (result) {
                    if (result.data.error === "true") {
                        dispatch(LoginFail())
                    } else {
                        localStorage.setItem("__apiToken__", storeUserData(result.data.token))
                        localStorage.setItem("__apiEmail__", storeUserData(result.data.resp[0].email))
                        let adminData = JSON.stringify(result.data.resp[0]);
                        localStorage.setItem("__adminProfile__", storeUserData(adminData))
                        var credential = localStorage.getItem("__apiToken__")
                        //localStorage.setItem('loginAuthData', JSON.stringify(result.data.resp[0]));
                        dispatch(LogindataSaveToLocalStorage(credential, is_login))
                        dispatch(LoginSuccess(result.data.resp[0].email))
                        dispatch(AdminDataSave(result.data.resp[0]))
                        window.location.href = `/friendsup-admin/dashboard`;
                        //window.location.href = `/friendsup-admin`;    
                    }
                })
        } catch (error) {
            console.log("Error", error.message)
            dispatch(LoginFail())
        }
    }
}



export const checkAuthentication = () => {
    let get_data = JSON.parse(localStorage.getItem('loginAuthData'));
    if (get_data !== "" && get_data !== null) {
        window.location.href = "/admin/dashboard";
    } else {
        window.location.href = "/login";
    }
}

export const setLoginData = () => {
    let is_login = 0
    return dispatch => {
        let finderprint = new fingerprint().get();
        var credential = localStorage.getItem("__apiToken__")
        var credentialEmail = localStorage.getItem("__apiEmail__")
        var credentialGet = jwt.verify(credentialEmail, finderprint.toString());
        var getAdminProfile = localStorage.getItem("__adminProfile__")
        var getAdminData = jwt.verify(getAdminProfile, finderprint.toString());
        if (credential == null) {
            dispatch(LoginSuccess(credentialGet = ""))
            return dispatch(LogindataSaveToLocalStorage(credential = "", is_login))

        } else {
            let finderprint = new fingerprint().get();
            credential = jwt.verify(credential, finderprint.toString());
            dispatch(LogindataSaveToLocalStorage(credential, is_login))
            dispatch(LoginSuccess(credentialGet))
        }
        dispatch(AdminDataSave(getAdminData))
    }
}

const ResetPasswordSucceess = (result) => {
    return ({
        type: actionType.ADMIN_RESET_PASSWORD,
        payload: result
    })
}

const emailCheckDatabase = (code) => {
    return ({
        type: actionType.ADMIN_EMAIL_CHECK,
        payload: code
    })
}

export const sendMailToResetPassword = (request) => {
    
    let email = btoa(request.email)
    //let mail_body = "http://localhost:3000/friendsup-admin/reset_password?email=" +request.email
    // let mail_body = Server.API + "friendsup-admin/reset_password/" + email
     //let subject = "Reset Password";
    let request_data = { bool: 0, email: request.email  }
    let request_email = { email: request.email }
    return dispatch => {
        try {
            axios.post(Server.API + "admin/resetPasswordCheckEmail", request_email)
                .then((response) => {
                    if (response.data.code == 200) {
                        axios.post("https://us-central1-friendsup-live.cloudfunctions.net/sendMail?subject=Reset Password - FriendsUp&text_body=Hi " + response.data.resp[0].first_name + "\nYou have requested to reset your Password.\r\nTo reset you password, use this link:: " + Server.RESET_PASSWORD_API + "friendsup-admin/reset_password/" + email + "&to_email=" + request.email)
                     
                            .then((response) => {
                                console.log("response ", response);
                            })
                        // axios.post(Server.SEND_MAIL_FUNCTION_URL + "subject=" + subject + "&text_body=" + mail_body + "&to_email=+" + request.email)
                        //     .then((response) => {
                        //         console.log("response ", response);
                        //     })
                        axios.post(Server.API + 'admin/checkResetPasswordUrl',request_data)
                        .then((result) => {

                        })    
                        toast.success('Reset password link send please check your mail!')
                        let status = 200
                        dispatch(ResetPasswordSucceess(status))

                    } else {
                        dispatch(emailCheckDatabase(response.data.code))
                    }
                })
        } catch (error) {
            // if (error.response.data.code) {
            //     return dispatch(isExpireToken(error.response.data.code))
            // }
            // let status = 200
            // dispatch(mailSendSuccess(status))
            console.log("Error", error.message)
        }
    }

}

const adminResetPasswordDone = (result) => {
    return ({
        type: actionType.ADMIN_RESET_PASSWORD_DONE,
        payload: result
    })
}


export const resetPassword = (request) => {
    let request_data = { bool: 1, email: atob(request.email) }
    return dispatch => {
        try {
            axios.post(Server.API + 'admin/ResetpasswordByAdmin', request)
                .then((response) => {
                    if (response.status == 200) {
                        toast.success('Reset password succeefully please login!')
                        axios.post(Server.API + 'admin/checkResetPasswordUrl', request_data)
                            .then((result) => {

                            })
                    }
                    dispatch(adminResetPasswordDone(response.status))
                })
            //toast.success('Mail send successfully!')


        } catch (error) {
            console.log("Error", error.message)
        }
    }
}

const checkUrlExpireorNot = (result) => {
    return ({
        type: actionType.ADMIN_URL_CHECK_EXPIRE_ORNOT,
        payload: result
    })
}


export const checkUrl = (request) => {
    let request_data = { bool: 0 }
    var decodedString = atob(request.email);
    let request_email = { email: decodedString }
    return dispatch => {
        try {
            //axios.post(Server.API + 'admin/checkResetPasswordUrl', request_data)
            axios.post(Server.API + 'admin/getAdminData', request_email)
                .then((response) => {
                    if (response.data[0].is_url == "1") {
                        window.location = Server.LOGOUT_URL
                    }
                    //dispatch(checkUrlExpireorNot(response.data[0].is_url))
                })

        } catch (error) {
            console.log("Error", error.message)
        }
    }
}





