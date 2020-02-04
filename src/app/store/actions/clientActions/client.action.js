import firestore from '../../../firebase/fbConfig'
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

/*** Ajouter Animateur ****/
 export const addClient = (client) => { 

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
        const idClient = firestore.firestore().collection("clients").doc().id; 
        firestore.firestore().collection("clients").doc(idClient)
        .set({ 
          ...client,  
          id:idClient,
          authorName: currentUser.displayName, 
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_CLIENT",
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
export const removeClient = (id) =>{

    return(dispatch) =>{ 

        firestore.firestore().collection('clients').doc(id)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Ce client a été supprimé avec succès "}));
          }
       }) 
    } 
}

export const OpenRemoveClient = () => {
  return {
    type: 'OPEN_DIALOG_CLIENT',
}
}

export function closeDialogClient()
{
    return {
        type: 'CLOSE_DIALOG_CLIENT'
    }
}
/*** Afficher Animateur ****/
let allClients=[]
export const getAllClients = () =>{

  return(dispatch) =>{

    firestore.firestore().collection('clients')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const client={
          ...doc.data(),
          id:doc.id
        }
        allClients.push(client) 
      })
      dispatch(getAllClientsSuccess(allClients)); 
        return allClients;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  } 
}
export const getAllClientsSuccess = (allClients) => ({
    type: 'GET_ALL_CLIENTS_SUCCESS',
    payload: allClients
  })

/*** Modifier Animateur ****/
export function EditClientItem(client){
  return{
      type: "EDIT_CLIENT_ITEM",
      client
  }
}
export const updateClient =(client)=>{ 
  return(dispatch)=>{    

    firestore.firestore().collection('clients').doc(client.id)
     .update(
       {
         ...client,
       }
      )
     .then(() =>{ 
       dispatch({
         type:'UPDATE_CLIENT',  
       })  
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
    })
 }
}