import React from "react";
// @material-ui/core components
// core components
import _ from 'underscore'
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
//import image from "../../assets/img/sidebar-2.jpg";
import Tooltip from "@material-ui/core/Tooltip";
//import image from "../../../public/sidebar-2.jpg";
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import MUIDataTable from "mui-datatables";
import Progressbar from '../Progressbar.js';
import Delete from '@material-ui/icons/Delete'
import Eye from '@material-ui/icons/RemoveRedEye'
//import AddIcon from '@material-ui/icons/Add'
import Server from '../../config'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import ImageUi from 'material-ui-image'
import Cancel from '@material-ui/icons/Cancel'
import defult_user_image from '../../assets/img/avatar_square.png';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
//var reader = new FileReader();

var loaderStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

var imageCont = {
    height: 50,
    width: 50,
}

var uploadImageCont = {
    backgroundImage: <Cancel></Cancel>,
    height: 100,
    width: 100,
}

class MainCategory extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.state = {
            userData: [],
            chat_rooms: [],
            categoryData: [],
            EventcategoryData: [],
            image: Server.SIDEBAR_BACK_IMAGE_URL,
            color: "blue",
            hasImage: true,
            fixedClasses: "dropdown show",
            mobileOpen: false,
            loading: false,
            openCategoryAddDailog: false,
            addDialogBoxClose: false,
            uploadCategoryImage: null,
            category_name: "",
            editCategoryPopup: false,
            categoryEditDatal: "",
            old_image: "",
            category_id: "",
            delete_category_id: "",
            deleletePopupModal: false,
            CategorynameError: "",
            get_database_image: "",
            getImageData: "",
            tokenExpireModal: false,
        };
    }

    componentWillMount() {
        this.setState({ loading: true })
        //this.props.getAllMainIntrestCategory()
        this.props.getAllEventCategory()
        //this.props.getAllUserList()
    }

    componentWillReceiveProps(props) {
        if (props.dashboard_data.token_expire == 401) {
            this.setState({ tokenExpireModal: true })
        }

        let EventcategoryList = []
        // if (props.category.get_main_intrest_category !== undefined && props.category.get_main_intrest_category !== undefined) {
        //     let cat_main_arr = [];

        //     cat_main_arr = _.uniq(props.category.get_main_intrest_category, 'user_id');
        //     cat_main_arr.map((prop, key) => {
        //         categoryList.push(prop)
        //     })
        //     this.setState({ categoryData: categoryList })
        //     this.setState({ loading: false })
        // }
        if (props.category.get_event_category !== undefined && props.category.get_event_category !== null) {
            props.category.get_event_category.map((prop, key) => {
                EventcategoryList.push(prop)
            })
            this.setState({ EventcategoryData: EventcategoryList })
            this.setState({ loading: false })
            this.setState({ deleletePopupModal: false })
        }

        if (props.category.save_category !== undefined && props.category.save_category !== null) {
            if (props.category.save_category.code == 200) {
                this.setState({ openCategoryAddDailog: false })
                this.setState({ editCategoryPopup: false })
            }
        }

        if (props.category.edit_category !== null && props.category.edit_category !== undefined) {
            if (props.category.edit_category.code == 200) {
                this.setState({ get_database_image: null })
                this.setState({ uploadCategoryImage: null })
                this.setState({ getImageData: null })
                this.setState({ editCategoryPopup: false })
            }
        }
    }

    newUploadImageDelete = () => {
        this.setState({ uploadCategoryImage: null })        
    }

    databaseImageDelete = () => {
        this.setState({ get_database_image: null })
        this.setState({ uploadCategoryImage: null })
        this.setState({ getImageData: "" })
    }

    renderCategoryImages = () => {
        if (this.state.get_database_image !== null) {
            return (
                <div>
                    <div>
                        <img style={uploadImageCont} src={Server.IMAGES_URL + '/' + this.state.get_database_image} />
                    </div>
                    <div style={{ position: "absolute", top: "125px", right: "461px" }}>
                        <Cancel onClick={() => this.databaseImageDelete()} ></Cancel>
                    </div>
                </div>
            )
        } else {
            if (this.state.uploadCategoryImage !== null) {
                return (
                    <div>
                        <div>
                            <img style={uploadImageCont} src={this.state.uploadCategoryImage} />
                        </div>
                        <div style={{ position: "absolute", top: "125px", right: "461px" }}>
                            <Cancel onClick={() => this.newUploadImageDelete()}></Cancel>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <img style={uploadImageCont} src={defult_user_image} />
                    </div>
                )
            }
        }
    }

    getUniqCategory = (array) => {
        var uniqueArray = [];
        var i = 0
        for (i = 0; i < array.length; i++) {
            if (uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        var str = uniqueArray.join(", ");
        return str;
    }

    AddCategoryDailougeClose = () => {
        this.setState({ openCategoryAddDailog: false })
        this.setState({ CategorynameError: "" })
    }

    updateCategoryDailougeClose = () => {
        this.setState({ editCategoryPopup: false })
        this.setState({ CategorynameError: "" })
    }

    openCategoryAddDialoge = () => {
        this.setState({ openCategoryAddDailog: true });
        this.setState({ category_name: "" });
    }

    onChangeCategoryImage = event => {
        this.setState({ uploadCategoryImage: event.target.files[0] })
    }

    onChangeUpdateCategoryImage = event => {
        this.setState({ getImageData: event.target.files[0] })
        this.setState({ get_database_image: null })
        this.setState({ uploadCategoryImage: URL.createObjectURL(event.target.files[0]) })
    }

    onChangeCategoryName(event) {
        this.setState({
            category_name: event.target.value
        })
    }

    EditCategoryDailouge = (get_data) => {
        this.setState({ editCategoryPopup: true })
        if (get_data !== null && get_data !== "") {
            this.setState({ category_name: get_data.category_name })
            this.setState({ category_id: get_data.cat_id })
            this.setState({ get_database_image: get_data.image_name })
        }
        if (get_data.image_name !== "" && get_data.image_name !== null) {
            //this.setState({ old_image: Server.IMAGES_URL + get_data.image_name })
            //this.setState({ get_database_image: get_data.image_name })
            this.setState({ uploadCategoryImage: get_data.image_name })
        } else {
            //this.setState({ old_image: defult_user_image })
            this.setState({ get_database_image: null })
        }
    }

    AddCategory = () => {
        let error = 0
        if (this.state.category_name == "") {
            error = 1
            this.setState({ CategorynameError: "Please enter category name" })
        }
        if (error == 0) {
            let request = { c_name: this.state.category_name, c_image: this.state.uploadCategoryImage };
            this.props.SaveCategory(request)
        }
    }

    UpdateCategory = () => {
        //let request = { c_name: this.state.category_name, c_image: this.state.uploadCategoryImage, category_id: this.state.category_id };
        let error = 0
        if (this.state.category_name == "") {
            error = 1
            this.setState({ CategorynameError: "Please enter category name" })
        }
        if (error == 0) {
            let request = { c_name: this.state.category_name, c_image: this.state.get_database_image != null ? this.state.get_database_image : this.state.getImageData, category_id: this.state.category_id };
            //let request = { c_name: this.state.category_name, c_image: this.state.get_database_image != null ? this.state.get_database_image : this.state.uploadCategoryImage, category_id: this.state.category_id };
            this.props.DemoEditCategory(request)
        }
    }

    DeletePopupDailouge = (get_item) => {
        this.setState({ delete_category_id: get_item.cat_id })
        this.setState({ deleletePopupModal: true })
    }

    deleteDialougeBoxClose = () => {
        this.setState({ deleletePopupModal: false })
    }

    deleteCatrgory = () => {
        let request = { delete_category_id: this.state.delete_category_id }
        this.props.deleteEventCategory(request)
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
        const { openCategoryAddDailog, editCategoryPopup, deleletePopupModal, tokenExpireModal } = this.state
        if (this.state.loading) {
            return (
                <div style={loaderStyle}>
                    <Progressbar></Progressbar>
                </div>
            )
        }
        const columns = [
            { name: "image", label: "Image", options: { filter: true, sort: true, } },
            { name: "e_name", label: "Category name", options: { filter: true, sort: true, } },
            {
                name: "action",
                label: "Action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div style={{ display: "inline-block" }}>
                            <Tooltip
                                id="tooltip-top"
                                title="Edit category"
                                placement="top"
                                //classes={{ tooltip: classes.tooltip }}
                                >
                                <Eye style={{ color: "#8e24aa" }} onClick={() => this.EditCategoryDailouge(value)}></Eye>
                                </Tooltip>
                                <Tooltip
                                id="tooltip-top"
                                title="Delete category"
                                placement="top"
                                //classes={{ tooltip: classes.tooltip }}
                                >
                                <Delete style={{ color: "#8e24aa" }} onClick={() => this.DeletePopupDailouge(value)}></Delete>
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
                <div style={{ marginBottom: "50px" }}>
                    {/* <AddIcon onClick={() => this.openCategoryAddDialoge()}></AddIcon> */}
                    <Button style={{ marginTop: "-50px" }} variant="contained" onClick={() => this.openCategoryAddDialoge()} color="primary" >
                        Add category
                </Button>
                    <div>
                        <Dialog
                            fullWidth={true}
                            maxWidth={'sm'}
                            open={openCategoryAddDailog}
                            aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title"><span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Add Category</span></DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    id="category_name"
                                    label="Category Name"
                                    //type="email"
                                    name="category_name"
                                    value={this.state.category_name}
                                    onChange={this.onChangeCategoryName}
                                    inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, width: "270px" } }}
                                />
                                <div>
                                    <span style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT }}>{this.state.CategorynameError}</span>
                                </div>
                                {/* <div>
                            <img style={imageCont} src={Server.IMAGES_URL + this.state.uploadCategoryImage} />
                            </div> */}

                                <input style={{ marginTop: "20px" }} type='file' id='myImage' name="myImage" onChange={this.onChangeCategoryImage} />

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.AddCategoryDailougeClose()} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={() => this.AddCategory()} color="primary">
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    {/* edit category popup */}
                    <div>
                        <Dialog
                            fullWidth={true}
                            maxWidth={'sm'}
                            open={editCategoryPopup}
                            aria-labelledby="form-dialog-title">

                            <DialogTitle id="form-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Edit Category</span>}</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    id="category_name"
                                    label="Category Name"
                                    InputLabelProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: "20px" } }}
                                    //type="email"
                                    name="category_name"
                                    value={this.state.category_name}
                                    onChange={this.onChangeCategoryName}
                                    inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE } }}
                                />

                                <div>
                                    <span style={{ color: "red" }}>{this.state.CategorynameError}</span>
                                </div>
                                <div style={{ marginTop: "15px" }}>
                                    {this.renderCategoryImages()}
                                </div>
                                <div>
                                    <input style={{ marginTop: "10px" }} type='file' id='updateImage' name="updateImage" onChange={this.onChangeUpdateCategoryImage} />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.updateCategoryDailougeClose()} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={() => this.UpdateCategory()} color="primary">
                                    update
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    {/* edit category popup  close*/}

                    {/* delete dailouge box */}
                    <div>
                        <Dialog
                            open={deleletePopupModal}
                            //onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Delete Category</span>}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Are you sure you want to delete this category?</span>}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.deleteDialougeBoxClose()} color="primary" autoFocus>
                                    Close
                                </Button>
                                <Button onClick={() => this.deleteCatrgory()} color="primary" autoFocus>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    {/* delete dailouge boc end */}

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <MuiThemeProvider theme={this.getMuiTheme()}>
                                <MUIDataTable
                                    title={<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Category List</span>}
                                    data={this.state.EventcategoryData.map(item => {
                                        let src = ""
                                        let get_image = item.image_name
                                        if (get_image === null || get_image === "") {
                                            get_image = defult_user_image
                                            src = <img style={imageCont} src={get_image} />

                                        } else {
                                            get_image = Server.IMAGES_URL + get_image
                                            src = <img style={imageCont} src={get_image} />
                                        }
                                        return [
                                            src,
                                            // <div style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{item.category_name}</div>,
                                            item.category_name,
                                            item
                                            //this.getUniqCategory(item.maincategory),
                                        ]
                                    })}
                                    columns={columns}
                                    options={options}
                                />
                            </MuiThemeProvider>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    category: state.Category,
    users: state.Users,
    dashboard_data: state.Dashboard
})

const mapDispatchToProps = dispatch => ({
    // getAllMainIntrestCategory: () => { dispatch(actions.getAllMainIntrestCategory()) },
    getAllEventCategory: () => { dispatch(actions.getAllEventCategory()) },
    getAllUserList: () => { dispatch(actions.getAllUserList()) },
    SaveCategory: (request) => { dispatch(actions.SaveCategory(request)) },
    DemoEditCategory: (request) => { dispatch(actions.DemoEditCategory(request)) },
    deleteEventCategory: (request) => { dispatch(actions.deleteEventCategory(request)) },


    //getUserIntrestCategory: (data) => { dispatch(actions.getUserIntrestCategory(data)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainCategory);