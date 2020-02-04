import React, {Component} from 'react';
import { Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {Link, Redirect} from 'react-router-dom';
import _ from '@lodash';
import { connect } from 'react-redux';

import {submitLoginWithFireBase,authWithGoogle} from './store/actions/login.actions'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
  
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
};

class Login extends Component {

    state = {
        email   : '',
        password: '',
        role: '',
        remember: false,
        formErrors: {
            email: "",
            password: ""
          }
    };
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value)
                ? ""
                : "invalid email address";
            break;
            case "password":
                formErrors.password =
                value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          default:
            break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      };
    handleSubmitLogin = e => {
        e.preventDefault();
        const {email,password} = this.state
    
        if (formValid(this.state)) {
            console.log(`
                --SUBMITTING--
                Email: ${this.state.email}
                Password: ${this.state.password}
            `);
            
            this.props.submitLoginWithFireBase(email,password)
            this.setState({
                email   : '',
                password: ''
            })
        } 
        else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };

    render()
    {
        const { auth } = this.props; 
        const { email, password, remember, formErrors } = this.state;

        console.log(auth)
        if (auth.uid)  return <Redirect to = '/animations'/>

        return (
            <div className="flex flex-col flex-auto flex-no-shrink items-center justify-center p-32">

                <div className="flex flex-col items-center justify-center w-full">

                    <FuseAnimate animation="transition.expandIn">

                        <Card className="w-full max-w-384">

                            <CardContent className="flex flex-col items-center justify-center p-30">

                                <img className="w-128 m-30" src="https://i.ibb.co/BrsxwRH/logologin.jpg" alt="logo"/>

                                <Typography variant="h6" className="mt-16 mb-32">LOGIN TO YOUR ACCOUNT</Typography>
                                
                                <form name="loginForm" noValidate className="flex flex-col justify-center w-full">
                                
                                    <TextField
                                        className="mb-16"
                                        label="Email"
                                        autoFocus
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                    {formErrors.email.length > 0 && (
                                        <span style = {{color : "red" }} className="errorMessage">{formErrors.email}</span>
                                    )}

                                    <TextField
                                        className="mb-16"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                    {formErrors.password.length > 0 && (
                                        <span  style = {{color : "red" }} className="errorMessage">{formErrors.password}</span>
                                    )}
                                    <div className="flex items-center justify-between">

                                        <FormControl>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="remember"
                                                        checked={remember}
                                                        onChange={this.handleChange}
                                                        />
                                                }
                                                label="Remember Me"
                                            />
                                        </FormControl>
                                    </div>

                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        className="w-224 mx-auto mt-16" 
                                        aria-label="LOG IN"
                                        onClick={this.handleSubmitLogin} 
                                    >
                                        LOG IN
                                    </Button>

                                </form>

                                <div className="my-24 flex items-center justify-center">
                                    <Divider className="w-32"/>
                                    <span className="mx-8 font-bold">OR</span>
                                    <Divider className="w-32"/>
                                </div>

                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    size="small"
                                    className="normal-case w-192 mb-8"
                                    onClick={()=>{
                                    this.props.authWithGoogle()
                                    }}
                                >
                                    Log in with Google
                                </Button>
                                <Button className="font-medium" component={Link} to='/register-2'>
                                    Create an account
                                </Button>
                                
                            </CardContent>
                        </Card>
                    </FuseAnimate>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
            auth: state.firebase.auth,
    }
}

export default (connect(mapStateToProps,{submitLoginWithFireBase, authWithGoogle})(Login));