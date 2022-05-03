import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
// import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";
// import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.jsx";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks";
import RTLNavbarLinks from "../Navbars/RTLNavbarLinks";

//import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import sidebarStyle from "../../assets/jss/material-dashboard-react/components/sidebarStyle";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Server from '../../config';
import Logout from '@material-ui/icons/KeyboardReturn'
import { Link } from 'react-router';

const Sidebar = ({ ...props }) => {
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  function logoutAdmin(){
    localStorage.clear();
    window.location.href = Server.LOGOUT_URL;
  }
  const { classes, color, logo, image, logoText, routes } = props;
   
   var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={
                  props.rtlActive ? prop.rtlName : prop.name
                }
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        //href="https://www.creative-tim.com"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
      >
        <div className={classes.logoImage}>
          {/* <img src={logo} alt="logo" className={classes.img} /> */}
          <img src={logo} alt="logo" style={{ height: "30px", width: "30px", marginBottom: "-8px", borderRadius: "15px"}} />
        </div>
        {logoText}
      </a>
      <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          {/* <InboxIcon 
          className={classNames(classes.whiteFont)}
          /> */}
        <img src={Server.IMAGES_URL + props.dashboard_data.admin_login_data.image} style={{ height: "30px", width: "30px",borderRadius: "15px", marginLeft: "-6px" }}/>
        </ListItemIcon>
        <ListItemText 
        className={classNames(classes.whiteFont)}
        primary={<span style={{ marginLeft: "-16px", fontFamily: Server.REGULAR_FONT,fontSize: Server.REGULAR_FONT_SIZE }}>{props.dashboard_data.admin_login_data.first_name}</span>} />
        {open ? <ExpandLess 
          className={classNames(classes.whiteFont)}
        /> : <ExpandMore 
        className={classNames(classes.whiteFont)}
        />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {/* <Link to={"http://localhost:3000/friendsup-admin"}> */}
          <ListItem button className={classes.nested} onClick={logoutAdmin}>
            <ListItemIcon>
              <Logout 
              className={classNames(classes.whiteFont)}
              />

            </ListItemIcon>
            <ListItemText
            className={classNames(classes.whiteFont)}
            primary={<span style={{ marginLeft: "-16px",  fontFamily: Server.REGULAR_FONT,fontSize: Server.REGULAR_FONT_SIZE }}>Logout</span>} />
          </ListItem>
          {/* </Link> */}
        </List>
      </Collapse>
    </List>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return ({
    dashboard_data: state.Dashboard
  })
}
export default connect(mapStateToProps)(withStyles(sidebarStyle)(Sidebar));
//export default withStyles(sidebarStyle)(Sidebar);
