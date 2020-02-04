import firestore from '../../../firebase/fbConfig';
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animation ****/
 export const addFormation = (formation) => { 

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
        const idFormation = firestore.firestore().collection("formations").doc().id; 
        firestore.firestore().collection("formations").doc(idFormation)
        .set({ 
          ...formation,  
          id: idFormation,
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_FORMATION",
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
export const removeFormation = (id) =>{
    return(dispatch) =>{ 
        firestore.firestore().collection('formations').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Cette formation a été supprimée"}));
          }
       }) 
    } 
}

/*** Afficher Animation ****/
let allFormations=[]
export const getAllFormations = () =>{
  return(dispatch) =>{
    firestore.firestore().collection('formations')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const formation={
          ...doc.data(),
          id: doc.id
        }
        allFormations.push(formation) 
      })
      dispatch(getAllFormationsSuccess(allFormations)); 
        return allFormations;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllFormationsSuccess = (allFormations) => ({
    type: 'GET_ALL_FORMATIONS_SUCCESS',
    payload: allFormations
  })

/*** Modifier Animation ****/
export function EditFormationItem(formation){
  return{
      type: "EDIT_FORMATION_ITEM",
      formation
  }
}
export const updateFormation =(formation)=>{ 

  return(dispatch)=>{    
    firestore.firestore().collection('formations').doc(formation.id)
     .update(
       {
         ...formation,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_FORMATION',  
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
export function openEditFormation()
{
    return {
        type: 'OPEN_EDIT_FORMATION',
    }
}

export function closeEditFormation()
{
    return {
        type: 'CLOSE_EDIT_FORMATION'
    }
}


/**
 * close user popup add
 */
export function openNewFormation()
{
    console.log('action')
    return {
        type: 'OPEN_NEW_FORMATION'
}
}

export function closeNewFormation()
{
    return {
        type: 'CLOSE_NEW_FORMATION'
    }
}