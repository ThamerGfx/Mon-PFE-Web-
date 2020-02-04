import React from 'react';
import {FuseNavigation} from '@fuse';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';

const Navigation = ({navigation, layout, dense, className, user}) => {
    if(user.role === "animateur") 
        {  
            return (
                <div></div>
            );
        } 
    else 
        {
            return (
                <FuseNavigation className={classNames("navigation", className)} navigation={navigation} layout={layout} dense={dense}/>
            )
        }
};

function mapStateToProps({fuse, auth})
{
    return {
        navigation: fuse.navigation,
        user: auth.user
    }
}

export default withRouter(connect(mapStateToProps)(Navigation));
