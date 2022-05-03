import React from "react";
//import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Person from "@material-ui/icons/Person";
import Group from "@material-ui/icons/Group";
import EventIcon from "@material-ui/icons/Event";
import GroupChatIcon from "@material-ui/icons/ChatBubbleOutline";
import CategoryIcon from "@material-ui/icons/Category";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import Server from '../../config';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Progressbar from '../Progressbar.js';

var loaderStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      dashboard_data: [],
      tokenExpireModal: false,
      u_count: "",
      loading: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true })
    this.props.getAllModuleCountData()
  }

  componentWillReceiveProps(props) {
   if(props.dashboard_data.token_expire == 401){
      this.setState({ tokenExpireModal: true })
   }
    if (props.dashboard_data.get_dashboard_list !== undefined && props.dashboard_data.get_dashboard_list !== null) {
      //   props.dashboard_data.get_dashboard_list.map((prop, key) => {
      // })
      this.setState({ loading: false })
      this.setState({ dashboard_data: props.dashboard_data.get_dashboard_list })
    }
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  displayGroupChatCount = (dashboard_data) => {
    
    let count = 0
    if(dashboard_data.group_chat_count != null){
      count = dashboard_data.group_chat_count.length
    }
    return count
  }

  displayCategoryCount = (dashboard_data) => {
    let count = 0
    if(dashboard_data.category_count != null){
      count = dashboard_data.category_count.length
    }
    return count
  }

  gotoUserPage = () => {
    this.props.history.push("/friendsup-admin/user");
  }

  gotoGroupsPage = () => {
    this.props.history.push("/friendsup-admin/groups");
  }

  gotoEventPage = () => {
    this.props.history.push("/friendsup-admin/events");
  }

  gotoGroupChatPage = () => {
    this.props.history.push("/friendsup-admin/group_chat");
  }

  gotoCategoryPage = () => {
    this.props.history.push("/friendsup-admin/maincategory");
  }

  tokenExpAlert = () => {
    //this.props.history.push(Server.LOGOUT_URL);
    localStorage.clear();
    window.location.href = Server.LOGOUT_URL;
  }

  render() {

    if (this.state.loading) {
      return (
        <div style={loaderStyle}>
          <Progressbar></Progressbar>
        </div>
      )
    }
    const { classes } = this.props;
    const { tokenExpireModal } = this.state
    return (
      <div>
        {/* open expire token dailog box */}
        <div>
          <Dialog
            open={tokenExpireModal}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Session Expire</span>}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Session is expire. please login again.</span>}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.tokenExpAlert()} color="primary" autoFocus>
                OK
          </Button>
            </DialogActions>
          </Dialog>
        </div>
      {/* end */}
        <GridContainer>
          <GridItem xs={12} sm={6} md={3} onClick={() => this.gotoUserPage()}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  {/* <Icon>content_copy</Icon> */}
                  <Person></Person>
                </CardIcon>
                
                <p className={classes.cardCategory}>{<span style={{ fontFamily: Server.REGULAR_FONT }}>Users</span>}</p>
                <h3 className={classes.cardTitle}>
                  {this.state.dashboard_data.users_count} <small></small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    {/* <Warning /> */}
                  </Danger>
                  {/* <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a> */}
                </div>
              </CardFooter>
            </Card>
            {/* </Link> */}
          </GridItem>
          

          <GridItem xs={12} sm={6} md={3} onClick={() => this.gotoGroupsPage()}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  {/* <Icon>info_outline</Icon> */}
                  <Group></Group>
                </CardIcon>
                <p className={classes.cardCategory}>{<span style={{ fontFamily: Server.REGULAR_FONT }}>Groups</span>}</p>
                <h3 className={classes.cardTitle}>{this.state.dashboard_data.group_count}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <LocalOffer />
                  Tracked from Github */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3} onClick={() => this.gotoEventPage()}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  {/* <Store /> */}
                  <EventIcon></EventIcon>
                </CardIcon>
                <p className={classes.cardCategory}>{<span style={{ fontFamily: Server.REGULAR_FONT }}>Events</span>}</p>
                <h3 className={classes.cardTitle}>{this.state.dashboard_data.event_count}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <DateRange />
                  Last 24 Hours */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={3} onClick={() => this.gotoCategoryPage()}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  {/* <Accessibility /> */}
                  <CategoryIcon></CategoryIcon>
                </CardIcon>
                <p className={classes.cardCategory}>Category</p>
                
                {/* <h3 className={classes.cardTitle}>{this.state.dashboard_data.group_chat_count}</h3> */}
                <h3 className={classes.cardTitle}>{this.displayCategoryCount(this.state.dashboard_data)}</h3>
                
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <Update />
                  Just Updated */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>          



          <GridItem xs={12} sm={6} md={3} onClick={() => this.gotoGroupChatPage()}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  {/* <Accessibility /> */}
                  <GroupChatIcon></GroupChatIcon>
                </CardIcon>
                <p className={classes.cardCategory}>{<span style={{ fontFamily: Server.REGULAR_FONT }}>Group Chat</span>}</p>
                {/* <h3 className={classes.cardTitle}>{this.state.dashboard_data.group_chat_count}</h3> */}
                <h3 className={classes.cardTitle}>{this.displayGroupChatCount(this.state.dashboard_data)}</h3>
                
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {/* <Update />
                  Just Updated */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>
        <GridContainer>
        </GridContainer>
        <GridContainer>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    users: state.Users,
    login: state.Login,
    dashboard_data: state.Dashboard
  })
}

const mapDispatchToProps = dispatch => ({
  getAllModuleCountData: () => { dispatch(actions.getAllModuleCountData()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard));
