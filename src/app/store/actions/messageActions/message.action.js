import firestore from '../../../firebase/fbConfig'
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animateur ****/
 export const addMessage = (message) => { 

    return (dispatch) => {  
      
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          console.log(firebaseUser.uid)
          firebase.firestore().collection("users").doc(firebaseUser.uid).get().then( doc => {
                  console.log(doc.data())
                  const { displayName, email_user } = doc.data()
                  console.log(displayName)
                  const currentUser = {
                    uid: firebaseUser.uid,
                    displayName,
                    email_user
                  }
              const idMessage = firestore.firestore().collection("messages").doc().id; 
              firestore.firestore().collection("messages").doc(idMessage)
              .set({ 
                ...message,  
                id:idMessage,
                authorName: currentUser.displayName, 
                authorId: currentUser.uid,
                authorEmail: currentUser.email_user,
                createdAt: new Date()
              }) 
              .then((error)=>{
                if(!error){
                    store.dispatch(Actions.showMessage({message: "Message envoyé"}));
                }
              }) 
              .catch(function(error) {
                console.error("Error adding document: ", error);
              })
          })
        }
      })
  }
}

export const OpenDialogMessage = () => {
  console.log('open dialog message')
  return {
    type: 'OPEN_DIALOG_MESSAGE',
}
}

export const closeDialogMessage = () =>
{
    return {
        type: 'CLOSE_DIALOG_MESSAGE'
    }
}


/*** Afficher Animateur ****/
let allMessages=[]
export const getAllMessages = () =>{

  return(dispatch) =>{
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser.uid)
        firebase.firestore().collection("users").doc(firebaseUser.uid).get().then( doc => {
          console.log(doc.data())
          const { displayName } = doc.data()
          console.log(displayName)
          const currentUser = {
            uid: firebaseUser.uid,
            displayName
          }

          if(currentUser.uid !== allMessages.authorId ) {
            firestore.firestore().collection('messages')
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const message={
                  ...doc.data(),
                  id:doc.id
                }
                allMessages.push(message) 
              })
              dispatch(getAllMessagesSuccess(allMessages)); 
                return allMessages;
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              })
        }
    })
    }
  })
}
}
export const getAllMessagesSuccess = (allMessages) => ({
    type: 'GET_ALL_MESSAGES_SUCCESS',
    payload: allMessages
  })

/*** Modifier Animateur ****/
export function EditMessageItem(message){
  return{
      type: "EDIT_MESSAGES_ITEM",
      message
  }
}