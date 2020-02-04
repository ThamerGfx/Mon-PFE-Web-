import firestore from '../../../firebase/fbConfig'
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';
import {storage} from '../../../firebase/fbConfig';

/*** Ajouter Animateur ****/
 export const UploadFile = (file) => { 

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
                const uploadTask = storage.ref(`files/${file.name}`).put(file);
                uploadTask.on('state_changed')
                storage.ref('files').child(file.name).getDownloadURL()
                .then ((url) => {
                  const myID = currentUser.uid
                  firestore.firestore().collection("files").doc(myID)
                  .set({ 
                    id: myID,
                    name: file.name,
                    url: url, 
                    authorName: currentUser.displayName, 
                    authorEmail: currentUser.email_user,
                    authorId: currentUser.uid,
                    createdAt: new Date()
                  }).then((error)=>{
                    if(!error){
                      store.dispatch(Actions.showMessage({message: "CV ajouté"}));
                    }
                  })
                }) 
        })
      }
    })
  console.log('cv ajouté')
  }   
}

/*** Supprimer Animateur ****/
export const removeFile = (id) =>{

    return(dispatch) =>{ 
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser.uid)
            firebase.firestore().collection("users").doc(firebaseUser.uid).get().then( (doc) => {
                console.log(doc.data())
                const { displayName, role, email_user } = doc.data()
                console.log(displayName)
                const currentUser = {
                    uid: firebaseUser.uid,
                    displayName,
                    role,
                    email_user
                }

                firestore.firestore().collection("files").doc(id).get().then( (doc) => {
                  const { authorId } = doc.data()
                  if ( currentUser.uid === authorId) {
                    firestore.firestore().collection("files").doc(id).delete()
                  }
                })
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Ce réseau a été supprimé"}));
          }
       })
       console.log("cv supprimé")
    }) 
  }
  })
}
}

/*** Afficher Animateur ****/
let allFiles=[]
export const getAllFiles = () =>{

  return(dispatch) =>{

    firestore.firestore().collection('files')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const file={
          ...doc.data(),
          id: doc.id
        }
        allFiles.push(file) 
      })
      dispatch(getAllFilesSuccess(allFiles)); 
        return allFiles;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllFilesSuccess = (allFiles) => ({
    type: 'GET_ALL_FILES_SUCCESS',
    payload: allFiles
  })

/*** Modifier Animateur ****/
export function EditRéseauItem(réseau){
  return{
      type: "EDIT_RESEAU_ITEM",
      réseau
  }
}
export const updateRéseau =(réseau)=>{ 
  return(dispatch)=>{    

    firestore.firestore().collection('réseaux').doc(réseau.id)
     .update(
       {
         ...réseau,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_RESEAU',  
       })  
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
    })
 }
}