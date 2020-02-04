import firestore from '../../../firebase/fbConfig'
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animateur ****/
 export const addAnimateur = (animateur) => { 

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
        const idAnimateur = firestore.firestore().collection("animateurs").doc().id; 
        firestore.firestore().collection("animateurs").doc(idAnimateur)
        .set({ 
          ...animateur,  
          id:idAnimateur,
          authorName: currentUser.displayName, 
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_ANIMATEUR",
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

/*** Supprimer Animateur ****/
export const removeAnimateur = (id) =>{

    return(dispatch) =>{ 

        firestore.firestore().collection('animateurs').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Cet animateur a été supprimé"}));
          }
       }) 
    } 
}

export const OpenRemoveAnimateur = () => {
  return {
    type: 'OPEN_DIALOG_ANIMATEUR',
}
}

export function closeDialogAnimateur()
{
    return {
        type: 'CLOSE_DIALOG_ANIMATEUR'
    }
}

/*** Afficher Animateur ****/
let allAnimateurs=[]
export const getAllAnimateurs = () =>{

  return(dispatch) =>{

    firestore.firestore().collection('animateurs')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const animateur={
          ...doc.data(),
          id:doc.id
        }
        allAnimateurs.push(animateur) 
      })
      dispatch(getAllAnimateursSuccess(allAnimateurs)); 
        return allAnimateurs;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllAnimateursSuccess = (allAnimateurs) => ({
    type: 'GET_ALL_ANIMATEURS_SUCCESS',
    payload: allAnimateurs
  })

/*** Modifier Animateur ****/
export function EditAnimateurItem(animateur){
  return{
      type: "EDIT_ANIMATEUR_ITEM",
      animateur
  }
}
export const updateAnimateur =(animateur)=>{ 
  return(dispatch)=>{    

    firestore.firestore().collection('animateurs').doc(animateur.id)
     .update(
       {
         ...animateur,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_ANIMATEUR',  
       })  
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
    })
 }
}