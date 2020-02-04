import firestore from '../../../firebase/fbConfig'
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animateur ****/
 export const addMarque = (marque) => { 

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
        const idMarque = firestore.firestore().collection("marques").doc().id; 
        firestore.firestore().collection("marques").doc(idMarque)
        .set({ 
          ...marque,  
          id: idMarque,
          authorName: currentUser.displayName, 
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_MARQUE",
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
export const removeMarque = (id) =>{

    return(dispatch) =>{ 

        firestore.firestore().collection('marques').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Cette marque a été supprimée aves succès"}));
          }
       }) 
    } 
}

export const OpenRemoveMarque = () => {
  return {
    type: 'OPEN_DIALOG_MARQUE',
  }
}

export const closeDialogMarque = () => {
    return {
        type: 'CLOSE_DIALOG_MARQUE'
    }
}

/*** Afficher Animateur ****/
let allMarques=[]
export const getAllMarques = () =>{

  return(dispatch) =>{

    firestore.firestore().collection('marques')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const marque={
          ...doc.data(),
          id: doc.id
        }
        allMarques.push(marque) 
      })
      dispatch(getAllMarquesSuccess(allMarques)); 
        return allMarques;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllMarquesSuccess = (allMarques) => ({
    type: 'GET_ALL_MARQUES_SUCCESS',
    payload: allMarques
  })

/*** Modifier Animateur ****/
export function EditMarqueItem(marque){
  return{
      type: "EDIT_MARQUE_ITEM",
      marque
  }
}
export const updateMarque =(marque)=>{ 
  return(dispatch)=>{    

    firestore.firestore().collection('marques').doc(marque.id)
     .update(
       {
         ...marque,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_MARQUES',  
       })  
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
    })
 }
}