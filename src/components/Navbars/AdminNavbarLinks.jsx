import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
//import Person from "@material-ui/icons/Person";
//import Notifications from "@material-ui/icons/Notifications";
import Button from "../CustomButtons/Button.jsx";
import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle";
import { connect } from 'react-redux';
import Server from '../../config';



class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  userLogout = () => {
    //localStorage.removeItem('__apiToken__');
    localStorage.clear();
    window.location.href = Server.LOGOUT_URL;
  }

  render() {

    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          //aria-label="Person"
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
          className={classes.buttonLink}
        >
          {/* <Person className={classes.icons} /> */}
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>

           <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
             {/* <Notifications className={classes.icons} /> */}
            {/* <span className={classes.notifications}>5</span>  */}
            {/* <text style={{ fontSize: Server.REGULAR_FONT_SIZE, marginRight: "230px",textTransform: "lowercase", fontFamily: Server.REGULAR_FONT }}>{this.props.login.get_login_data}</text> */}
            {/* <Hidden mdUp implementation="css">
              <p onClick={this.handleClick} className={classes.linkText}>
              Profile
              </p>
            </Hidden> */}
          </Button> 
          <Poppers
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                    <div>
                <div onClick={() => this.userLogout()}>
                    <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Logout
                      </MenuItem>
                      </div>
                      </div>         
                    </MenuList>
                    {/* <text>Lisa@gmail.com</text> */}
                  </ClickAwayListener>
                </Paper>
              
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    login: state.Login,
  })
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));
// export default withStyles(headerLinksStyle)(HeaderLinks);
