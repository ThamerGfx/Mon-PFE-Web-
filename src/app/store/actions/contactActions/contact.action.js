import firestore from '../../../firebase/fbConfig';
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animation ****/
 export const addContact = (contact) => { 

    return (dispatch) => {  

        const idContact = firestore.firestore().collection("contact").doc().id; 
        firestore.firestore().collection("contact").doc(idContact)
        .set({ 
          ...contact,  
          id: idContact,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_CONTACT",
            })
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
      })
  }
}

/*** Supprimer Animation ****/
export const removeContact = (id) =>{
    return(dispatch) =>{ 
        firestore.firestore().collection('contact').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Ce contact a été supprimé"}));
          }
       }) 
    } 
}

/*** Afficher Animation ****/
let allContact=[]
export const getAllContact = () =>{
  return(dispatch) =>{
    firestore.firestore().collection('contact')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const contact={
          ...doc.data(),
          id: doc.id
        }
        allContact.push(contact) 
      })
      dispatch(getAllContactSuccess(allContact)); 
        return allContact;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllContactSuccess = (allContact) => ({
    type: 'GET_ALL_CONTACT_SUCCESS',
    payload: allContact
  })

/*** Modifier Animation ****/
export function EditContactItem(contact){
  return{
      type: "EDIT_CONTACT_ITEM",
      contact
  }
}
export const updateContact =(contact)=>{ 

  return(dispatch)=>{    
    firestore.firestore().collection('contact').doc(contact.id)
     .update(
       {
         ...contact,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_CONTACT',  
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
export function openEditContact()
{
    return {
        type: 'OPEN_EDIT_CONTACT',
    }
}

export function closeEditContact()
{
    return {
        type: 'CLOSE_EDIT_CONTACT'
    }
}


/**
 * close user popup add
 */
export function openNewContact()
{
    console.log('action')
    return {
        type: 'OPEN_NEW_CONTACT'
}
}

export function closeNewContact()
{
    return {
        type: 'CLOSE_NEW_CONTACT'
    }
}