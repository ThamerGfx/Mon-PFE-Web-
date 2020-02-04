import firestore from '../../../firebase/fbConfig'
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animateur ****/
 export const addMagasin = (magasin) => { 

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
        const idMagasin = firestore.firestore().collection("magasins").doc().id; 
        firestore.firestore().collection("magasins").doc(idMagasin)
        .set({ 
          ...magasin,  
          id: idMagasin,
          authorName: currentUser.displayName, 
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_MAGASIN",
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
export const removeMagasin = (id) =>{

    return(dispatch) =>{ 

        firestore.firestore().collection('magasins').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Ce magasin a été supprimé aves succès"}));
          }
       }) 
    } 
}

export const OpenRemoveMagasin = () => {
  return {
    type: 'OPEN_DIALOG_MAGASIN',
}
}

export function closeDialogMagasin()
{
    return {
        type: 'CLOSE_DIALOG_MAGASIN'
    }
}

/*** Afficher Animateur ****/
let allMagasins=[]
export const getAllMagasins = () =>{

  return(dispatch) =>{

    firestore.firestore().collection('magasins')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const magasin={
          ...doc.data(),
          id: doc.id
        }
        allMagasins.push(magasin) 
      })
      dispatch(getAllMagasinsSuccess(allMagasins)); 
        return allMagasins;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllMagasinsSuccess = (allMagasins) => ({
    type: 'GET_ALL_MAGASINS_SUCCESS',
    payload: allMagasins
  })

/*** Modifier Animateur ****/
export function EditMagasinItem(magasin){
  return{
      type: "EDIT_MAGASIN_ITEM",
      magasin
  }
}
export const updateMagasin =(magasin)=>{ 
  return(dispatch)=>{    

    firestore.firestore().collection('magasins').doc(magasin.id)
     .update(
       {
         ...magasin,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_MAGASINS',  
       })  
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
    })
 }
}