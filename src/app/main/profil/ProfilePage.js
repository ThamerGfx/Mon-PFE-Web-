import React, { Component } from 'react';
import { withStyles, Tab, Tabs, Typography } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import ListeFormations from './tabs/ListeFormations';
import CalendarApp from './tabs/calendar/CalendarApp';
import AboutTab from './tabs/AboutTab';
import MonCV from './tabs/MonCV'
import Messages from './tabs/Messages'

const styles = theme => ({
    layoutHeader : {
        height                        : 130,
        minHeight                     : 100,
        [theme.breakpoints.down('md')]: {
            height   : 130,
            minHeight: 100
        }
    }
});

class ProfilePage extends Component {

    state = {
        value: 0
    };

    handleChange = (value) => {
        this.setState({value});
    };

    render()
    {
        const {classes,  auth} = this.props;
        const {value} = this.state;

        return (
            <FusePageSimple
                classes={{
                    header : classes.layoutHeader,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end" style={{backgroundColor: "#3C4252"}}>
                        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="md:ml-24" variant="h4" color="inherit">{auth.displayName}</Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                }
                contentToolbar={
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="off"
                        classes={{
                            root: "h-64 w-full border-b-1"
                        }}
                    >
                        <Tab
                            classes={{
                                root: "h-64"
                            }}
                            label="A propos"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Mes Formations"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Calendrier"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Mon CV"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Messages"/>
                            
                    </Tabs>
                }
                content={
                    <div className="p-16 sm:p-24">
                        {value === 0 &&
                        (
                            <AboutTab/>
                        )}
                        {value === 1 && (
                            <ListeFormations/>
                        )}
                        {value === 2 && (
                            <CalendarApp/>
                        )}
                        {value === 3 && (
                            <MonCV/>
                        )}
                        {value === 4 && (
                            <Messages/>
                        )}
                    </div>
                }
            />
        )
    };
}

function mapStateToProps({state})
{
    return {
        auth: state.firebase.auth,
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null),
    firestoreConnect([
      { collection: 'animateurs'},
    ]))(ProfilePage);
