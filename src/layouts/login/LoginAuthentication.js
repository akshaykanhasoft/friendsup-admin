import React from "react";
import Admin from "../../layouts/Admin";
import Login from '../../layouts/login';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from 'redux'
class LoginAuthentication extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props){

    }

    render() {

        let get_data = JSON.parse(localStorage.getItem('loginAuthData'));
        // if(get_data !== "" && get_data !== null){
        //     window.location.href = "/admin/dashboard";
        // }else{
        //     window.location.href = "/login";
        // }
        if (get_data !== "" && get_data !== null) {
            if (this.props.login.login_data_save_to_local_storage !== "" && this.props.login.login_data_save_to_local_storage !== null) {
                window.location.href = "/admin/dashboard";
            } else {
                window.location.href = "/login";
            }
        }
    }
}


const mapStateToProps = state => ({
    login: state.Login,
})

const mapDispatchToProps = dispatch => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(LoginAuthentication);
