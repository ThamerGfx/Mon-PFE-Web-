import history from 'history.js';
import _ from '@lodash';
import store from 'app/store';
import * as Actions from 'app/store/actions';
import firebaseService from 'app/services/firebaseService';

import firebase from '../../../firebase/fbConfig';
import firestore from '../../../firebase/fbConfig';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

/**
 * Set user data from Firebase data
 */
export function setUserDataFirebase(user, authUser)
{
    return(dispatch)=>{
        
        createUserSettingsFirebaseMail(authUser);
    
        dispatch(setUserData(user)) 
    }
}

export function createUserSettingsFirebaseMail(authUser)
{
            
    firestore.firestore().collection("users").doc(authUser.uid)
    .update({
          emailVerified : authUser.emailVerified,
          invitation_status : authUser.emailVerified
     })
}

/**
 * Set User Data
 */
export function setUserData(user)
{ 
    return (dispatch) => {

        dispatch({
            type   : 'SET_USER_DATA',
            payload: user
        })
    }
}

export function setUserDataMailVerif(emailVerif){

    return (dispatch) => {
        dispatch({
            type   : 'SET_USER_DATA_VERIF_MAIL',
            payload: emailVerif
        })
    }
}
/**
 * Remove User Data
 */
export function removeUserData()
{
    return {
        type: 'REMOVE_USER_DATA'
    }
}

/**
 * Logout
 */
export const logoutUser = () => {

    return (dispatch) => {

        firebase.auth().signOut()
            .then(
                history.push(
                    '/Login'
                 )
            )

        
        dispatch({
            type: 'USER_LOGGED_OUT'
        })
    }
}
/**
 * Update User Data
 */
export function updateUserData(user)
{
    firebaseService.updateUserData(user)
                .then(() => {
                    store.dispatch(Actions.showMessage({message: "User data saved to firebase"}));
                })
                .catch(error => {
                    store.dispatch(Actions.showMessage({message: error.message}));
                });
}