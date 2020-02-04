import firebase from '../../../firebase/fbConfig';

export const submitLoginWithFireBase=(email, password)=>{
    return (dispatch) =>{
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                 dispatch({
                    type: 'LOGIN_SUCCESS'
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email',
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];
                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];
                const response = {
                    username: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };
                if ( error.code === 'auth/invalid-api-key' )
                {
                    console.log( error.message);
                }
                return dispatch({
                    type   : 'LOGIN_ERROR',
                    payload: response
                });
            });
    }
}
