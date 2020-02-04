import firebase from '../../../firebase/fbConfig';

export const signOut = () => {
    return (dispatch) => {      
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      });
    }
}