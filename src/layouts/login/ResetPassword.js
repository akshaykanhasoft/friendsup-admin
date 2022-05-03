import React from 'react';
import * as actions from '../../actions/index';
import { compose } from 'redux'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LoginFail from '../../views/Loginfail';
import '../../../src/style.css'
import Server from '../../config';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { ToastContainer } from 'react-toastify';


class Login extends React.Component {
    constructor(props) {
        super(props);
        //this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.state = {
            loginUserData: [],
            data: [],
            isLoading: false,
            email: '',
            emailError: "",
            passwordError: "",
            succeess_msg: false,
            sendMailModalopen: false,
            mail_error: "",
            emailText: "",
            confirm_password: "",
            confirm_password_error: "",
            password: "",
            password_error: "",
            password_notmatch_error: "",
            getEmail: "",
            password_length_error: "",
            resetPasswordUrlExpire: false
        }
    }

    componentWillMount() {
        this.setState({ getEmail: this.props.match.params.email })
        let request = { email:  this.props.match.params.email }
        this.props.checkUrl(request)
    }

    componentWillReceiveProps(props) {
        console.log("props ", props);
        if (props.login.login_fail === "1") {
            this.setState({ succeess_msg: true }, () => {
                setTimeout(() => {
                    this.setState({
                        succeess_msg: false
                    })
                }, 3000)
            })
        }

        this.setState({ loginUserData: props.login.get_login_data })

        // if (props.login.reset_password_url_expire_check[0].is_url == '1') {
        //     this.setState({ resetPasswordUrlExpire: true })
        // }

        if (props.login.reset_password_done == 200) {
            this.setState({ mail_error: "" })
            this.setState({ emailText: "", })
            this.setState({ confirm_password: "" })
            this.setState({ confirm_password_error: "" })
            this.setState({ password: "" })
            this.setState({ password_error: "" })
            this.setState({ password_notmatch_error: "" })
            this.setState({ getEmail: "" })
            this.setState({ password_length_error: "" })
            this.setState({ resetPasswordUrlExpire: true })
        }
    }

    handleChangeMail(e) {
        this.setState({ emailText: e.target.value })
    }

    changePassword = () => {
        let error = "0"
        if (this.state.password == "") {
            error = "1"
            this.setState({ password_error: "Please enter password " })
        }
        else if (this.state.confirm_password == "") {
            error = "1"
            this.setState({ confirm_password_error: "Please enter confirm password" })
        }

        else if (this.state.password !== this.state.confirm_password) {
            error = "1"
            this.setState({ password_notmatch_error: "Password do not match" })
        }

        else if (this.state.confirm_password.length < 6) {
            error = "1"
            this.setState({ password_length_error: "Please enter minimum 8 characters" })
        }
        else if (error === "0") {
            let request = { password: this.state.password, confirm_password: this.state.confirm_password, email: this.state.getEmail };
            this.props.resetPassword(request)
        } else {

        }
    }

    onChangePassword(e) {
        this.setState({
            password: event.target.value,
        });
    };
    onChangeConfirmPassword(e) {
        this.setState({
            confirm_password: event.target.value
        })
    }

    sendMail = () => {
        let error = "0"
        if (this.state.emailText === "") {
            error = "1"
            this.setState({ mail_error: "Please enter email address" })
        }
        if (error === "0") {
            // let mail_body = '<a href="http://localhost:3000/friendsup-admin/reset_password?email="+this.state.emailText></a>'
            let request = { email: this.state.emailText };
            this.props.sendMailToResetPassword(request)
        }
    }

    sendMailModalClose = () => {
        this.setState({ sendMailModalopen: false })
    }

    gotoLogin = () => {
        //window.location = "http://localhost:3000/friendsup-admin/"
        window.location = Server.LOGOUT_URL
    }

    tokenExpAlert = () => {
        localStorage.clear();
        window.location.href = Server.LOGOUT_URL;
      }

    render() {
        const classes = this.props;
        const { sendMailModalopen,resetPasswordUrlExpire } = this.state

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

        var notify =
            <div>
                <LoginFail>
                </LoginFail>
            </div>
        return (
            <div>
                <ToastContainer />
            {/* url  expire dialog */}
                <Dialog
                    open={resetPasswordUrlExpire}
                    //onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Success !!</span>}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Reset password successful. Now you can login with new password.</span>}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.tokenExpAlert()} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            {/* url  expire dialog end */}

                {/* notification send */}
                <Dialog
                    fullWidth={true}
                    maxWidth={'xs'}
                    open={sendMailModalopen}
                    //onClose={() => this.onCloseMailModal()}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{<span style={{ fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>Mail Send</span>}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Container component="main" maxWidth={'lg'}>
                                <form className={classes.form}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Mail"
                                        //multiline
                                        //rows="4"
                                        value={this.state.emailText}
                                        onChange={this.handleChangeMail}
                                        //style={{ width: 300, fontFamily: Server.REGULAR_FONT, fontSize: "20px" }}
                                        inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, width: "270px" } }}
                                        defaultValue="Mail type here..."
                                        className={useStyles.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <div style={{ color: "red", marginTop: '1px', fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>
                                        <span>{this.state.mail_error}</span>
                                    </div>
                                </form>
                            </Container>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.sendMail()} color="primary">
                            Send
                        </Button>
                        <Button onClick={() => this.sendMailModalClose()} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <div style={{ marginTop: "150px" }}>
                            {this.state.succeess_msg ? notify : ""}
                            <Typography component="h1" variant="h5">
                                Reset Password
              </Typography>
                            <form className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    //onChange={this.handleChange('email')}
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    autoFocus
                                    inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, width: "270px" } }}
                                />
                                <span style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.password_error}</span><br></br>
                                <span style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.password_length_error}</span>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password Confirm"
                                    value={this.state.confirm_password}
                                    onChange={this.onChangeConfirmPassword}
                                    //onChange={this.handleChange('password')}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <span style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.confirm_password_error}</span><br></br>
                                <span style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.password_notmatch_error}</span>

                                {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                                <div style={{ marginTop: "15px" }}>
                                    <Button
                                        //type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => this.changePassword()}
                                    >
                                        Reset Password
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link variant="body2" onClick={() => this.gotoLogin()}>
                                                Login
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                {/* {"Don't have an account? Sign Up"} */}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </div>
                            </form>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    login: state.Login,
})

const mapDispatchToProps = dispatch => ({
    getLogin: (request) => { dispatch(actions.getLogin(request)) },
    sendMailToResetPassword: (request) => { dispatch(actions.sendMailToResetPassword(request)) },
    resetPassword: (request) => { dispatch(actions.resetPassword(request)) },
    checkUrl: (request) => { dispatch(actions.checkUrl(request)) },


});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Login);
//export default Login