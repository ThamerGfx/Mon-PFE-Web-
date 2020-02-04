import firestore from '../../../firebase/fbConfig';
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animation ****/
 export const addInformation = (information) => { 

    return (dispatch) => {  
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
        const idInformation = firestore.firestore().collection("informations").doc().id; 
        firestore.firestore().collection("informations").doc(idInformation)
        .set({ 
          ...information,  
          id: idInformation,
          authorName: currentUser.displayName, 
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_INFORMATION",
            })
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        })
      })
      }
    })
  }
}

/*** Supprimer Animation ****/
export const removeInformation = (id) =>{
    return(dispatch) =>{ 
        firestore.firestore().collection('informations').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Cette information a été supprimée"}));
          }
       }) 
    } 
}

/*** Afficher Animation ****/
let allInformations=[]
export const getAllInformations = () =>{
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

          if(currentUser.uid === allInformations.authorId ) {
        firestore.firestore().collection('informations')
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            const information={
              ...doc.data(),
              id: doc.id
            }
              allInformations.push(information) 
          })
          dispatch(getAllInformationsSuccess(allInformations)); 
            return allInformations;
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
export const getAllInformationsSuccess = (allInformations) => ({
    type: 'GET_ALL_INFORMATIONS_SUCCESS',
    payload: allInformations
  })

/*** Modifier Animation ****/
export function EditInformationItem(information){
  return{
      type: "EDIT_INFORMATION_ITEM",
      information
  }
}
export const updateInformation =(information)=>{ 

  return(dispatch)=>{    
    firestore.firestore().collection('informations').doc(information.id)
     .update(
       {
         ...information,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_INFORMATION',  
       })  
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
    })
 }
}
/**
 * open user popup edit
 */
export function openEditInformation()
{
    return {
        type: 'OPEN_EDIT_INFORMATION',
    }
}

export function closeEditInformation()
{
    return {
        type: 'CLOSE_EDIT_INFORMATION'
    }
}


/**
 * close user popup add
 */
export function openNewInformation()
{
    console.log('action')
    return {
        type: 'OPEN_NEW_INFORMATION'
}
}

export function closeNewInformation()
{
    return {
        type: 'CLOSE_NEW_INFORMATION'
    }
}