import React from "react";
// @material-ui/core components
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
//import image from "../../assets/img/sidebar-2.jpg";
import Tooltip from "@material-ui/core/Tooltip";
import image from "../../../public/sidebar-2.jpg";
import Server from '../../config'
import defult_group_image from '../../assets/img/avatar_square.png';
import MUIDataTable from "mui-datatables";
//import Moment from 'react-moment';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Progressbar from '../Progressbar.js';
import moment from 'moment';
import { Link } from "react-router-dom";
import _ from 'underscore'
import Eye from '@material-ui/icons/RemoveRedEye'
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

class GroupsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            groupData: [],
            image: Server.SIDEBAR_BACK_IMAGE_URL,
            color: "blue",
            tokenExpireModal: false,
            hasImage: true,
            fixedClasses: "dropdown show",
            mobileOpen: false,
            loading: false
        };
    }

    componentWillMount() {
        this.setState({ loading: true })
        this.props.getAllGroupsList()
    }

    componentWillReceiveProps(props) {
        if (props.dashboard_data.token_expire == 401) {
            this.setState({ tokenExpireModal: true })
        }
        let groupList = []
        if (props.groups.get_group_data !== undefined && props.groups.get_group_data !== null) {
            let myGroup = [];
            myGroup = _.uniq(props.groups.get_group_data, 'id');
            myGroup.map((prop, key) => {
                groupList.push(prop)
            })
            this.setState({ groupData: groupList })
            this.setState({ loading: false })
        }
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

    GroupOnclick = (id) => {
        this.context.router.push({
            path: "/admin/group_details" + id,
        })
    }

    tokenExpAlert = () => {
        localStorage.clear();
        window.location.href = Server.LOGOUT_URL;
    }

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
            { name: "group_name", label: "Group name", options: { filter: true, sort: true, } },
            { name: "group_owner", label: "Group owner", options: { filter: true, sort: true, } },
            { name: "member_count", label: "Member count", options: { filter: true, sort: true, } },
            { name: "report_abuse_count", label: "Report", options: { filter: true, sort: true, } },
            { name: "date", label: "Created date", options: { filter: true, sort: true, } },
            {
                name: "view", label: "View",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            //   <Link to={"/admin/group_details/" + value.id}>View</Link>
                            <Tooltip
                                id="tooltip-top"
                                title="Group post details"
                                placement="top"
                                //classes={{ tooltip: classes.tooltip }}
                                >
                            <Link style={{ color: "#000000" }} to={"/friendsup-admin/group_details/" + value.id}><Eye style={{ color: "#e53935" }}></Eye></Link>
                            </Tooltip>
                        )
                    }
                }
            },


            // { name: "country", label: "Country", options: { filter: true, sort: true, } },
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
                                title={<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Group List</span>}
                                data={this.state.groupData.map(item => {
                                    var dateTime = moment.unix(item.created_date).format('MM-DD-YYYY, h:mm a');
                                    let get_image = item.group_profile
                                    let src = ""
                                    if (get_image == null) {
                                        get_image = defult_group_image
                                        src = <img style={imageCont} src={get_image} />
                                    } else {
                                        get_image = Server.IMAGES_URL + get_image
                                        src = <img style={imageCont} src={get_image} />
                                    }
                                    return [
                                        // <Link to={"/admin/group_details/" + item.id}>{src}</Link>,
                                        src,
                                        item.group_name,
                                        item.username,
                                        item.group_member_count,
                                        item.report_abuser_count,
                                        dateTime,
                                        // item.gender,
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
        )
    }
}


const mapStateToProps = state => ({
    groups: state.Groups,
    dashboard_data: state.Dashboard
})

const mapDispatchToProps = dispatch => ({
    getAllGroupsList: () => { dispatch(actions.getAllGroupsList()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)