import React, {Component} from 'react'
import {AppBar, Hidden, MuiThemeProvider, Toolbar, withStyles} from '@material-ui/core';
import { FuseShortcuts} from '@fuse';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom';

import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';

const styles = theme => ({
    separator: {
        width          : 1,
        height         : 64,
        backgroundColor: theme.palette.divider
    }
});

class ToolbarLayout1  extends Component{


    state = {
        open: false,
      }
    
    
      handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
      }
    
      handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
          return;
        }
    
        this.setState({ open: false });
      }
    
      render(){
        const {settings, toolbarTheme,classes} = this.props
        const layoutConfig = settings.layout.config;
        const { open } = this.state
    
        return (
            <MuiThemeProvider theme={toolbarTheme}>
                <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
                    <Toolbar className="p-0">
                    {/* {layoutConfig.navbar.display && layoutConfig.navbar.position === 'left' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton className="w-64 h-64 p-0"/>
                            <div className={classes.separator}/>
                        </Hidden>
                    )} */}

                    <div className="flex flex-1">
                            <Hidden mdDown>
                    <div>

                    {/* <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                     {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                          id="menu-list-grow"
                          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                       >
                          <Paper>
                              <ClickAwayListener 
                                onClickAway={this.handleClose}
                              >
                               <MenuList>
                                 <MenuItem 
                                    onClick={this.handleClose}
                                    component={Link} 
                                    to="/form/animation"
                                  >
                                    Ajouter Animation
                                  </MenuItem>
                                 <MenuItem 
                                     onClick={this.handleClose}
                                     component={Link} 
                                     to="/formulaire/animateur"
                                  >
                                      Ajouter Animateur
                                  </MenuItem>
                                 <MenuItem 
                                    onClick={this.handleClose}
                                 >
                                    Statistique
                                </MenuItem>
                               </MenuList>
                               </ClickAwayListener>
                           </Paper>
                        </Grow>
                         )}
                         </Popper> */}
                          </div>
                              </Hidden>
                          </div>
                             <UserMenu/>    
                         </Toolbar>
                         </AppBar>
            </MuiThemeProvider>
        );
    }
};


function mapStateToProps({fuse})
{
    return {
        settings    : fuse.settings.current,
        toolbarTheme: fuse.settings.toolbarTheme
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(ToolbarLayout1)));
