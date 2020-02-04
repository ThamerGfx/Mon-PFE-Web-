import firebase from '../../../firebase/fbConfig';
import firestore from '../../../firebase/fbConfig';
import history from 'history.js';

export const submitLoginWithFireBase=(email, password)=>{
    return (dispatch) =>{
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().onAuthStateChanged(firebaseUser => {
                    if(firebaseUser){
                        console.log(firebaseUser.uid)
                        firebase.firestore().collection("users").doc(firebaseUser.uid).get().then( doc => {
                            console.log(doc.data())
                            const { displayName, role } = doc.data()
                            console.log(displayName)
                            const currentUser = {
                                uid: firebaseUser.uid,
                                displayName,
                                role
                            }
                            
                            if (currentUser.role === 'animateur') 
                                {
                                    history.push('/profile')
                                }
                            else 
                                {
                                    history.push('/animations')
                                }
                        })
                    }   
                })
                 dispatch({
                    type: 'LOGIN_SUCCESS'
                });
            })
    }
}

export const authWithGoogle = () => {

    return () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('');

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            firestore.firestore().collection("users").where("email_user", "==", user.email_user).get()
            .then(function(querySnapshot) {
                            if ("role", "==", "animateur") 
                            {
                                history.push('/profile')
                            }
                            else 
                            {
                                history.push('/animations')
                            }
                console.log('querySnapshot',querySnapshot)
                querySnapshot.forEach(function(doc) {
                    if(doc.data()){
                        console.log("doc.id: ", doc.id, " doc.data: ", doc.data().email_user);
                    }
                    if(!doc.data()){
                        console.log('no doc!!!')
                    }
                })
            })
            console.log('user',user.email)
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            console.log('// Handle Errors here.',errorCode)
            var errorMessage = error.message;
            // The email of the user's account used.
            console.log('// Handle Errors here.',errorMessage)
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            console.log('// The firebase.auth.AuthCredential type that was used.',email)
            var credential = error.credential;
            // ...
          })
    }
}