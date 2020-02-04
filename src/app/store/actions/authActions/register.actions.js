import firebase from '../../../firebase/fbConfig';
import firestore from '../../../firebase/fbConfig';

export const signUp = (newUser) => {
    return (dispatch) => {      
      firebase.auth().createUserWithEmailAndPassword(
        newUser.email, 
        newUser.password
      )
      .then(resp => {
       
       // const idUser = firestore.firestore().collection("users").doc().id;
        firebase.firestore().collection('users').doc(resp.user.uid).set({
          displayName: newUser.name,
           id: resp.user.uid,
          emailUser: newUser.email,
          role: newUser.role
        });
        
    })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err});
      });
    }
  }