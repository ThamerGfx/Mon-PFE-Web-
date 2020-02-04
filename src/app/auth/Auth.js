import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose} from 'redux';
import {connect} from 'react-redux';
import firestore from '../firebase/fbConfig';
import firebase from '../firebase/fbConfig';

import {setUserDataFirebase} from 'app/auth/store/actions/user.actions'



class Auth extends Component {
    
    constructor(props)
    {
        super(props);
        this.firebaseCheck();
    }

    onAuthStateChanged = (callback) => {
        if ( !this.auth )
        {
            return;
        }
        this.auth.onAuthStateChanged(callback);
    };
    
    firebaseCheck = () => {
        
        if(!firebase.auth())
        {
            return;
        }
        firebase.auth().onAuthStateChanged( authUser => {
            firestore.firestore().collection("users")
            .doc(authUser.uid)
            .get()
        });
    };

    render()
    {

        const {children} = this.props;
            
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
  };

const mapDispatchToProps = (dispatch) => {
    return {
        setUserDataFirebase:(user,auth) => dispatch(setUserDataFirebase(user,auth))
        
    }
}
const mapStateToProps = (state) => {
    return {
        authVerif : state.firebase
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    
)(Auth);