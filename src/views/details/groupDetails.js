import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
//import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Foodimages from '../../../src/images/39eaca1872e72840d161e2977cc8855a.jpg';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from '../../components/Grid/GridItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import ImageUi from 'material-ui-image'
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import IconButton from '@material-ui/core/IconButton';
//import CommentIcon from '@material-ui/icons/Comment';
//import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import defult_user_image from '../../assets/img/avatar_square.png';
import Server from '../../config'
import moment from 'moment';
import ReportIcon from '@material-ui/icons/Report'
//import { Link } from "react-router-dom";
import ShowMore from 'react-show-more';
import { ToastContainer } from 'react-toastify';

var ImagemediaStyle = {
  height: 0,
  paddingTop: '56.25%', // 16:9
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  button: {
    margin: theme.spacing(1),
  },
}));


class GroupDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      GroupPostData: [],
      DeletepostPopup: false,
      DeletepostId: "",
      reportModal: false,
      GroupAbuseData: [],
      group_post_owner_id: ""
    }
  }

  componentWillMount() {
    this.props.getGroupDetails(this.props.match.params.id)
    //this.props.group_post_listing(this.props.details.id)
  }

  handleExpandClick = () => {
    this.setState({ expanded: true })
  }

  componentWillReceiveProps(props) {
    let groupPostListing = []
    if (props.groups.get_group_post_data !== null && props.groups.get_group_post_data !== undefined) {
      props.groups.get_group_post_data.map((prop, key) => {
        groupPostListing.push(prop)
      })
      this.setState({ GroupPostData: groupPostListing })
      this.setState({ DeletepostPopup: false })
    }
    let groupAbuseListing = []
    if (props.groups.get_report_abuse_by_post_id !== null && props.groups.get_report_abuse_by_post_id !== undefined) {
      props.groups.get_report_abuse_by_post_id.map((val, index) => {
        groupAbuseListing.push(val)
      })
      this.setState({ GroupAbuseData: groupAbuseListing })
    }
    if (props.users.user_block_by_admin == 200) {
      this.setState({ reportModal: false })
    }
  }

  timeDislpay = (time) => {
    var new_time = "";
    var new_date_format = moment.unix(time).format("MM-DD-YYYY")
    let yesterday = moment(new Date()).add(-1, 'days').format("MM-DD-YYYY");
    //var pr = moment().subtract(1).format("MM-DD-YYYY")
    var today_date = moment().format("MM-DD-YYYY");
    if (time != undefined) {
      if (new_date_format == today_date) {
        new_time = moment.unix(time).format("hh:mm a")
      } else if (new_date_format < today_date) {
        if (yesterday == new_date_format) {
          new_time = "Yesterday " + moment.unix(time).format("hh:mm a")
        }
        else if (new_date_format > yesterday) {
          new_time = moment.unix(time).format("MM-DD-YYYY hh:mm a")
        } else {
          new_time = moment.unix(time).format("MM-DD-YYYY hh:mm a")
        }
      } else {
        new_time = moment.unix(time).format("MM-DD-YYYY hh:mm a")
      }
    } else {
      new_time = ""
    }
    return new_time
  }

  delelePost = (post_id) => {
    this.setState({ DeletepostPopup: true })
    this.setState({ DeletepostId: post_id })
  }

  deleteGroupPost = () => {
    this.props.match.params.id
    let request = { post_id: this.state.DeletepostId, group_id: this.props.match.params.id }
    this.props.deleteGroupPostId(request)
  }

  opemReportModal = (group_post_id, user_id) => {
    this.setState({ reportModal: true })
    this.setState({ group_post_owner_id: user_id })
    this.props.getreportAbuserListData(group_post_id)
  }

  handleCloseReportDailog = () => {
    this.setState({ reportModal: false })
  }

  blockGroupOwner = () => {
    let status = 1
    let is_call = 1
    this.props.ChangeUserStatusByadmin(this.state.group_post_owner_id, status, is_call)
  }

  reportAbuserList = () => {
    if (this.state.GroupAbuseData !== null && this.state.GroupAbuseData !== undefined) {
      if (this.state.GroupAbuseData.length > 0) {
        return this.state.GroupAbuseData.map((val, index) => {
          return (
            <List className={useStyles.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={val.image_name !== null && val.image_name !== undefined ? Server.IMAGES_URL + val.image_name : defult_user_image} />
                </ListItemAvatar>
                <ListItemText
                  primary={<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{val.username}</span>}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={useStyles.inline}
                        color="textPrimary"
                      >
                      </Typography>
                      {<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{val.reason}</span>}
                    </React.Fragment>
                  }
                />
                {/* <ListItemSecondaryAction>
                          <text>{val.created_date}</text>
            </ListItemSecondaryAction> */}
              </ListItem>

              <Divider variant="inset" component="li" />
            </List>
          )
        })
      } else {
        return (
          <div>
            <text>Repost not found</text>
          </div>
        )
      }
    }

  }

  RederGroupPostDetails = (Data) => {
    if (Data !== undefined && Data !== null) {
      if (Data.length > 0) {
        return Data.map((val, index) => {

          let images = ""
          let group_images = val.groups_images
          let group_post_location
          let user_image = ""
          if (group_images !== null && group_images !== undefined) {
            images = Server.IMAGES_URL + val.groups_images
          } else {
            images = defult_user_image
          }
          if (val.group_post_location == "") {
            group_post_location = val.group_post_location
          } else {
            group_post_location = ""
          }
          if (val.user_images !== null && val.user_images !== undefined && val.user_images !== "") {
            user_image = Server.IMAGES_URL + val.user_images
          } else {
            user_image = defult_user_image
          }
          return (
            <GridItem key={index} xs={12} sm={12} md={6} style={{ marginBottom: "30px" }}>
              <Card>
                <CardHeader style={{ height: "70px" }}
                  avatar={
                    <Avatar aria-label="Recipe" src={user_image} className={useStyles.avatar}>
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="Settings">
                      {/* <MoreVertIcon onClick={() => this.delelePost(val.groups_post_id)} /> */}
                      <Delete onClick={() => this.delelePost(val.groups_post_id)}></Delete>
                    </IconButton>
                  }
                  //title={val.group_post_text}
                  title={<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{val.username}</span>}
                  subheader={
                    <div>
                      <span style={{  fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                        {this.timeDislpay(val.modified_date)}
                      </span>
                      <br></br>
                      <span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                        {val.group_post_location}
                      </span>
                      <br></br>
                      {/* <span style={{ color: "#000000", fontSize: "15px"}} >
                        {val.group_post_text}
                      </span> */}
                    </div>
                  }
                />
                <CardMedia
                  style={ImagemediaStyle}
                  image={images}
                // title={group_post_location}
                //location={val.group_post_location}
                />
                <CardContent>
                  {/* <Typography style={{ color: "#000000", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }} variant="body2" color="textSecondary" component="p">
                    {val.group_post_text == "" ? "" : val.group_post_text}
                  </Typography> */}
                  <div style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                  <ShowMore
                    lines={2}
                      more='Show more'
                      less='Show less'
                      anchorClass=''
                  >
                    {val.group_post_text == "" ? "" : val.group_post_text}
                  </ShowMore>
                  </div>
                </CardContent>
              <CardActions disableSpacing>
                {/* <IconButton aria-label="Add to favorites"> */}
                {/* <FavoriteIcon onClick={() => this.opemReportModal(val.id)} /> */}
                {val.report_count == 0 ? "" :
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                    <ReportIcon style={{ color: "#FF0000" }} onClick={() => this.opemReportModal(val.id, val.user_id)}></ReportIcon>
                    <span style={{ marginLeft: "10px" }}>Report Count : {val.report_count}</span>
                  </div>
                }
                {/* <ReportIcon style={{ color: "#FF0000" }} onClick={() => this.opemReportModal(val.id, val.user_id)}></ReportIcon>
                  <text style={{ marginLeft: "10px" }}>Report Count : {val.report_count}</text> */}
                {/* </IconButton> */}
                {/* <IconButton aria-label="Share">
                      <ShareIcon />
                    </IconButton> */}
                {/* <IconButton
                      className={clsx(useStyles.expand, {
                        [useStyles.expandOpen]: this.state.expanded,
                      })}
                      onClick={() => this.handleExpandClick()}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton> */}
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                    minutes.
              </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
              </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
                </CardContent>
              </Collapse>
              </Card>
            </GridItem >
          )
      })
    } else {
      return (
        <div>
          <text style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Sorry no post found</text>
        </div>
      )
    }
  }
}

deletePostDialougeBoxClose = () => {
  this.setState({ DeletepostPopup: false })
}

render() {
  const { DeletepostPopup, reportModal } = this.state
  //const [anchorEl, setAnchorEl] = React.useState(null)
  return (
    <div>
      <ToastContainer />
      <div style={{ marginBottom: '25px' }}>
        {/* <Link to={"/friendsup-admin/groups"}>Back</Link> */}
        <Button href="/friendsup-admin/groups" className={useStyles.button}>
          Go Back
      </Button>
      </div>
      <GridContainer>
        <div>
          <Dialog
            open={DeletepostPopup}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Delete Post</span>}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Are you sure you want to delete this post?</span>}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.deletePostDialougeBoxClose()} color="primary" autoFocus>
                Close
          </Button>

              <Button onClick={() => this.deleteGroupPost()} color="primary" autoFocus>
                Delete
          </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={reportModal}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title-report-abuse"
            aria-describedby="alert-dialog-description-report-abuse"
          >
            <DialogTitle id="alert-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Report abuse</span>}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description-report-abuse">
                {/* Are you sure you want to delete this post. */}
                {this.reportAbuserList()}

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => this.blockGroupOwner()} autoFocus>
                Block post owner
          </Button>
              <Button onClick={() => this.handleCloseReportDailog()} color="primary" autoFocus>
                Close
          </Button>
            </DialogActions>
          </Dialog>
        </div>


        {this.RederGroupPostDetails(this.state.GroupPostData)}
      </GridContainer>
    </div>
  );
}
}

const mapStateToProps = state => {
  return ({
    groups: state.Groups,
    users: state.Users,
  })
}

const mapDispatchToProps = dispatch => ({
  getGroupDetails: (id) => { dispatch(actions.getGroupDetails(id)) },
  deleteGroupPostId: (request) => { dispatch(actions.deleteGroupPostId(request)) },
  getreportAbuserListData: (group_post_id) => { dispatch(actions.getreportAbuserListData(group_post_id)) },
  ChangeUserStatusByadmin: (id, status, is_call) => { dispatch(actions.ChangeUserStatusByadmin(id, status, is_call)) },


});

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);