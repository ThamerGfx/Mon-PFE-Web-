import React, {Component} from 'react';
import {AppBar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logoutUser} from '../../auth/store/actions/user.actions'

const styles = theme => ({
    root  : {
        '& .user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
        width     : 72,
        height    : 72,
        position  : 'absolute',
        top       : 92,
        padding   : 8,
        background: theme.palette.background.default,
        boxSizing : 'content-box',
        left      : '50%',
        transform : 'translateX(-50%)',
        '& > img' : {
            borderRadius: '50%'
        }
    }
});

class UserNavbarHeader extends Component {
    state = {
        userMenu: null
    };

    userMenuClick = event => {
        this.setState({userMenu: event.currentTarget});
    };

    userMenuClose = () => {
        this.setState({userMenu: null});
    };

    handleSignOut = () => {
        this.props.logoutUser()
    }

    render()
    {
        const {auth} = this.props;
        const {userMenu} = this.state;

    return (
        <AppBar 
            position="static"
            color="primary"
            elevation={0}
            className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
        >
        <React.Fragment>

                <Button className="h-64" onClick={this.userMenuClick}>

                <div className="hidden md:flex flex-col ml-12 items-start">
                    <Typography className="normal-case font-600 flex">
                        {auth.email}
                    </Typography>
                    <Typography className="normal-case font-100 flex">
                        {/* rôle: {user.role} */}
                    </Typography>
                </div>

                <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
            </Button>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={this.userMenuClose}
                anchorOrigin={{
                    vertical  : 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical  : 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: "py-8"
                }}
            >
                    <React.Fragment>
                        <MenuItem component={Link} to="/profile" onClick={this.userMenuClose}>
                            <ListItemIcon>
                                <Icon>account_circle</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Mon Profile"/>
                        </MenuItem>
                        <MenuItem
                                onClick={this.handleSignOut}
                                component={Link} to={'/Login'}
                        >
                            <ListItemIcon>
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Logout"/>
                        </MenuItem>
                    </React.Fragment>
            </Popover>
        </React.Fragment>
        </AppBar>
    )}
}

function mapStateToProps(state)
{
    return {
        //user: auth.user,
        auth: state.firebase.auth
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {logoutUser})(UserNavbarHeader));
