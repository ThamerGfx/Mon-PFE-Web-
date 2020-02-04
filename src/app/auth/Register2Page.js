import React, {Component} from 'react';
import {Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, TextField, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {Link} from 'react-router-dom';
import _ from '@lodash';
import {registerWithFirebase} from './store/actions/register.actions';
import { connect } from 'react-redux';

class Register2Page extends Component {

    state = {
        name                 : '',
        email                : '',
        password             : '',
        passwordConfirm      : '',
        role                 : '',
        acceptTermsConditions: false
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    canBeSubmitted()
    {
        const {email, password, passwordConfirm, acceptTermsConditions} = this.state;
        return (
            email.length > 0 &&
            password.length > 0 &&
            password.length > 3 &&
            password === passwordConfirm &&
            acceptTermsConditions
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.registerWithFirebase( this.state );
        this.setState(
            {
                name                 : '',
                email                : '',
                password             : '',
                passwordConfirm      : '',
                role                 : '',
            }
        )
    }

    render() 
    {
        const role = [
            {
            value: 'admin',
            label: 'admin',
            },
            {
            value: 'animateur',
            label: 'animateur',
            },
        ];
        const {classes} = this.props;
        const {name, email, password, passwordConfirm, acceptTermsConditions} = this.state;

        return (
            <div className="flex flex-col flex-auto flex-no-shrink p-24 md:flex-row md:p-0">

                <div
                    className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">

                    <FuseAnimate animation="transition.expandIn">
                        <img className="w-128 mb-32" src="https://i.ibb.co/ctQpzgb/logo.jpg"/>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="primary" className="font-dark">
                            Welcome to the Aladinoo Group!
                        </Typography>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography variant="h6" className="md:w-full mb-32">CREATE AN ACCOUNT</Typography>

                            <form name="registerForm" noValidate className="flex flex-col justify-center w-full">

                                <TextField
                                    className="mb-16"
                                    label="Name"
                                    autoFocus
                                    id="name"
                                    type="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />

                                <TextField
                                    className="mb-16"
                                    label="Email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />

                                <TextField
                                    className="mb-16"
                                    label="Password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />

                                <TextField
                                    className="mb-16"
                                    label="Password (Confirm)"
                                    id="passwordConfirm"
                                    type="password"
                                    name="passwordConfirm"
                                    value={this.state.passwordConfirm}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />

                                <TextField
                                        className="mt-8 mb-16"
                                        helperText="Rôle"
                                        id="role"
                                        name="role"
                                        select
                                        value={this.state.role}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                        required
                                        variant="outlined"
                                    >
                                    {role.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.value}
                                        </option>
                                    ))}
                                </TextField>

                                <FormControl className="items-center">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="acceptTermsConditions"
                                                checked={acceptTermsConditions}
                                                onChange={this.handleChange}/>
                                        }
                                        label="I read and accept terms and conditions"
                                    />
                                </FormControl>

                                <Button variant="contained" color="primary" className="w-full mx-auto mt-16" aria-label="Register"
                                        disabled={!this.canBeSubmitted()}
                                        onClick = { this.handleSubmit }>
                                    CREATE AN ACCOUNT
                                </Button>

                            </form>

                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <span className="font-medium">Already have an account?</span>
                                <Link className="font-medium" to="/Login">Login</Link>
                            </div>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      authError: state.auth.authError
    }
}
  
  
export default connect( mapStateToProps, {registerWithFirebase} )( Register2Page )