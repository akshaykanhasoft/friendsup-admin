import * as actionType from './actionType';
import axios from 'axios';
import Server from '../config'
import jwt from 'jsonwebtoken';
import fingerprint from 'fingerprintjs'
import { isExpireToken }from './dashboard';
import { toast } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
const finderprint = new fingerprint().get();
// const CategorySuccess = (result) => {
//     return ({
//         type: actionType.CATEGORY_SUCCESS,
//         payloads: result.data
//     })
// }

// export const getAllCategoryList = () => {
//     return dispatch => {
//         axios.get(Server.API + 'admin/filterEventData')
//             .then(function (result) {
 //                 dispatch(CategorySuccess(result))
//             }).catch(function(error){
 //             })
//     }
// }

// const MainCategorySuccess = (result) => {
//     return ({
//         type: actionType.MAIN_CATEGORY_SUCCESS,
//         payloads: result.data
//     })
// }

const EventCategorySuccess = (result) => {
    return ({
        type: actionType.EVENT_CATEGORY_SUCCESS,
        payloads: result.data
    })
}


//export const getAllMainIntrestCategory = () => {
export const getAllEventCategory = () => {
    return dispatch => {
        // axios.post(Server.API + "admin/get_interest")
        //axios.get(Server.API + "admin/filterEventData")
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.get(Server.API + "admin/filterEventData")
            .then(function (result) {
                 //dispatch(MainCategorySuccess(result))
                dispatch(EventCategorySuccess(result))
            }).catch(function (error) {
                //console.log("Error", error.response)
                if(error.response.data.code) {
                    return dispatch(isExpireToken(error.response.data.code))
                }
            })
    }
}

const CategortSaveSuccess = (result) => {
    return ({
        type: actionType.CATEGORY_SAVE_SUCCESS,
        payloads: result.data
    })
}

export const SaveCategory = (request) => {
     let isImageAvailable = false;
    return dispatch => {
        try {
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.API + "admin/saveCategory", { c_name: request.c_name })
                .then(function (result) {
                    if (request.c_image !== null) {
                        if (request.c_image.type != null) {
                            isImageAvailable = true;
                            const formdata = new FormData();
                            formdata.append("category_image", request.c_image)
                            formdata.append("id", result.data.resp[0].id)
                             try {
                                axios({
                                    url: Server.API + 'admin/categoryimage',
                                    method: 'POST',
                                    data: formdata,
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data',
                                    }
                                }).then(row => {
                                    dispatch(getAllEventCategory())
                                    
                                })
                                    .catch((error) => {
                                        alert(error)
                                    });
                            } catch (error) {
                                //console.error(error);
                                if(error.response.data.code) {
                                    return dispatch(isExpireToken(error.response.data.code))
                                }
                            }
                        }
                    }
                    dispatch(CategortSaveSuccess(result))
                    if (!isImageAvailable) {
                        dispatch(getAllEventCategory())
                    }
                })
                toast.success('Category add successfully!')
        } catch (error) {
            //console.log("Error", error.message)
            if(error.response.data.code) {
                return dispatch(isExpireToken(error.response.data.code))
            }
        }
    }
}

const EditCategortSuccess = (result) => {
    return ({
        type: actionType.EDIT_CATEGORY_SUCEESS,
        payloads: result.data
    })
}
export const DemoEditCategory = (request) => {
    let isImageAvailable = false;
    return dispatch => {
        try {
            //axios.post(Server.API + "admin/EditCategory", { Category_porfile: formData, request: request })
            if (request.c_image.name != null) {
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.API + "admin/EditCategory", { request: request })
                .then(function (result) {
                    if (request.c_image.name != null) {
                       //if (request.c_image != null) {
                    //   if (request.c_image.type != null) {
                            isImageAvailable = true;
                            if (request.c_image != null) {
                                const formData = new FormData();
                                formData.append("category_update_image", request.c_image)
                                formData.append("id", request.category_id)
                                try {
                                    axios({
                                        url: Server.API + 'admin/category_images_update',
                                        method: 'POST',
                                        data: formData,
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'multipart/form-data',
                                        }
                                    }).then(row => {
                                        dispatch(getAllEventCategory())
                                    })
                                        .catch((error) => {
                                            alert(error)
                                            if(error.response.data.code) {
                                                return dispatch(isExpireToken(error.response.data.code))
                                            }
                                        });
                                } catch (error) {
                                    //console.error(error);
                                    if(error.response.data.code) {
                                        return dispatch(isExpireToken(error.response.data.code))
                                    }
                                }
                            }
                        }
                    //}
                    dispatch(EditCategortSuccess(result))
                    if (!isImageAvailable) {
                        dispatch(getAllEventCategory())
                    }
                })                
            }else{
                dispatch(getAllEventCategory());
            } 
            toast.success('Category update successfully!')  
        } catch (error) {
            //console.log("Error", error.message)
            if(error.response.data.code) {
                return dispatch(isExpireToken(error.response.data.code))
            }
        }
    }
}

// export const EditCategory = (request) => {
//     return dispatch => {
//         try {
//             //axios.post(Server.API + "admin/EditCategory", { Category_porfile: formData, request: request })
//             var getApiToken = localStorage.getItem("__apiToken__")
//             var Token = jwt.verify(getApiToken, finderprint.toString());
//             axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
//             axios.post(Server.API + "admin/EditCategory", { request: request })
//                 .then(function (result) {
//                     console.log("result123 ", result);
//                     if (request.c_image.name !== null) {
//                         if (request.c_image !== null) {
//                             const formData = new FormData();
//                             formData.append('name', 'ABC');   //append the values with key, value pair
//                             formData.append('age', 20);
//                             // formData.append("category_update_image", request.c_image)
//                             // formData.append("id", request.category_id)
//                             try {
//                                 axios({
//                                     url: Server.API + 'admin/category_images_update',
//                                     method: 'POST',
//                                     data: formData,
//                                     headers: {
//                                         'Accept': 'application/json',
//                                         'Content-Type': 'multipart/form-data',
//                                     }
//                                 }).catch((error) => {
//                                     alert(error)
//                                     if(error.response.data.code) {
//                                         return dispatch(isExpireToken(error.response.data.code))
//                                     }
//                                 });
//                             } catch (error) {
//                                 console.error(error);
//                                 if(error.response.data.code) {
//                                     return dispatch(isExpireToken(error.response.data.code))
//                                 }
//                             }
//                         }
//                     }

//                     dispatch(EditCategortSuccess(result))
//                     dispatch(getAllEventCategory())
//                 })
//         } catch (error) {
//             //console.log("Error", error.message)
//             if(error.response.data.code) {
//                 return dispatch(isExpireToken(error.response.data.code))
//             }
//         }
//     }
// }

// const DeleteCategortSuccess = () => {
//     return ({
//         type: actionType.DELETE_CATEGORY_SUCEESS,
//         payloads: result.data
//     })
// }

export const deleteEventCategory = (request) => {
    return dispatch => {
        try {
            var getApiToken = localStorage.getItem("__apiToken__")
            var Token = jwt.verify(getApiToken, finderprint.toString());
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
            axios.post(Server.API + "admin/deleteCategory", request)
                .then(function (result) {
                    // let code = ""
                    // // dispatch(DeleteCategortSuccess(result))
                    // dispatch(CategortSaveSuccess(code))
                    dispatch(getAllEventCategory())
                })
                toast.success('Category delete successfully!')  
        } catch (error) {
            //console.log("Error", error.message)
            if(error.response.data.code) {
                return dispatch(isExpireToken(error.response.data.code))
            }
        }
    }
}
