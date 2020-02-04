import React, {Component} from 'react';
import {matchRoutes} from 'react-router-config';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppContext from 'app/AppContext';

class FuseAuthorization extends Component {

    constructor(props, context)
    {
        super(props);
        const {routes} = context;

        this.state = {
            accessGranted: true,
            routes
        };
    }

    componentDidMount()
    {
        if ( !this.state.accessGranted )
        {
            this.redirectRoute(this.props);
        }
    }

    static getDerivedStateFromProps(props, state)
    {
        const {location, auth} = props;
        const {pathname} = location;

        const matched = matchRoutes(state.routes, pathname)[0];
     
        const accessGranted = 
        (matched && matched.route.auth && matched.route.auth.length > 0)
         ? matched.route.auth.includes(auth.role) 
         : true;

        return {
            accessGranted
        };
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextState.accessGranted !== this.state.accessGranted;
    }

    redirectRoute(props)
    {
        const {location, auth, history,authVerif } = props;
        const {pathname, state} = location;
        
        console.log('location',location)
       

           if(!authVerif.uid){

                history.push({
                    pathname :'/login',
                    state : {redirectUrl: pathname}
                });
            }
            if(auth){
                if(location.pathname ==='/animations'){
                    if(!auth.role ==='admin'){history.push({
                        pathname :'/app/error-404',
                        state : {redirectUrl: pathname}
                    });}
                }
            }
    }

    render()
    {
        const {children} = this.props;
        const {accessGranted} = this.state;
        return accessGranted ? <React.Fragment>{children}</React.Fragment> : null;
    }
}

function mapStateToProps(state)
{
    return {
          auth: state.auth.user,
          authVerif : state.firebase
    }
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
