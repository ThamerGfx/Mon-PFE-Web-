import React, {Component} from 'react';
import { Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logoutUser} from '../../auth/store/actions/user.actions'

class UserMenu extends Component {

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
        const {user} = this.props;
        const {userMenu} = this.state;
        console.log(user.role)

        return (
            <React.Fragment>

                <Button className="h-64" onClick={this.userMenuClick}>

                    <div className="hidden md:flex flex-col ml-12 items-start">
                        <Typography component="span" className="normal-case font-600 flex">
                            {user.role}
                        </Typography> 
                        <Typography className="normal-case font-600 flex">
                            {user.role}
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
        );
    }
}

function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps, {logoutUser})(UserMenu);
