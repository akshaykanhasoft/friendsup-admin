import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Login from './layouts/login/index';
import * as actions from './actions/index';
import Admin from "./layouts/Admin";
import "./assets/css/material-dashboard-react.css?v=1.6.0";
import { connect } from 'react-redux';
import { compose } from 'redux'
import ResetPassword from '../src/layouts/login/ResetPassword';
import Urlexpire from '../src/layouts/login/Urlexpire';

const hist = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    if(window.localStorage.getItem("__apiToken__")) {
      this.props.setLoginData()
      //this.props.SetTokenTime() 
    }
  }

  render() {
      if (this.props.login.login_data_save_to_local_storage) {
        return (
          <Router history={hist}>
            <Switch>
              <Route exact path="/friendsup-admin" component={Admin} />
              <Route exact path="/friendsup-admin/dashboard" component={Admin} />
              <Route exact path="/friendsup-admin/user" component={Admin} />
              <Route exact path="/friendsup-admin/groups" component={Admin} />
              <Route exact path="/friendsup-admin/events" component={Admin} />
              <Route exact path="/friendsup-admin/category" component={Admin} />
              <Route exact path="/friendsup-admin/maincategory" component={Admin} />
              <Route exact path="/friendsup-admin/group_chat" component={Admin} />
              <Route exact path="/friendsup-admin/group_details/:id" component={Admin} />
            </Switch>
          </Router>
        )
      }else{
        return (
          <Router history={hist}>
            <Switch>
              <Route exact path="/friendsup-admin" component={Login} />
              <Route exact path="/friendsup-admin/reset_password/:email" component={ResetPassword} />
              <Route exact path="/friendsup-admin/url-expire" component={Urlexpire} />
            </Switch>
          </Router>
        )
      }
  }
}

const mapStateToProps = state => ({
  login: state.Login,
})

const mapDispatchToProps = dispatch => ({
  setLoginData: () => { dispatch(actions.setLoginData()) },
  //SetTokenTime: () => { dispatch(actions.SetTokenTime()) },
  
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);