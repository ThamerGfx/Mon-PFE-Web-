import React from 'react';
import {Typography, withStyles} from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    root      : {
        '& .logo-icon': {
            width     : 150,
            height    : 150,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        }
    },
    reactBadge: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        color          : '#3C4252'
    }
});

function Logo({classes})
{
    return (
        <div className={classNames(classes.root, "flex items-center")}>
        <div className={classNames(classes.reactBadge, " flex items-center ml-12 mr-8 py-4 px-8 rounded")}>
            <img
                className="react-logo"
                src="https://hostpic.xyz/files/15615619611145505679.jpg"
                alt="react"
                width="90"
            />
        </div>
            <Typography className="text-16 ml-12 font-light logo-text"><b>ALADINOO GROUP</b></Typography>
        </div>
    );
}

export default withStyles(styles, {withTheme: true})(Logo);