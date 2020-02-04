import firestore from '../../../firebase/fbConfig'
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animateur ****/
 export const addProduit = (produit) => { 

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
        const idProduit = firestore.firestore().collection("produits").doc().id; 
        firestore.firestore().collection("produits").doc(idProduit)
        .set({ 
          ...produit,  
          id: idProduit,
          authorName: currentUser.displayName, 
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_PRODUIT",
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
export const removeProduit = (id) =>{

    return(dispatch) =>{ 

        firestore.firestore().collection('produits').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Ce produit a été supprimé avec succès"}));
          }
       }) 
    } 
}

export const OpenRemoveProduit = () => {
  return {
    type: 'OPEN_DIALOG_PRODUIT',
}
}

export function closeDialogProduit()
{
    return {
        type: 'CLOSE_DIALOG_PRODUIT'
    }
}

/*** Afficher Animateur ****/
let allProduits=[]
export const getAllProduits = () =>{

  return(dispatch) =>{

    firestore.firestore().collection('produits')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const produit={
          ...doc.data(),
          id: doc.id
        }
        allProduits.push(produit) 
      })
      dispatch(getAllProduitsSuccess(allProduits)); 
        return allProduits;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllProduitsSuccess = (allProduits) => ({
    type: 'GET_ALL_PRODUITS_SUCCESS',
    payload: allProduits
  })

/*** Modifier Animateur ****/
export function EditProduitItem(produit){
  return{
      type: "EDIT_PRODUIT_ITEM",
      produit
  }
}
export const updateProduit =(produit)=>{ 
  return(dispatch)=>{    

    firestore.firestore().collection('produits').doc(produit.id)
     .update(
       {
         ...produit,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_PRODUITS',  
       })  
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
    })
 }
}