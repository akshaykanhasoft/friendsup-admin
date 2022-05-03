import React from "react";
// @material-ui/core components
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
//import image from "../../assets/img/sidebar-2.jpg";
//import image from "../../../public/sidebar-2.jpg";
import MUIDataTable from "mui-datatables";
import Progressbar from '../Progressbar.js';
import defult_user_image from '../../assets/img/avatar_square.png';
import Server from '../../config'
import moment from 'moment';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

var imageCont = {
  height: 50,
  width: 50,
}

var loaderStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

class GroupChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupChatData: [],
      image: Server.SIDEBAR_BACK_IMAGE_URL,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      loading: false,
      tokenExpireModal: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true })
    this.props.getAllGroupChatList()
  }

  componentWillReceiveProps(props) {
    if (props.dashboard_data.token_expire == 401) {
      this.setState({ tokenExpireModal: true })
    }
    let groupChatList = []
    if (props.groupschat.get_group_chat_data !== undefined && props.groupschat.get_group_chat_data !== null) {
      props.groupschat.get_group_chat_data.map((prop, key) => {
        groupChatList.push(prop)
      })
      this.setState({ groupChatData: groupChatList })
      this.setState({ loading: false })
    }
  }

  tokenExpAlert = () => {
    //this.props.history.push(Server.LOGOUT_URL);
    localStorage.clear();
    window.location.href = Server.LOGOUT_URL;
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiTableCell: {
        body: {
          fontFamily: Server.REGULAR_FONT,
          fontSize: Server.REGULAR_FONT_SIZE
        }
      },
      MUIDataTableHeadCell:{
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
    const { tokenExpireModal } = this.state
    if (this.state.loading) {
      return (
        <div style={loaderStyle}>
          <Progressbar></Progressbar>
        </div>
      )
    }
    const columns = [
      { name: "image", label: "Image", options: { filter: true, sort: true, } },
      //{ name: "email", label: "Email", options: { filter: true, sort: true, } },
      { name: "group_name", label: "Name", options: { filter: true, sort: true, } },
      { name: "owner_name", label: "Owner name", options: { filter: true, sort: true, } },
      { name: "group_member", label: "Group member", options: { filter: true, sort: true, } },
      { name: "date", label: "Created date", options: { filter: true, sort: true, } },
      // {
      //   name: "FirebaseId",
      //   label: "Chat count",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (value, tableMeta, updateValue) => {
      //       let count = 0;
      //       this.state.chat_rooms.map((pros, key) => {
      //         if (pros.includes(value)) {
      //           count = count + 1;
      //         }
      //       })
      //       return (
      //         <span>{count}</span>
      //       )
      //     }
      //   }
      // },
    ];

    const options = {
      filter: false,
      download: false,
      print: false,
      viewColumns: false,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
    };

    return (
      <div>

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

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Group Chat List</span>}
                data={this.state.groupChatData.map(item => {
                  var dateTime = moment.unix(item.timestamp).format('MMMM DD YYYY, h:mm');
                  let get_image = item.group_image
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
                    item.display_name,
                    item.username == null ? "-" : item.username,
                    item.group_member_count,
                    dateTime
                  ]
                })}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  groupschat: state.GroupChat,
  dashboard_data: state.Dashboard
})

const mapDispatchToProps = dispatch => ({
  getAllGroupChatList: () => { dispatch(actions.getAllGroupChatList()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupChat)