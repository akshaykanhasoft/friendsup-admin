import React from 'react';
// @material-ui/core components
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
//import PropTypes from 'prop-types';
// core components
import Tooltip from "@material-ui/core/Tooltip";
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogActions from '@material-ui/core/DialogActions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
//import image from "../../assets/img/sidebar-2.jpg";
//import image from "../../../public/sidebar-2.jpg";
import * as actions from '../../actions/index';
import Server from '../../config'
import defult_user_image from '../../assets/img/avatar_square.png';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import firebase from '../../firebase/firebase';
import Progressbar from '../Progressbar.js';
//import SuccessMessage from '../successMsg.js';
//import SuccessNotificationMessage from '../notificationMsg.js';
//import Modal from 'react-responsive-modal';
import _ from 'underscore'
import Email from '@material-ui/icons/Email'
import Eye from '@material-ui/icons/RemoveRedEye'
// import customeStyle from '../TableList/custmeCss.css';
// import CancelIcon from '@material-ui/icons/Cancel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Notifications from "@material-ui/icons/Notifications";
import ShowMore from 'react-show-more';
import { ToastContainer } from 'react-toastify';


var imageCont = {
  height: 50,
  width: 50,
}

var userImageCont = {
  height: 50,
  width: 50,
  marginLeft: 5
}

var ModalStyle = {
  height: 150,
  width: 300,
}

var loaderStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

const useStylesDetails = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  rootMultiMailSend: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 50,
    height: 50,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  InputStyle: {
    fontFamily: Server.REGULAR_FONT,
    fontSize: Server.REGULAR_FONT_SIZE
  }
}));

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeOnMail = this.handleChangeOnMail.bind(this);
    this.handleChangeOnSubject = this.handleChangeOnSubject.bind(this);
    this.handleChangeOnMultipleMail = this.handleChangeOnMultipleMail.bind(this);
    this.handleChangeOnNotificationBody = this.handleChangeOnNotificationBody.bind(this);
    this.handleChangeOnSubjectofSingleMail = this.handleChangeOnSubjectofSingleMail.bind(this);

    this.state = {
      userData: [],
      chat_rooms: [],
      image: Server.SIDEBAR_BACK_IMAGE_URL,
      color: "blue",
      hasImage: true,
      tokenExpireModal: false,
      //fixedClasses: "dropdown show",
      mobileOpen: false,
      checkedA: true,
      checkedB: false,
      loading: false,
      openModal: false,
      openMailModal: false,
      mailBody: "",
      sendMailError: "",
      //user_email: "",
      userEmail: "",
      notification_success_msg: false,
      userDetails: [],
      is_active: true,
      AlluserData: [],
      openmulitpleMailsendBoxDailog: false,
      checked: "",
      setChecked: [],
      newChecked: [],
      subject_multipleMail: "",
      multiplemailBody: "",
      multiple_mail_send_subejct_error: "",
      multiple_mail_send_mail_body_error: "",
      check_box_error: "",
      setCheckBox: [],
      notifcationDailog: false,
      notificationBody: "",
      notification_body_error: "",
      setNotificationCheckBox: [],
      check_box_notification_error: "",
      BlockUserPopup: false,
      UnBlockUserPopup: false,
      subject_singleMail: "",
      mail_send_subejct_error: "",
      multipleChecked: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true })
    let _this = this
    firebase.database().ref('chat_rooms').once('value', function (snapshot) {
      let get_chat_rooms = []
      snapshot.forEach(function (childSnapshot) {
        get_chat_rooms.push(childSnapshot.key)
      })
      _this.setState({
        chat_rooms: get_chat_rooms
      })
    })
    this.props.getAllUserList()
  }

  componentWillReceiveProps(props) {
    if (props.dashboard_data.token_expire == 401) {
      this.setState({ tokenExpireModal: true })
    }
    let userList = []
    if (props.users.get_all_users !== undefined && props.users.get_all_users !== null) {
      this.setState({ AlluserData: props.users.get_all_users })

      if (this.state.is_active == true) {
        props.users.get_all_users.map((prop, key) => {
          if (prop.activeStatus == 1) {
            userList.push(prop)
          }
        })
        this.setState({ BlockUserPopup: false })
        this.setState({ UnBlockUserPopup: false })
        this.setState({ userData: userList })
        this.setState({ loading: false })
      } else {
        if (props.users.get_all_users !== undefined && props.users.get_all_users !== null) {
          props.users.get_all_users.map((prop, key) => {
            if (prop.activeStatus == 0) {
              userList.push(prop)
            }
          })
          this.setState({ BlockUserPopup: false })
          this.setState({ UnBlockUserPopup: false })
          this.setState({ userData: userList })
          this.setState({ loading: false })
        }
      }
    }
    // if(props.users.send_mail_success_resp != undefined && props.users.send_mail_success_resp != ""){
    if (props.users.send_mail_success_resp == 200) {

      this.setState({ loading: false })
      this.setState({ openMailModal: false })
      this.setState({ mailBody: "" })
      this.setState({ sendMailError: "" })
      this.setState({ mail_send_subejct_error: "" })
      this.setState({ subject_singleMail: "" })
    }
    //}

    //if(props.users.send_mail_multiple_users_success != undefined && props.users.send_mail_multiple_users_success != ""){
    if (props.users.send_mail_multiple_users_success == 200) {
      this.setState({ multiple_mail_send_mail_body_error: "" })
      this.setState({ check_box_error: "" })
      this.setState({ multiple_mail_send_subejct_error: "" })
      this.setState({ multiplemailBody: "" })
      this.setState({ subject_multipleMail: "" })
      this.setState({ loading: false })
      this.setState({ openmulitpleMailsendBoxDailog: false })
      this.unCheckedAllUsers()
    }
    //}

    //if(props.users.send_multiple_notifiation_success != undefined && props.users.send_multiple_notifiation_success != ""){

    if (props.users.send_multiple_notifiation_success == 200) {

      this.setState({ notificationBody: "" })
      this.setState({ notification_body_error: "" })
      this.setState({ check_box_notification_error: "" })
      this.setState({ loading: false })
      this.setState({ notifcationDailog: false })
      this.unCheckedAllUsers()
    }
  }


  onOpenModal = (item) => {
    this.setState({ openModal: true });
    this.setState({ userDetails: item })
  };

  onCloseViewModal = () => {
    this.setState({ openModal: false })
  }

  // handleClose = () => {
  //   this.setState({ openModal: false })
  // }

  onMailModal = (user_email) => {
    this.setState({ mailBody: "" })
    this.setState({ subject_singleMail: "" })
    this.setState({ openMailModal: true });
    this.setState({ userEmail: user_email })
  }

  onCloseMailModal = () => {
    this.setState({ sendMailError: "" })
    this.setState({ mail_send_subejct_error: "" })
    this.setState({ mailBody: "" })
    this.setState({ openMailModal: false });

  }

  handleChangeOnMail(e) {
    this.setState({ mailBody: e.target.value })
  };

  handleChangeOnSubject(e) {
    this.setState({ subject_multipleMail: e.target.value })
  }

  handleChangeOnMultipleMail(e) {
    this.setState({ multiplemailBody: e.target.value })
  }

  handleChangeOnNotificationBody(e) {
    this.setState({ notificationBody: e.target.value })
  }

  handleChangeOnSubjectofSingleMail(e) {
    this.setState({ subject_singleMail: e.target.value })
  }

  StatusActiveDactive = (id, status) => {
    this.setState({ notification_success_msg: false })
    //this.setState({ loading: true })
    let is_call = 0
    this.props.ChangeUserStatusByadmin(id, status, is_call)
  }

  OpenUserBlockPopupDailog = (id, status) => {
    // this.setState({ notification_success_msg: false })
    if (status == 0) {
      this.setState({ get_users_status: status })
      this.setState({ get_user_id: id })
      this.setState({ UnBlockUserPopup: true })
    } else {
      this.setState({ get_users_status: status })
      this.setState({ get_user_id: id })
      this.setState({ BlockUserPopup: true })
    }
  }

  BlockUserPopupBoxBoxClose = () => {
    this.setState({ BlockUserPopup: false })
    this.setState({ UnBlockUserPopup: false })
  }

  handleToggleMailCheckBox = (value, index, checked) => {
    let userData = this.state.userData;
    if (checked == 'false') {
      userData[index].is_mail = true;
    } else if (checked == 'true') {
      userData[index].is_mail = false;
    }
    this.setState({ userData: userData })
    return 0;
  }

  unCheckedAllUsers = () => {
    let userData = this.state.userData;
    userData.map((val, index) => {
      if (val.is_mail == true) {
        userData[index].is_mail = false;
      }
    })
    this.setState({ userData: userData })
    return 0;
  }


  openMailSendBoxDailog = () => {
    this.setState({ openmulitpleMailsendBoxDailog: true })
  }

  sendMultipleMailSendToUser = () => {
    let checkBoxSelect = []
    let error = 0
    if (this.state.subject_multipleMail == "") {
      error = 1
      this.setState({ multiple_mail_send_subejct_error: "Please enter subject. " })
    }
    if (this.state.multiplemailBody == "") {
      error = 1
      this.setState({ multiple_mail_send_mail_body_error: "Please enter message. " })
    }
    this.state.userData.map((v, i) => {
      if (v.is_mail == true) {
        checkBoxSelect.push(v.email)
      }
    })
    this.setState({ setCheckBox: checkBoxSelect })
    if (checkBoxSelect.length == 0) {
      error = 1
      this.setState({ check_box_error: "Please select al least one users. " })
    }
    if (error == 0) {
      this.setState({ loading: true })
      this.props.multipleMailsend(this.state.userData, this.state.subject_multipleMail, this.state.multiplemailBody)
    }
  }

  onCloseMultipleMailDailogBox = () => {
    this.setState({ multipleChecked: false })
    this.setState({ openmulitpleMailsendBoxDailog: false })
    this.setState({ multiple_mail_send_mail_body_error: "" })
    this.setState({ check_box_error: "" })
    this.setState({ multiple_mail_send_subejct_error: "" })
    this.setState({ subject_multipleMail: "" })
    this.setState({ multiplemailBody: "" })
    this.setState({ setCheckBox: [] })
    this.unCheckedAllUsers()
  }

  notificationModalOpen = () => {
    this.setState({ notifcationDailog: true })
  }

  onCloseNotificationDailogBox = () => {
    this.setState({ multipleChecked: false })
    this.setState({ notifcationDailog: false })
    this.setState({ notificationBody: "" })
    this.setState({ notification_body_error: "" })
    this.setState({ check_box_notification_error: "" })
    this.unCheckedAllUsers()
  }

  sendMultipleNotificationToUser = () => {
    let checkBoxSelect = []
    let error = 0
    if (this.state.notificationBody == "") {
      error = 1
      this.setState({ notification_body_error: "Please enter mesage." })
    }

    this.state.userData.map((v, i) => {
      if (v.is_mail == true) {
        checkBoxSelect.push(v.email)
      }
    })

    //this.setState({ setNotificationCheckBox: checkBoxSelect  })

    if (checkBoxSelect.length == 0) {
      error = 1
      this.setState({ check_box_notification_error: "Please select al least one users. " })
    }
    if (error == 0) {
      this.props.sendMultipleNotification(this.state.userData, this.state.notificationBody)
    }
  }

  tokenExpAlert = () => {
    //this.props.history.push(Server.LOGOUT_URL);
    localStorage.clear();
    window.location.href = Server.LOGOUT_URL;
  }

  SelectMultiplecheckBox = (event, userData) => {
    if (event.target.value == 'false') {
      this.setState({ multipleChecked: true })
    } else {
      this.setState({ multipleChecked: false })
    }
    {
      userData.map((value, index) => {
        if (event.target.value == 'false') {
          userData[index].is_mail = true;
        } else if (event.target.value == 'true') {
          userData[index].is_mail = false;
        }
        this.setState({ userData: userData })
        return 0;
      })
    }
  }

  SelectAllCheckBox = () => {
    return (
      <List dense className={useStylesDetails.rootMultiMailSend}>
        <ListItem button>
          <ListItemAvatar>
          </ListItemAvatar>
          <ListItemText primary={<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZ }} >Select All</span>} />
          <ListItemSecondaryAction>
            <Checkbox edge="end" value={this.state.multipleChecked ? true : false} onChange={(event) => this.SelectMultiplecheckBox(event, this.state.userData)} checked={this.state.multipleChecked ? true : false} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    )
  }

  renderAllUserList = () => {
    return (<List dense className={useStylesDetails.rootMultiMailSend}>
      {this.state.userData.map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (<ListItem key={value} button>
          <ListItemAvatar>
            <Avatar
              //alt={`Avatar n°${value + 1}`}
              src={value.profileImage !== null ? Server.IMAGES_URL + value.profileImage : defult_user_image} />
          </ListItemAvatar>
          <ListItemText id={labelId} primary={<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZ }} >{value.username}</span>} />
          <ListItemSecondaryAction>
            <Checkbox edge="end" value={value.is_mail ? true : false} onChange={(event) => this.handleToggleMailCheckBox(value, index, event.target.value)} checked={value.is_mail ? true : false} inputProps={{ 'aria-labelledby': labelId }} />
          </ListItemSecondaryAction>
        </ListItem>);
      })}
    </List>);
  };


  sendMail = () => {
    if (this.state.subject_singleMail == "") {
      this.setState({ mail_send_subejct_error: "Please enter subject. " })
    }
    if (this.state.mailBody == "") {
      this.setState({ sendMailError: "Please enter message. " })
    }
    if (this.state.mailBody !== "") {
      this.setState({ loading: true })
      this.props.sendMailToUserByAdmin(this.state.mailBody, this.state.userEmail, this.state.subject_singleMail)
    }
  }

  renderUserChild = () => {
    if (this.state.userDetails.user_child !== undefined && this.state.userDetails.user_child != null) {
      return this.state.userDetails.user_child.map(item => {
        return (
          <Typography>
            <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Gender : {item.gender}</text>
            <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Age : {item.age}</text>
          </Typography>
        )
      })
    }
  }

  renderUserConsidermyself = () => {
    let myConsiderself = []
    if (this.state.userDetails.user_considermyself !== undefined && this.state.userDetails.user_considermyself != null) {
      myConsiderself = _.uniq(this.state.userDetails.user_considermyself, 'id');
      return myConsiderself.map((item, index) => {
        return (
          <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }} key={index}>
            {item.value}
            {myConsiderself.length - 1 == index ? null : ", "}
          </text>
        )
      })
    }
  }

  renderUserIam = () => {
    let iam = []
    if (this.state.userDetails.user_iam !== undefined && this.state.userDetails.user_iam != null) {
      iam = _.uniq(this.state.userDetails.user_iam, 'id');
      return iam.map((item, index) => {
        return (
          <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }} key={index}>
            {item.value}
            {iam.length - 1 == index ? null : ", "}
          </text>
        )
      })
    }
  }

  renderUserInterests = () => {
    if (this.state.userDetails.user_interests !== undefined && this.state.userDetails.user_interests != null) {
      return this.state.userDetails.user_interests.map((item, index) => {
        return (
          <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }} key={index}>
            {item.value}
            {this.state.userDetails.user_interests.length - 1 == index ? null : ", "}
          </text>
        )
      })
    }
  }

  renderUserLookingFriends = () => {
    let looking_friends = []
    if (this.state.userDetails.user_lookingfriends !== undefined && this.state.userDetails.user_lookingfriends != null) {
      looking_friends = _.uniq(this.state.userDetails.user_lookingfriends, 'id');
      return looking_friends.map((item, index) => {
        return (
          <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }} key={index}>
            {item.value}
            {looking_friends.length - 1 == index ? null : ", "}
          </text>
        )
      })
    }
  }

  renderUserRelation = () => {
    let relationship = []
    if (this.state.userDetails.user_relation !== undefined && this.state.userDetails.user_relation != null) {
      relationship = _.uniq(this.state.userDetails.user_relation, 'id');
      return relationship.map((item, index) => {
        return (
          <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }} key={index}>
            {item.value}
            {relationship.length - 1 == index ? null : ", "}
          </text>
        )
      })
    }
  }

  renderUserImges = (user_images) => {
    if (this.state.userDetails.user_images !== undefined && this.state.userDetails.user_images != null) {
      return this.state.userDetails.user_images.map((item, index) => {
        return (
          <text key={index} style={{ display: "inline-block" }}>
            <img style={userImageCont} src={Server.IMAGES_URL + item}></img>
          </text>
        )
      })
    }
  }

  displayEventImages = (event_images) => {
    if (event_images !== undefined && event_images != null) {
      return (
        <div className={useStylesDetails.root}>
          <GridList className={useStylesDetails.gridList} cols={event_images.length == 1 ? 1 : event_images.length == 2 ? 2 : event_images.length == 3 ? 3 : event_images.length == 4 ? 4 : ""}>
            {event_images.map(item => (
              <GridListTile key={item} >
                <img src={Server.IMAGES_URL + item} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      )
    }
  }

  getUniqCategory = (array) => {
    var str = "";
    if (array !== undefined && array !== null) {
      var uniqueArray = [];
      var i = 0
      for (i = 0; i < array.length; i++) {
        if (uniqueArray.indexOf(array[i]) === -1) {
          uniqueArray.push(array[i]);
        }
      }
      if (uniqueArray.length > 0) {
        str = uniqueArray.join(", ");
      } else {
        str = "-";
      }
      return str
    } else {
      return "-"
    }
  }

  getAllActiveDeactiveUsersList = (is_active) => {
    this.setState({ is_active: false })

    if (this.state.is_active == false) {
      this.setState({ loading: true, is_active: true })
      let userList = []
      if (this.state.AlluserData !== undefined && this.state.AlluserData !== null) {
        this.state.AlluserData.map((prop, key) => {
          if (prop.activeStatus == 1) {
            userList.push(prop)
          }
        })
        this.setState({ userData: userList })
        this.setState({ loading: false })
      }
    } else {
      let userList = []
      this.setState({ loading: true, is_active: false })
      if (this.state.AlluserData !== undefined && this.state.AlluserData !== null) {
        this.state.AlluserData.map((prop, key) => {

          if (prop.activeStatus == 0) {
            userList.push(prop)
          }
        })
        this.setState({ userData: userList })
        this.setState({ loading: false })
      }
    }
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      // MUIDataTable: {
      //   responsiveScroll: {
      //     overflowX: 'auto',
      //     overflow: 'auto',
      //     //height: '100%',
      //     //maxHeight: '350px',
      //   },
      // },
      MuiTableCell: {
        // defaul css: padding: 14px 40px 14px 16px;
        // root: {
        //   backgroundColor: "#FF0000"
        // }
        root: {
          padding: this.state.is_active ? this.state.userData.length > 0 ? "14px 2px 15px 16px" : "14px 20px 15px 16px" : this.state.userData.length > 0 ? "14px 21px 15px 16px" : "14px 32px 14px 16px"
        },
        body: {
          fontFamily: Server.REGULAR_FONT,
          fontSize: Server.REGULAR_FONT_SIZE
        }
      },
      MUIDataTableHeadCell: {
        data: {
          fontFamily: Server.REGULAR_FONT,
          fontSize: Server.REGULAR_FONT_SIZE
        },
        root: {
          fontFamily: Server.REGULAR_FONT,
          fontSize: Server.REGULAR_FONT_SIZE
        }
      },
      MuiTablePagination: {
        caption: {
          fontFamily: Server.REGULAR_FONT,
          fontSize: Server.REGULAR_FONT_SIZE
        }
      },
      MuiTypography: {
        subtitle1: {
          fontFamily: Server.REGULAR_FONT,
          fontSize: Server.REGULAR_FONT_SIZE
        }
      },
      MuiInputBase: {
      input: {
        fontFamily: Server.REGULAR_FONT,
        fontSize: Server.REGULAR_FONT_SIZE
      }
      }
    }
  })

  render() {
    //const classesStyle = useStyles();
    const classes = this.props;
    //const { fullScreen } = this.props;
    const { openMailModal, openModal, UnBlockUserPopup, BlockUserPopup, openmulitpleMailsendBoxDailog, notifcationDailog, tokenExpireModal } = this.state

    const useStyles = makeStyles(theme => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      menu: {
        width: 200,
      },
    }));

    if (this.state.loading) {
      return (
        <div style={loaderStyle}>
          <Progressbar></Progressbar>
        </div>
      )
    }
    const columns = [
      { name: "image", label: "Image", options: { filter: true, sort: true, } },
      { name: "email", label: "Email", options: { filter: true, sort: true, } },
      { name: "name", label: "Name", options: { filter: true, sort: true, } },
      // { name: "gender", label: "Gender", options: { filter: true, sort: true, } },
      { name: "intrested_category", label: "Category", options: { filter: true, sort: true, } },
      // { name: "city", label: "City", options: { filter: true, sort: true, } },
      // { name: "country", label: "Country", options: { filter: true, sort: true, } },
      {
        name: "FirebaseId",
        label: "Chat count",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            let count = 0;
            this.state.chat_rooms.map((pros, key) => {
              if (pros.includes(value)) {
                count = count + 1;
              }
            })
            return (
              <span>{count}</span>
            )
          }
        }
      },
      {
        name: "FirebaseId",
        label: "Group count",
        options: {
          filter: false,
          sort: false,
        }
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <FormControlLabel
                control={
                  // <Switch checked={value.activeStatus == 1 ? true : false} onClick={() => this.StatusActiveDactive(value.id, value.activeStatus)} />
                  <Tooltip
                    id="tooltip-top"
                    title="User block-unblock"
                    placement="top"
                  //classes={{ tooltip: classes.tooltip }}
                  >
                    <Switch checked={value.activeStatus == 1 ? true : false} onClick={() => this.OpenUserBlockPopupDailog(value.id, value.activeStatus)} />
                  </Tooltip>
                }
              />
            )
          }
        }
      },
      {
        name: "action",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              // <div style={{ display: "inline-block" }}>
              <text style={{ display: "inline-flex" }}>
                {/* <button onClick={() => this.onOpenModal(value)}>View</button> */}
                <Tooltip
                  id="tooltip-top"
                  title="User details"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Eye style={{ color: "#fb8c00" }} onClick={() => this.onOpenModal(value)}></Eye>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Send mail"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Email style={{ marginLeft: "5px", color: "#fb8c00" }} onClick={() => this.onMailModal(value.email)}></Email>
                </Tooltip>
                {/* <button onClick={() => this.onMailModal(value.email)}>Mail</button> */}
              </text>
            )
          }
        }
      },
    ];

    const options = {
      filter: false,
      download: false,
      print: false,
      viewColumns: false,
      selectableRows: false,
      filterType: 'stacked',
      responsive: 'stacked',
      // responsiveScroll: {
      //   backgroundColor: "red"
      // }
    };

    return (
      <div>
        {/* open token expire modalboc */}
        <ToastContainer />
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
        <Dialog
          fullWidth={true}
          maxWidth={'sm'}
          open={openModal}
          onClose={() => this.onCloseViewModal()}
          aria-labelledby="alert-dialog-title-report-abuse"
          aria-describedby="alert-dialog-description-report-abuse"
        >
          <DialogTitle id="alert-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: "18px" }} >User Details</span>}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description-report-abuse">
              <div>
                <div style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >User images</div>
                {this.renderUserImges(this.state.userDetails.user_images)}
              </div>
              <br></br>

              <div>
                <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >User name : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.userDetails.username} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }}> Email : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}> {this.state.userDetails.email} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Gender : </text> <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.userDetails.gender} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Birth date : </text> <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.userDetails.dob} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >My story : </text>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                <ShowMore
                  lines={1}
                  more='Show more'
                  less='Show less'
                  anchorClass=''
                >
                  {this.state.userDetails.mystory}
                </ShowMore>
              </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Country : </text> <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.userDetails.country} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >State : </text> <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }} >{this.state.userDetails.state} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >City : </text> <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.userDetails.city} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Work place : </text> <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.userDetails.work_place} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Work position : </text> <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.userDetails.work_position} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Status : </text> <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.userDetails.activeStatus == 1 ? "Active" : "Deactive"} </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }}>User child</text>
              </div>
              {this.renderUserChild()}
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }}>User considermyself</text>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                <ShowMore
                  lines={1}
                  more='Show more'
                  less='Show less'
                  anchorClass=''
                >
                  {this.renderUserConsidermyself()}
                </ShowMore>
              </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }}>User iam</text>
              <br></br>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                <ShowMore
                  lines={1}
                  more='Show more'
                  less='Show less'
                  anchorClass=''
                >
                  {this.renderUserIam()}
                </ShowMore>
              </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }}>User interests</text>
              <br></br>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                <ShowMore
                  lines={1}
                  more='Show more'
                  less='Show less'
                  anchorClass=''
                >
                  {this.renderUserInterests()}
                </ShowMore>
              </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }}>User looking friends</text>
              <br></br>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                <ShowMore
                  lines={1}
                  more='Show more'
                  less='Show less'
                  anchorClass=''
                >
                  {this.renderUserLookingFriends()}
                </ShowMore>
              </text>
              </div>
              <br></br>

              <div>
              <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }}>User relation friends</text>
              <br></br>
              {this.renderUserRelation()}
              </div>


            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.onCloseViewModal()} color="primary" autoFocus>
              Close
          </Button>
          </DialogActions>
        </Dialog>


        <Dialog
          fullWidth={true}
          maxWidth={'xs'}
          open={openMailModal}
          onClose={() => this.onCloseMailModal()}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Mail Send</span>}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Container maxWidth={'lg'}>
                <TextField
                  id="outlined-multiline-static"
                  label="Subject"
                  value={this.state.subject_singleMail}
                  onChange={this.handleChangeOnSubjectofSingleMail}
                  defaultValue="Subject type here..."
                  inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, width: "270px" } }}
                  margin="normal"
                  variant="outlined"
                />
                <span style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.mail_send_subejct_error}</span>

                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows="4"
                  value={this.state.mailBody}
                  onChange={this.handleChangeOnMail}
                  defaultValue="Message type here..."
                  inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, width: "270px" } }}
                  margin="normal"
                  variant="outlined"
                />
                <span style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.sendMailError}</span>
              </Container>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.sendMail()} color="primary">
              Send
          </Button>
            <Button onClick={() => this.onCloseMailModal()} color="primary" autoFocus>
              Cancel
          </Button>
          </DialogActions>
        </Dialog>

        {/* multiple Mail send */}

        <Dialog
          fullWidth={true}
          maxWidth={'xs'}
          open={openmulitpleMailsendBoxDailog}
          //onClose={() => this.onCloseMailModal()}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Multiple Mail Send</span>}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Container maxWidth={'lg'}>
                <TextField
                  id="outlined-multiline-static"
                  label="Subject"
                  //multiline
                  //rows="4"
                  value={this.state.subject_multipleMail}
                  onChange={this.handleChangeOnSubject}
                  //style={{ width: 300, fontFamily: Server.REGULAR_FONT, fontSize: "20px" }}
                  inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, width: "270px" } }}
                  defaultValue="Subject type here..."
                  className={useStyles.textField}
                  margin="normal"
                  variant="outlined"
                />
                <div style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                  <span>{this.state.multiple_mail_send_subejct_error}</span>
                </div>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows="4"
                  value={this.state.multiplemailBody}
                  onChange={this.handleChangeOnMultipleMail}
                  style={ModalStyle}
                  inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE } }}
                  defaultValue="Message type here..."
                  className={useStyles.textField}
                  margin="normal"
                  variant="outlined"
                />

                <div style={{ color: "red", marginTop: '-29px', fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                  <span>{this.state.multiple_mail_send_mail_body_error}</span>
                </div>

                <div style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                  <span>{this.state.check_box_error}</span>
                </div>
                {this.SelectAllCheckBox()}
                {this.renderAllUserList()}

              </Container>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.sendMultipleMailSendToUser()} color="primary">
              Send
          </Button>
            <Button onClick={() => this.onCloseMultipleMailDailogBox()} color="primary" autoFocus>
              Cancel
          </Button>
          </DialogActions>
        </Dialog>


        {/* notification send */}
        <Dialog
          fullWidth={true}
          maxWidth={'xs'}
          open={notifcationDailog}
          //onClose={() => this.onCloseMailModal()}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Notification Send</span>}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Container component="main" maxWidth={'lg'}>
                <form className={classes.form}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows="4"
                    value={this.state.notificationBody}
                    onChange={this.handleChangeOnNotificationBody}
                    style={ModalStyle}
                    inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE } }}
                    defaultValue="Message type here..."
                    className={useStyles.textField}
                    margin="normal"
                    variant="outlined"
                  />
                  <div style={{ color: "red", marginTop: '-29px', fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                    <span>{this.state.notification_body_error}</span>
                  </div>

                  <div style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                    <span>{this.state.check_box_notification_error}</span>
                  </div>
                  {this.SelectAllCheckBox()}
                  {this.renderAllUserList()}
                </form>
              </Container>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.sendMultipleNotificationToUser()} color="primary">
              Send
          </Button>
            <Button onClick={() => this.onCloseNotificationDailogBox()} color="primary" autoFocus>
              Cancel
          </Button>
          </DialogActions>
        </Dialog>

        {/* block users popup dialog */}
        <div>
          <Dialog
            open={this.state.is_active ? BlockUserPopup : UnBlockUserPopup}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Block user"}</DialogTitle>
            <DialogContent>
              {this.state.is_active ?
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to block this user? <br></br>If you ever wish to remove an user from here, user will not takes part in any functionality
                </DialogContentText> :
                
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to un-block this user.
                </DialogContentText>
              }

            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.BlockUserPopupBoxBoxClose()} color="primary" autoFocus>
                Close
          </Button>
              {this.state.is_active ? <Button onClick={() => this.StatusActiveDactive(this.state.get_user_id, this.state.get_users_status)} color="primary" autoFocus>
                Block
          </Button> : <Button onClick={() => this.StatusActiveDactive(this.state.get_user_id, this.state.get_users_status)} color="primary" autoFocus>
                  Unblock
          </Button>}

            </DialogActions>
          </Dialog>
        </div>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <div style={{ display: "inline-flex" }}>
              <text style={{ marginTop: "4px", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Active / Deactive switch</text>
              <div style={{ marginTop: "-5px" }}>
                <Tooltip
                  id="tooltip-top"
                  title="Active/deactive"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Switch checked={this.state.is_active ? true : false} onClick={() => this.getAllActiveDeactiveUsersList(this.state.is_active)} />
                </Tooltip>
              </div>

              <div style={{ marginLeft: "35px", display: "inline-flex" }}>
                <text style={{ marginTop: "4px", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Send Mail & Notification : &nbsp;&nbsp;&nbsp;</text>
                <Tooltip
                  id="tooltip-top"
                  title="Send multiple mail"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Email style={{ color: "#fb8c00" }} onClick={() => this.openMailSendBoxDailog()} />
                </Tooltip>

                <div style={{ marginLeft: "15px" }}>
                  <Tooltip
                    id="tooltip-top"
                    title="Send multiple notification"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Notifications style={{ color: "#fb8c00" }} onClick={() => this.notificationModalOpen()} />
                  </Tooltip>
                </div>
              </div>
              {/* <text>Notification send</text> */}
            </div>
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>User List</span>}
                debugger
                data={this.state.userData.map(item => {
                  let get_image = item.profileImage
                  let src = ""
                  if (get_image == null) {
                    get_image = defult_user_image
                    src = <img style={imageCont} src={get_image} />
                  } else {
                    get_image = Server.IMAGES_URL + get_image
                    src = <img style={imageCont} src={get_image} />
                  }
                  return [
                    src,
                    item.email,
                    item.username,
                    //item.gender == "" ? "-" : item.gender,

                    <ShowMore
                      lines={2}
                      more='more'
                      less='less'
                      anchorClass=''
                    >
                      {this.getUniqCategory(item.maincategory)}
                    </ShowMore>,
                    //item.city == "" ? "-" : item.city,
                    //item.country == "" ? "-" : item.country,
                    item.firebaseId,
                    item.group_count,
                    item,
                    item
                  ]
                })}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider>
          </GridItem>
        </GridContainer>
      </div >
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
  getAllUserList: () => { dispatch(actions.getAllUserList()) },
  getChatRoomsData: (request) => { dispatch(actions.getChatRoomsData(request)) },
  sendMailToUserByAdmin: (mailBody, userEmail, subject) => { dispatch(actions.sendMailToUserByAdmin(mailBody, userEmail, subject)) },
  ChangeUserStatusByadmin: (id, status, is_call) => { dispatch(actions.ChangeUserStatusByadmin(id, status, is_call)) },
  multipleMailsend: (data, subject, message) => { dispatch(actions.multipleMailsend(data, subject, message)) },
  sendMultipleNotification: (data, message) => { dispatch(actions.sendMultipleNotification(data, message)) },

});

export default connect(mapStateToProps, mapDispatchToProps)(TableList);


