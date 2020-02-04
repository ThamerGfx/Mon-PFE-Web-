import config from './firebaseServiceConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firestore from '../../firebase/fbConfig'

class firebaseService {

    init()
    {
        if ( firebase.apps.length )
        {
            return;
        }
        firebase.initializeApp(config);
        this.db = firebase.database();
        this.auth = firebase.auth();
    }

    getUserData = (userId) => {
        return(
                 firestore.firestore().collection("users")
                .doc(userId)
                .get()
                .then((user)=>{
                    user.data()
                })
                .catch(function(error) {
                    console.log("Error getting document:", error);
                })
        )
    };

    updateUserData = (user) => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return(
        firestore.firestore().collection("users").doc(user.uid)
         .update({
            user
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        })
        )
        
    };
    updateUserDataMailVerif = (user) =>{

        //console.log('uu',user)
        if ( !firebase.apps.length )
        {
            return;
        }
        firestore.firestore().collection("users").doc(user.uid)
         .update({
               emailVerified : user.emailVerified
        })
    }

    signOut = () => {
        if ( !this.auth )
        {
            return;
        }
        this.auth.signOut();
    }
}

const instance = new firebaseService();

export default instance;
