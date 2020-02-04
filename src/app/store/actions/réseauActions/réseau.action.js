import firestore from '../../../firebase/fbConfig'
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animateur ****/
 export const addRéseau = (réseau) => { 

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
        const idRéseau = firestore.firestore().collection("réseaux").doc().id; 
        firestore.firestore().collection("réseaux").doc(idRéseau)
        .set({ 
          ...réseau,  
          id: idRéseau,
          authorName: currentUser.displayName, 
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_RESEAU",
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
export const removeRéseau = (id) =>{

    return(dispatch) =>{ 

        firestore.firestore().collection('réseaux').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Ce réseau a été supprimé"}));
          }
       }) 
    } 
}

export const OpenRemoveReseau = () => {
  return {
    type: 'OPEN_DIALOG_RESEAU',
  }
}
export function closeDialogRéseau()
{
    return {
        type: 'CLOSE_DIALOG_RESEAU'
    }
}

/*** Afficher Animateur ****/
let allRéseaux=[]
export const getAllRéseaux = () =>{

  return(dispatch) =>{

    firestore.firestore().collection('réseaux')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const réseau={
          ...doc.data(),
          id: doc.id
        }
        allRéseaux.push(réseau) 
      })
      dispatch(getAllRéseauxSuccess(allRéseaux)); 
        return allRéseaux;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllRéseauxSuccess = (allRéseaux) => ({
    type: 'GET_ALL_RESEAUX_SUCCESS',
    payload: allRéseaux
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