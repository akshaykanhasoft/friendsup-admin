import React from "react";
// @material-ui/core components
// core components
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from '@material-ui/core/Button';
import GridContainer from "../../components/Grid/GridContainer.jsx";
//import image from "../../assets/img/sidebar-2.jpg";
//import image from "../../../public/sidebar-2.jpg";
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import _ from 'underscore'
import Progressbar from '../Progressbar.js';
import Eye from '@material-ui/icons/RemoveRedEye'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Server from '../../config'
import defult_user_image from '../../assets/img/avatar_square.png';


var userImageCont = {
  height: 50,
  width: 50,
  marginLeft: 5
}


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

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
      image: Server.SIDEBAR_BACK_IMAGE_URL,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      loading: false,
      openModal: false,
      eventDetails: "",
      tokenExpireModal: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true })
    this.props.getAllEvents()
  }

  componentWillReceiveProps(props) {
    if(props.dashboard_data.token_expire == 401){
      this.setState({ tokenExpireModal: true })
   }
    let eventList = []
    if (props.event.get_event_data !== undefined && props.event.get_event_data !== null) {
      let mySubArray = [];
      mySubArray = _.uniq(props.event.get_event_data, 'event_id');
      mySubArray.map((prop, key) => {
        eventList.push(prop)
      })
      this.setState({ eventData: eventList })
      this.setState({ loading: false })
    }
  }


  onOpenModal = (item) => {
    this.setState({ openModal: true });
    this.setState({ eventDetails: item })
  };

  onCloseViewModal = () => {
    this.setState({ openModal: false })
  }

  displayEventImages = (event_images) => {
    if (event_images !== undefined && event_images != null) {
        return event_images.map((item, index) => {
          return (
            <div key={index} style={{display: "inline-block"}}>
              <img style={userImageCont} key={index} src={Server.IMAGES_URL + item}></img>
            </div>
          )
        })
    }
  }
  
  DisplayEventStartDate = (s_date) => {
    let get_start_date = moment(s_date, 'DD-MM-YYYY h:mm a').unix();
    let dateTime = moment.unix(get_start_date).format('MM-DD-YYYY, h:mm a');
    return dateTime
  }

  DisplayEventEndDate = (e_date) => {
    let get_end_date = moment(e_date, 'DD-MM-YYYY h:mm a').unix();
    let dateTime = moment.unix(get_end_date).format('MM-DD-YYYY, h:mm a');
    return dateTime
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
    const { openModal,tokenExpireModal } = this.state
    //const { fullScreen } = this.props;
    if (this.state.loading) {
      return (
        <div style={loaderStyle}>
          <Progressbar></Progressbar>
        </div>
      )
    }
    const columns = [
      { name: "image", label: "Image", options: { filter: false, sort: false, } },
      { name: "e_name", label: "Event neme", options: { filter: true, sort: true, } },
      { name: "event_owner", label: "Event owner", options: { filter: true, sort: true, } },
      { name: "intrested", label: "Intrested", options: { filter: false, sort: false, } },
      { name: "going", label: "Going", options: { filter: false, sort: false, } },
      { name: "s_time", label: "Start time", options: { filter: false, sort: false, } },
      { name: "e_time", label: "End time", options: { filter: false, sort: false, } },
      { name: "date", label: "Created date", options: { filter: false, sort: false, } },
      {
        name: "view", label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div>
                <Tooltip
                  id="tooltip-top"
                  title="Event details"
                  placement="top"
                  //classes={{ tooltip: classes.tooltip }}
                >
                <Eye style={{ color: "#43a047" }} onClick={() => this.onOpenModal(value)}></Eye>
                </Tooltip>
              </div>
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


        <div>
          <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={openModal}
            onClose={() => this.onCloseViewModal()}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title-report-abuse"
            aria-describedby="alert-dialog-description-report-abuse"
          >
            <DialogTitle id="alert-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Event Details</span>}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description-report-abuse">
              <div>
                   {/* <div>
                    <text>Event Image :- {this.displayEventImages(this.state.eventDetails.event_image)}</text>
                  </div>  */}

                  <div>
                    <div style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Event Image</div>
                    {this.displayEventImages(this.state.eventDetails.event_image)}
                  </div>
                  <br></br>
                  <div>
                    <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE,color: Server.GREEN_COLOR }} >Owner name : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.eventDetails.username}</text>
                  </div>
                  <br></br>
                  <div>
                    <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Event name : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.eventDetails.event_name}</text>
                  </div>
                  <br></br>
                  <div>
                    <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Event description : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.eventDetails.event_description}</text>
                  </div>
                  <br></br>
                  <div>
                    <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} > Event location : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }} >{this.state.eventDetails.event_location}</text>
                  </div>
                  <br></br>
                  <div>
                    <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Event start date : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }} >{this.DisplayEventStartDate(this.state.eventDetails.event_start_date)}</text>
                  </div>
                  <br></br>
                  <div>
                    <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Event end date : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.DisplayEventEndDate(this.state.eventDetails.event_end_date)}</text>
                  </div>
                  <br></br>
                  <div>
                    <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Event event type : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.eventDetails.event_type == 1 ? 'Private' : 'Public'}</text>
                  </div>
                  <br></br>
                  <div>
                    <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Event going user : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.eventDetails.goingusers}</text>
                  </div>
                  <br></br>
                  <div>
                    <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, color: Server.GREEN_COLOR }} >Event intersted user : </text><text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.eventDetails.interestedusers}</text>
                  </div>
                </div>
                
                
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.onCloseViewModal()} color="primary" autoFocus>
                Close
          </Button>
            </DialogActions>
          </Dialog>
        </div>

        <GridContainer>
          <GridItem xs={18} sm={18} md={18}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={<span style={{ fontFamily: Server.REGULAR_FONT, fontSize:Server.REGULAR_FONT_SIZE }}>Event List</span>}
              data={this.state.eventData.map(item => {
                var dateTime = moment.unix(item.created_at).format('MM-DD-YYYY, h:mm a');
                var convert_start_time = moment(item.event_start_date, 'DD-MM-YYYY h:mm').unix();
                var convert_end_time = moment(item.event_end_date, 'DD-MM-YYYY h:mm').unix();
                var start_date_format = moment.unix(convert_start_time).format('MM-DD-YYYY, h:mm a');
                var end_date_format = moment.unix(convert_end_time).format('MM-DD-YYYY, h:mm a');
                let get_image = item.event_images
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
                  item.event_name,
                  item.username,
                  item.interestedusers,
                  item.goingusers,
                  start_date_format,
                  end_date_format,
                  dateTime,
                  item
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
  event: state.Events,
  dashboard_data: state.Dashboard
})

const mapDispatchToProps = dispatch => ({
  getAllEvents: () => { dispatch(actions.getAllEvents()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(EventList)