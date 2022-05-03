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
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.state = {
            loginUserData: [],
            data: [],
            isLoading: false,
            email: '',
            password: '',
            emailError: "",
            passwordError: "",
            succeess_msg: false,
            sendMailModalopen: false,
            mail_error: "",
            emailText: "",
            valid_mail_error: "",
            email_not_register: ""
        }
    }

    componentWillReceiveProps(props) {
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
        if(props.login.admin_reset_password == 200){
            this.setState({ sendMailModalopen: false })
        }

        if(props.login.admin_check_email == 400){
            this.setState({ email_not_register: "email is not found, please use another email." })
        }
    }

    handleChangeMail(e) {
        this.setState({ emailText: e.target.value })
      }

    doLogin = () => {
        let error = "0"
        if (this.state.email === "") {
            error = "1"
            this.setState({ emailError: "Please enter email address" })
        }
        if (this.state.password === "") {
            error = "1"
            this.setState({ passwordError: "Please enter password" })
        }
        if (error === "0") {
            let request = { email: this.state.email, password: this.state.password };
            this.props.getLogin(request)
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: event.target.value,
        });
    };
    onChangePassword(e) {
        this.setState({
            password: event.target.value
        })
    }

    sendMail = () => {
        let error = "0"
        let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (this.state.emailText == "") {
            error = "1"
            this.setState({ mail_error: "Please enter email address" })
        }
        else if (!format.test(this.state.emailText )) {
            error = "1"
            // errorArray['eErrorMsg'] = 'Please enter a valid Email Address'
            this.setState({ valid_mail_error: "Please enter valid email address" })
        }
        else if (error === "0") {
            // let mail_body = '<a href="http://localhost:3000/friendsup-admin/reset_password?email="+this.state.emailText></a>'
                
            //let data = "Hi\nYou have requested to reset your Password.\r\nTo reset you password, use this link \r\nIf you have not requested a reset of your password,\r\nyou can just ignore this email.\r\nBest Regards\r\nThe FriendsUp Team&to_email";
            let request = { email: this.state.emailText};
            this.props.sendMailToResetPassword(request)
        }

    }

    sendMailModalClose = () => {
        this.setState({ sendMailModalopen: false })
        this.setState({ mail_error: "" })
        this.setState({ valid_mail_error: "" })
        this.setState({ emailText: "" })
    }

    SendMailPopup = () => {
        this.setState({ sendMailModalopen: true });
    }
    render() {
        const classes = this.props;
        const { sendMailModalopen } = this.state

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
                <ToastContainer/>
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
                                        <span>{this.state.mail_error}</span><br></br>
                                        <span>{this.state.valid_mail_error}</span>
                                        <span>{this.state.email_not_register}</span>
                                    </div>
                                </form>
                            </Container>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=> this.sendMail()}color="primary">
                            Send
                        </Button>
                        <Button onClick={() => this.sendMailModalClose()}color="primary" autoFocus>
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
                                Admin Login
              </Typography>
                            <form className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    //onChange={this.handleChange('email')}
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    inputProps={{ style: { fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE, width: "270px" } }}
                                />
                                <span style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.emailError}</span>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    //onChange={this.handleChange('password')}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <span style={{ color: "red", fontFamily: Server.REGULAR_FONT, fontSize: Server.REGULAR_FONT_SIZE }}>{this.state.passwordError}</span>
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
                                        onClick={() => this.doLogin()}
                                    >
                                        Login
                                        
                                    </Button>
                                    <br></br><br></br>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link variant="body2" onClick={() => this.SendMailPopup()}>
                                                Forgot password?
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
    
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Login);
//export default Login