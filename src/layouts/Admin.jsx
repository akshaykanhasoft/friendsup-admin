/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "../components/Navbars/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
//import UserProfile from "../views/UserProfile/UserProfile.jsx";
import TableList from '../views/TableList/TableList.jsx';
import GroupsList from '../views/TableList/GroupsList.js';
import EventsList from  '../views/TableList/EventList.js';
import CategoryList from '../views/TableList/CategoryList.js';
import MainCategory from '../views/TableList/mainCategory.js';
import GroupChat from '../views/TableList/GroupChat.js';
import GroupDetails from '../views/details/groupDetails'
import ResetPassword from '../layouts/login/ResetPassword';
//import FixedPlugin from "../components/FixedPlugin/FixedPlugin.jsx";
import routes from "../routes.js";
import DashboardPage from "../views/Dashboard/Dashboard";
import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

//import image from "../../public/sidebar-2.jpg";
//import image from "../assets/img/sidebar-2.jpg";
//import logo from "../assets/img/reactlogo.png";
//import logo from "../images/app_logo.png";
import Server from  '../config';

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/friendsup-admin") {
        return (
          <span>
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
            <Route exact path="/friendsup-admin/" component={DashboardPage} />
            {/* <Route exact path="/admin/userProfile" component={UserProfile} /> */}
            <Route exact path="/friendsup-admin/user" component={TableList} />
            <Route exact path="/friendsup-admin/groups" component={GroupsList} />
            <Route exact path="/friendsup-admin/events" component={EventsList} />
            <Route exact path="/friendsup-admin/category" component={CategoryList} />
            <Route exact path="/friendsup-admin/maincategory" component={MainCategory} />
            <Route exact path="/friendsup-admin/group_chat" component={GroupChat} />
            <Route exact path="/friendsup-admin/group_details/:id" component={GroupDetails} />
          </span>
        );
      }
    })}
  </Switch>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // image: image,
      image: Server.SIDEBAR_BACK_IMAGE_URL,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false
    };
  }
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"FriendsUp"}
          logo={Server.SIDEBAR_LOGO_URL}
          //image={this.state.image}
          image={Server.SIDEBAR_BACK_IMAGE_URL}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
          {this.getRoute() ? <Footer /> : null}
          {/* <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          /> */}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
