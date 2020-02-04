import firestore from '../../../firebase/fbConfig';
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animation ****/
 export const addAnimation = (animation) => { 

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
        const idAnimation = firestore.firestore().collection("animations").doc().id; 
        firestore.firestore().collection("animations").doc(idAnimation)
        .set({ 
          ...animation,  
          id: idAnimation,
          authorName: currentUser.displayName, 
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_ANIMATION",
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
export const removeAnimation = (id) =>{
    return(dispatch) =>{ 
        firestore.firestore().collection('animations').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Cette animation a été supprimée"}));
          }
       }) 
    } 
}

export const OpenRemoveAnimation = () => {
  return {
    type: 'OPEN_DIALOG_ANIMATION',
}
}

export function closeDialogAnimation()
{
    return {
        type: 'CLOSE_DIALOG_ANIMATION'
    }
}
/*** Afficher Animation ****/
let allAnimations=[]
export const getAllAnimations = () =>{
  return(dispatch) =>{
    firestore.firestore().collection('animations')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const anim={
          ...doc.data(),
          id:doc.id
        }
        allAnimations.push(anim) 
      })
      dispatch(getAllAnimationsSuccess(allAnimations)); 
        return allAnimations;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllAnimationsSuccess = (allAnimations) => ({
    type: 'GET_ALL_ANIMATIONS_SUCCESS',
    payload: allAnimations
  })

/*** Modifier Animation ****/
export function EditAnimationItem(animation){
  return{
      type: "EDIT_ANIMATION_ITEM",
      animation
  }
}
export const updateAnimation =(animation)=>{ 

  return(dispatch)=>{    
    firestore.firestore().collection('animations').doc(animation.id)
     .update(
       {
         ...animation,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_ANIMATION',  
       })  
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
    })
 }
}